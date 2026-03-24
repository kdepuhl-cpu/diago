/**
 * FuWo League Data Sync Script
 *
 * Syncs standings, results, and fixtures from api-fussball.de → Supabase
 *
 * Usage:
 *   npx tsx scripts/sync-leagues.ts              # sync all active leagues
 *   npx tsx scripts/sync-leagues.ts --league berlin-liga  # sync one league
 *   npx tsx scripts/sync-leagues.ts --register   # register for API token
 *   npx tsx scripts/sync-leagues.ts --status     # show sync status
 */

import { createClient } from "@supabase/supabase-js";

// ─── Config ─────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const API_FUSSBALL_TOKEN = process.env.API_FUSSBALL_TOKEN!;
const API_BASE = "https://api-fussball.de/api";
const RATE_LIMIT_MS = 2100; // ~30 req/min → 1 req per 2s with buffer

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── API Client ─────────────────────────────────────────────────
async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "x-auth-token": API_FUSSBALL_TOKEN },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Register ───────────────────────────────────────────────────
async function registerToken(email: string) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  console.log("Registration response:", data);
  console.log("\nSave the token as API_FUSSBALL_TOKEN in your .env.local");
}

// ─── Sync Standings ─────────────────────────────────────────────
async function syncStandings(leagueId: string, fussballDeTeamId: string) {
  const start = Date.now();

  try {
    const res = await apiFetch<any>(`/team/table/${fussballDeTeamId}`);
    const data = res.data || res;

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid table response");
    }

    // Upsert standings — api-fussball.de format
    const rows = data.map((entry: any, index: number) => {
      const goals = entry.goal?.split(" : ") || ["0", "0"];
      return {
        league_id: leagueId,
        season: "2526",
        position: entry.place || index + 1,
        team_name: entry.team || "Unknown",
        team_id: null,
        played: entry.games || 0,
        wins: entry.won || 0,
        draws: entry.draw || 0,
        losses: entry.lost || 0,
        goals_for: parseInt(goals[0]?.trim()) || 0,
        goals_against: parseInt(goals[1]?.trim()) || 0,
        points: entry.points || 0,
        updated_at: new Date().toISOString(),
      };
    });

    // Delete old standings for this league/season, then insert fresh
    await supabase
      .from("standings")
      .delete()
      .eq("league_id", leagueId)
      .eq("season", "2526");

    const { error } = await supabase.from("standings").insert(rows);
    if (error) throw error;

    const duration = Date.now() - start;
    await logSync(leagueId, "standings", "success", rows.length, duration);
    console.log(`  ✓ Standings: ${rows.length} teams (${duration}ms)`);
    return rows.length;
  } catch (err: any) {
    const duration = Date.now() - start;
    await logSync(leagueId, "standings", "error", 0, duration, err.message);
    console.error(`  ✗ Standings error: ${err.message}`);
    return 0;
  }
}

// ─── Sync Matches ───────────────────────────────────────────────
async function syncMatches(
  leagueId: string,
  fussballDeTeamId: string,
  type: "next" | "prev"
) {
  const start = Date.now();
  const endpoint = type === "next" ? "next_games" : "prev_games";

  try {
    const res = await apiFetch<any>(`/team/${endpoint}/${fussballDeTeamId}`);
    const data = res.data || res;

    if (!data || !Array.isArray(data)) {
      throw new Error(`Invalid ${endpoint} response`);
    }

    // api-fussball.de format: date "DD.MM.YYYY", time "HH:MM"
    const rows = data
      .filter((match: any) => match.competition !== "Landesfreundschaftsspiele") // nur Pflichtspiele
      .map((match: any) => {
        // Parse date "DD.MM.YYYY" + time "HH:MM" → ISO
        let matchDate: string | null = null;
        if (match.date) {
          const [day, month, year] = match.date.split(".");
          const time = match.time || "15:00";
          matchDate = new Date(`${year}-${month}-${day}T${time}:00+01:00`).toISOString();
        }
        const hasScore = match.homeScore !== "" && match.awayScore !== "";
        return {
          league_id: leagueId,
          season: "2526",
          matchday: null,
          match_date: matchDate,
          home_team: match.homeTeam || "Unknown",
          away_team: match.awayTeam || "Unknown",
          home_score: hasScore ? parseInt(match.homeScore) : null,
          away_score: hasScore ? parseInt(match.awayScore) : null,
          status: match.status === "Absetzung" ? "cancelled" : hasScore ? "finished" : "scheduled",
          fussball_de_url: null,
          updated_at: new Date().toISOString(),
        };
      });

    // Upsert: use league + home + away + date as unique key
    for (const row of rows) {
      await supabase
        .from("matches")
        .upsert(row, { onConflict: "league_id,season,home_team,away_team,match_date" });
    }

    const duration = Date.now() - start;
    await logSync(leagueId, endpoint, "success", rows.length, duration);
    console.log(`  ✓ ${type === "next" ? "Fixtures" : "Results"}: ${rows.length} matches (${duration}ms)`);
    return rows.length;
  } catch (err: any) {
    const duration = Date.now() - start;
    await logSync(leagueId, endpoint, "error", 0, duration, err.message);
    console.error(`  ✗ ${endpoint} error: ${err.message}`);
    return 0;
  }
}

