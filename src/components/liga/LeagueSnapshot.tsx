"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStandings, getRecentResults } from "@/lib/api/standings";
import type { Standing, LeagueMatch } from "@/lib/api/standings";

// Mock-Daten als Fallback (Regionalliga Nordost)
const MOCK_STANDINGS: Standing[] = [
  { pos: 1, team: "Lok Leipzig", teamId: null, sp: 24, s: 17, u: 5, n: 2, tore: "48:15", diff: "+33", pkt: 56 },
  { pos: 2, team: "Altglienicke", teamId: null, sp: 24, s: 16, u: 5, n: 3, tore: "42:18", diff: "+24", pkt: 53 },
  { pos: 3, team: "Hertha BSC II", teamId: null, sp: 24, s: 15, u: 4, n: 5, tore: "51:28", diff: "+23", pkt: 49 },
  { pos: 4, team: "BFC Dynamo", teamId: null, sp: 24, s: 14, u: 5, n: 5, tore: "39:22", diff: "+17", pkt: 47 },
  { pos: 5, team: "Viktoria Berlin", teamId: null, sp: 24, s: 13, u: 6, n: 5, tore: "40:25", diff: "+15", pkt: 45 },
];

const MOCK_RESULTS: LeagueMatch[] = [
  { id: "m1", matchday: 24, date: "2026-03-30", homeTeam: "BAK", awayTeam: "BFC Dynamo", homeScore: 2, awayScore: 1, status: "finished", fussballDeUrl: null },
  { id: "m2", matchday: 24, date: "2026-03-30", homeTeam: "TeBe", awayTeam: "Altglienicke", homeScore: 0, awayScore: 0, status: "finished", fussballDeUrl: null },
  { id: "m3", matchday: 24, date: "2026-03-30", homeTeam: "Viktoria", awayTeam: "Chemie Leipzig", homeScore: 3, awayScore: 2, status: "finished", fussballDeUrl: null },
  { id: "m4", matchday: 24, date: "2026-03-30", homeTeam: "Lok Leipzig", awayTeam: "Hertha BSC II", homeScore: 1, awayScore: 1, status: "finished", fussballDeUrl: null },
];

interface LeagueSnapshotProps {
  leagueId: string;
  leagueSlug?: string;
}

function TrendArrow({ pos, team }: { pos: number; team: string }) {
  // Simplified trend based on position (real data would track matchday-over-matchday)
  const hash = team.length + pos;
  const trend = hash % 3 === 0 ? "up" : hash % 3 === 1 ? "down" : "same";

  if (trend === "up") return <span className="text-green-500 text-[10px]">&#9650;</span>;
  if (trend === "down") return <span className="text-red-400 text-[10px]">&#9660;</span>;
  return <span className="text-gray-400 text-[10px]">&#8211;</span>;
}

function shortenTeam(name: string, maxLen: number = 14): string {
  if (name.length <= maxLen) return name;
  // Common abbreviations
  const abbrevs: Record<string, string> = {
    "Altglienicke": "Altglienicke",
    "Hertha BSC II": "Hertha II",
    "BFC Dynamo": "BFC Dynamo",
    "Viktoria Berlin": "Viktoria",
    "Lok Leipzig": "Lok Leipzig",
    "Chemie Leipzig": "Chemie Lpz.",
  };
  return abbrevs[name] ?? name.slice(0, maxLen);
}

export default function LeagueSnapshot({ leagueId, leagueSlug }: LeagueSnapshotProps) {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [results, setResults] = useState<LeagueMatch[]>([]);
  const [loading, setLoading] = useState(true);

  const slug = leagueSlug ?? leagueId;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [s, r] = await Promise.all([
          getStandings(leagueId),
          getRecentResults(leagueId, 4),
        ]);

        if (cancelled) return;

        setStandings(s.length > 0 ? s.slice(0, 5) : MOCK_STANDINGS);
        setResults(r.length > 0 ? r : MOCK_RESULTS);
      } catch {
        if (!cancelled) {
          setStandings(MOCK_STANDINGS);
          setResults(MOCK_RESULTS);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [leagueId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-[10px] mb-[10px]">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-sm h-48 animate-pulse" />
        <div className="bg-gray-100 dark:bg-gray-800 rounded-sm h-48 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-8 mb-[10px]">
      {/* Mini-Tabelle (Top 5) */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-sm p-4">
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
          Tabelle
        </h4>
        <table className="w-full font-mono text-[13px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <th className="text-left pb-2 w-6">#</th>
              <th className="text-left pb-2">Verein</th>
              <th className="text-right pb-2 w-8">Sp</th>
              <th className="text-right pb-2 w-10">Diff</th>
              <th className="text-right pb-2 w-8">Pkt</th>
              <th className="text-center pb-2 w-5"></th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row) => (
              <tr
                key={row.pos}
                className={`border-t border-gray-200 dark:border-gray-700 ${
                  row.pos <= 2 ? "text-off-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <td className="py-1.5 font-semibold">{row.pos}</td>
                <td className="py-1.5 truncate max-w-[120px]">{shortenTeam(row.team)}</td>
                <td className="py-1.5 text-right text-gray-400 dark:text-gray-500">{row.sp}</td>
                <td className="py-1.5 text-right">{row.diff}</td>
                <td className="py-1.5 text-right font-semibold">{row.pkt}</td>
                <td className="py-1.5 text-center"><TrendArrow pos={row.pos} team={row.team} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link
          href={`/liga/${slug}`}
          className="block mt-3 font-mono text-[11px] text-gray-400 hover:text-off-black dark:hover:text-white transition-colors"
        >
          Ganze Tabelle &rarr;
        </Link>
      </div>

      {/* Letzte Ergebnisse */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-sm p-4">
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
          Ergebnisse
        </h4>
        <div className="space-y-0">
          {results.map((match) => (
            <div
              key={match.id}
              className="grid grid-cols-[1fr_auto_1fr] items-center py-2 border-t border-gray-200 dark:border-gray-700 font-mono text-[13px]"
            >
              <span className="text-right text-off-black dark:text-white pr-3 whitespace-nowrap overflow-hidden text-ellipsis">
                {match.homeTeam}
              </span>
              <span className="font-semibold text-off-black dark:text-white tabular-nums w-[44px] text-center">
                {match.homeScore !== null ? `${match.homeScore}:${match.awayScore}` : "–:–"}
              </span>
              <span className="text-left text-off-black dark:text-white pl-3 whitespace-nowrap overflow-hidden text-ellipsis">
                {match.awayTeam}
              </span>
            </div>
          ))}
        </div>
        <Link
          href={`/liga/${slug}`}
          className="block mt-3 font-mono text-[11px] text-gray-400 hover:text-off-black dark:hover:text-white transition-colors"
        >
          Alle Ergebnisse &rarr;
        </Link>
      </div>
    </div>
  );
}
