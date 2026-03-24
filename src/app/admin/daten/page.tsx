"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import Sidebar from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";

interface LeagueSource {
  id: string;
  league_id: string;
  league_name: string;
  priority: string;
  active: boolean;
  season: string;
}

interface Standing {
  position: number;
  team_name: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
}

interface SyncLogEntry {
  id: string;
  league_id: string;
  sync_type: string;
  status: string;
  records_count: number;
  duration_ms: number;
  error_message: string | null;
  created_at: string;
}

interface Match {
  id: string;
  league_id: string;
  match_date: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
}

export default function DatenPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Daten-Pipeline</h1>
            <p className="text-sm text-gray-500 mb-6">
              Liga-Daten von fussball.de via api-fussball.de
            </p>
            <DatenContent />
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}

function DatenContent() {
  const [sources, setSources] = useState<LeagueSource[]>([]);
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>([]);
  const [standings, setStandings] = useState<Record<string, Standing[]>>({});
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!supabase) {
      setError("Supabase nicht verfügbar");
      setLoading(false);
      return;
    }

    try {
      // Load league sources
      const { data: sourcesData } = await supabase
        .from("league_sources")
        .select("*")
        .order("league_name");
      setSources(sourcesData || []);

      // Load sync logs
      const { data: logsData } = await supabase
        .from("sync_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      setSyncLogs(logsData || []);

      // Load all standings
      const { data: standingsData } = await supabase
        .from("standings")
        .select("*")
        .order("position");

      if (standingsData) {
        const grouped: Record<string, Standing[]> = {};
        for (const row of standingsData) {
          if (!grouped[row.league_id]) grouped[row.league_id] = [];
          grouped[row.league_id].push(row);
        }
        setStandings(grouped);
        // Default to first league with data
        const firstLeague = Object.keys(grouped)[0];
        if (firstLeague) setSelectedLeague(firstLeague);
      }

      // Load recent matches
      const { data: matchesData } = await supabase
        .from("matches")
        .select("*")
        .eq("status", "finished")
        .order("match_date", { ascending: false })
        .limit(20);
      setRecentMatches(matchesData || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-gray-500 text-sm">Laden...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 rounded-lg p-4 text-sm">
        {error}
      </div>
    );
  }

  const activeSources = sources.filter((s) => s.active);
  const lastSync = syncLogs[0];
  const totalTeams = Object.values(standings).reduce((sum, s) => sum + s.length, 0);

  return (
    <>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatBox label="Ligen aktiv" value={activeSources.length} color="green" />
        <StatBox label="Teams in DB" value={totalTeams} color="blue" />
        <StatBox label="Spiele in DB" value={recentMatches.length + "+"} color="purple" />
        <StatBox
          label="Letzter Sync"
          value={lastSync ? new Date(lastSync.created_at).toLocaleDateString("de-DE") : "—"}
          color="gray"
        />
      </div>

      {/* League Sources */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Konfigurierte Ligen</h2>
        {activeSources.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
            Noch keine Ligen konfiguriert. Füge Einträge in die <code className="bg-yellow-100 px-1 rounded">league_sources</code> Tabelle ein.
            <br />
            <code className="text-xs mt-2 block bg-yellow-100 p-2 rounded">
              npx tsx scripts/sync-leagues.ts --status
            </code>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Liga</th>
                  <th className="px-4 py-2 font-medium">ID</th>
                  <th className="px-4 py-2 font-medium">Priorität</th>
                  <th className="px-4 py-2 font-medium">Teams</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeSources.map((source) => (
                  <tr
                    key={source.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedLeague(source.league_id)}
                  >
                    <td className="px-4 py-2.5 font-medium text-gray-900">{source.league_name}</td>
                    <td className="px-4 py-2.5 text-gray-500 font-mono text-xs">{source.league_id}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                          source.priority === "intensiv"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {source.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">
                      {standings[source.league_id]?.length || 0}
                    </td>
                    <td className="px-4 py-2.5">
                      {standings[source.league_id]?.length ? (
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                      ) : (
                        <span className="inline-block w-2 h-2 bg-gray-300 rounded-full" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Standings Table */}
      {selectedLeague && standings[selectedLeague] && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Tabelle — {sources.find((s) => s.league_id === selectedLeague)?.league_name || selectedLeague}
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-3 py-2 font-medium w-8">#</th>
                  <th className="px-3 py-2 font-medium">Team</th>
                  <th className="px-3 py-2 font-medium text-center">Sp</th>
                  <th className="px-3 py-2 font-medium text-center">S</th>
                  <th className="px-3 py-2 font-medium text-center">U</th>
                  <th className="px-3 py-2 font-medium text-center">N</th>
                  <th className="px-3 py-2 font-medium text-center">Tore</th>
                  <th className="px-3 py-2 font-medium text-center">Diff</th>
                  <th className="px-3 py-2 font-medium text-center">Pkt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {standings[selectedLeague].map((team) => (
                  <tr key={team.team_name} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500 font-mono text-xs">{team.position}</td>
                    <td className="px-3 py-2 font-medium text-gray-900">{team.team_name}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{team.played}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{team.wins}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{team.draws}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{team.losses}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{team.goals_for}:{team.goals_against}</td>
                    <td className="px-3 py-2 text-center text-gray-600">
                      <span className={team.goal_diff > 0 ? "text-green-600" : team.goal_diff < 0 ? "text-red-500" : ""}>
                        {team.goal_diff > 0 ? "+" : ""}{team.goal_diff}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center font-bold text-gray-900">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Recent Results */}
      {recentMatches.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Letzte Ergebnisse</h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {recentMatches.map((match) => (
                <div key={match.id} className="px-4 py-3 flex items-center gap-4 text-sm">
                  <span className="text-gray-400 font-mono text-xs w-20 shrink-0">
                    {match.match_date
                      ? new Date(match.match_date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })
                      : "—"}
                  </span>
                  <span className="text-gray-900 flex-1 text-right">{match.home_team}</span>
                  <span className="font-bold text-gray-900 w-12 text-center font-mono">
                    {match.home_score}:{match.away_score}
                  </span>
                  <span className="text-gray-900 flex-1">{match.away_team}</span>
                  <span className="text-gray-400 font-mono text-xs w-24 text-right shrink-0">
                    {sources.find((s) => s.league_id === match.league_id)?.league_name || match.league_id}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sync Log */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Sync-Log</h2>
        {syncLogs.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-500">
            Noch keine Syncs. Starte mit:
            <code className="block mt-2 bg-gray-100 p-2 rounded text-xs">
              npx tsx scripts/sync-leagues.ts
            </code>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Zeit</th>
                  <th className="px-4 py-2 font-medium">Liga</th>
                  <th className="px-4 py-2 font-medium">Typ</th>
                  <th className="px-4 py-2 font-medium">Records</th>
                  <th className="px-4 py-2 font-medium">Dauer</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {syncLogs.slice(0, 20).map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500 font-mono text-xs">
                      {new Date(log.created_at).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2 text-gray-900">{log.league_id}</td>
                    <td className="px-4 py-2 text-gray-500">{log.sync_type}</td>
                    <td className="px-4 py-2 text-gray-600">{log.records_count}</td>
                    <td className="px-4 py-2 text-gray-500 font-mono text-xs">{log.duration_ms}ms</td>
                    <td className="px-4 py-2">
                      {log.status === "success" ? (
                        <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full" />
                          {log.error_message && (
                            <span className="text-xs text-red-500 truncate max-w-[200px]">{log.error_message}</span>
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* CLI Help */}
      <section className="mt-8 bg-gray-800 text-gray-300 rounded-lg p-5 text-sm font-mono">
        <p className="text-gray-400 mb-3"># Sync-Script Befehle</p>
        <p>$ npx tsx scripts/sync-leagues.ts --register deine@email.de</p>
        <p>$ npx tsx scripts/sync-leagues.ts --status</p>
        <p>$ npx tsx scripts/sync-leagues.ts</p>
        <p>$ npx tsx scripts/sync-leagues.ts --league berlin-liga</p>
      </section>
    </>
  );
}

function StatBox({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    gray: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <div className={`rounded-lg border p-4 ${colorMap[color] || colorMap.gray}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs opacity-70 mt-1">{label}</p>
    </div>
  );
}