// ─── Sync Log ───────────────────────────────────────────────────
async function logSync(
  leagueId: string,
  syncType: string,
  status: string,
  count: number,
  duration: number,
  error?: string
) {
  await supabase.from("sync_log").insert({
    league_id: leagueId,
    sync_type: syncType,
    status,
    records_count: count,
    duration_ms: duration,
    error_message: error || null,
  });
}

// ─── Show Status ────────────────────────────────────────────────
async function showStatus() {
  const { data: sources } = await supabase
    .from("league_sources")
    .select("*")
    .eq("active", true)
    .order("league_id");

  const { data: logs } = await supabase
    .from("sync_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  console.log("\n═══ LEAGUE SOURCES ═══");
  if (!sources?.length) {
    console.log("  Keine Ligen konfiguriert. Füge league_sources Einträge hinzu.");
    return;
  }
  for (const s of sources) {
    console.log(`  ${s.active ? "●" : "○"} ${s.league_name} (${s.league_id}) — ${s.priority}`);
  }

  console.log("\n═══ LETZTE SYNCS ═══");
  if (!logs?.length) {
    console.log("  Noch keine Syncs durchgeführt.");
    return;
  }
  for (const log of logs.slice(0, 15)) {
    const icon = log.status === "success" ? "✓" : "✗";
    const time = new Date(log.created_at).toLocaleString("de-DE");
    console.log(`  ${icon} ${time} — ${log.league_id} / ${log.sync_type} — ${log.records_count} records (${log.duration_ms}ms)`);
    if (log.error_message) console.log(`    Error: ${log.error_message}`);
  }
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  // Register mode
  if (args.includes("--register")) {
    const email = args[args.indexOf("--register") + 1];
    if (!email) {
      console.log("Usage: npx tsx scripts/sync-leagues.ts --register your@email.de");
      process.exit(1);
    }
    await registerToken(email);
    return;
  }

  // Status mode
  if (args.includes("--status")) {
    await showStatus();
    return;
  }

  // Validate env
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }
  if (!API_FUSSBALL_TOKEN) {
    console.error("Missing API_FUSSBALL_TOKEN. Run with --register first.");
    process.exit(1);
  }

  // Get active league sources
  const leagueFilter = args.includes("--league")
    ? args[args.indexOf("--league") + 1]
    : null;

  let query = supabase.from("league_sources").select("*").eq("active", true);
  if (leagueFilter) {
    query = query.eq("league_id", leagueFilter);
  }

  const { data: sources, error } = await query.order("priority");
  if (error || !sources?.length) {
    console.error("No active league sources found.", error?.message);
    process.exit(1);
  }

  console.log(`\n⚽ FuWo Sync — ${sources.length} Ligen\n`);

  let totalStandings = 0;
  let totalMatches = 0;

  for (const source of sources) {
    console.log(`\n📋 ${source.league_name} (${source.league_id})`);

    // Sync standings
    totalStandings += await syncStandings(source.league_id, source.fussball_de_team_id);
    await sleep(RATE_LIMIT_MS);

    // Sync past results
    totalMatches += await syncMatches(source.league_id, source.fussball_de_team_id, "prev");
    await sleep(RATE_LIMIT_MS);

    // Sync upcoming fixtures
    totalMatches += await syncMatches(source.league_id, source.fussball_de_team_id, "next");
    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\n═══ DONE ═══`);
  console.log(`  Standings: ${totalStandings} teams across ${sources.length} leagues`);
  console.log(`  Matches: ${totalMatches} total`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
