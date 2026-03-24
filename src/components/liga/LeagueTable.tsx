"use client";

import { useState, useEffect } from "react";
import { getStandings, type Standing } from "@/lib/api/standings";

// Placeholder wenn keine echten Daten vorhanden
const PLACEHOLDER_TABLE: Standing[] = [
  { pos: 1, team: "Hertha BSC II", teamId: null, sp: 18, s: 12, u: 4, n: 2, tore: "42:15", diff: "+27", pkt: 40 },
  { pos: 2, team: "BFC Dynamo", teamId: null, sp: 18, s: 11, u: 3, n: 4, tore: "38:20", diff: "+18", pkt: 36 },
  { pos: 3, team: "VSG Altglienicke", teamId: null, sp: 18, s: 10, u: 5, n: 3, tore: "35:18", diff: "+17", pkt: 35 },
  { pos: 4, team: "Tennis Borussia", teamId: null, sp: 18, s: 9, u: 4, n: 5, tore: "30:22", diff: "+8", pkt: 31 },
  { pos: 5, team: "Berliner AK 07", teamId: null, sp: 18, s: 8, u: 5, n: 5, tore: "28:24", diff: "+4", pkt: 29 },
  { pos: 6, team: "Viktoria 89", teamId: null, sp: 18, s: 7, u: 6, n: 5, tore: "26:23", diff: "+3", pkt: 27 },
  { pos: 7, team: "FC Viktoria 1889", teamId: null, sp: 18, s: 6, u: 6, n: 6, tore: "24:25", diff: "-1", pkt: 24 },
  { pos: 8, team: "SC Staaken", teamId: null, sp: 18, s: 5, u: 5, n: 8, tore: "20:28", diff: "-8", pkt: 20 },
];

// ─── Zonen-Konfiguration ────────────────────────────────────────
// Inline colors damit Tailwind nichts purgt

interface ZoneConfig {
  positions: number[];
  color: string;       // CSS color value
  label: string;
}

const ZONE_COLORS = {
  cl: "#22c55e",        // grün — Champions League / Aufstieg
  el: "#3b82f6",        // blau — Europa League
  ecl: "#38bdf8",       // hellblau — Conference League
  relegation: "#f97316", // orange — Relegation
  abstieg: "#ef4444",   // rot — Abstieg
};

function getZones(leagueId: string, totalTeams: number): ZoneConfig[] {
  switch (leagueId) {
    case "bundesliga":
      return [
        { positions: [1, 2, 3, 4], color: ZONE_COLORS.cl, label: "Champions League" },
        { positions: [5], color: ZONE_COLORS.el, label: "Europa League" },
        { positions: [6], color: ZONE_COLORS.ecl, label: "Conference League" },
        { positions: [16], color: ZONE_COLORS.relegation, label: "Relegation" },
        { positions: [17, 18], color: ZONE_COLORS.abstieg, label: "Abstieg" },
      ];
    case "2-bundesliga":
      return [
        { positions: [1, 2], color: ZONE_COLORS.cl, label: "Aufstieg" },
        { positions: [3], color: ZONE_COLORS.relegation, label: "Relegation" },
        { positions: [16], color: ZONE_COLORS.relegation, label: "Relegation" },
        { positions: [17, 18], color: ZONE_COLORS.abstieg, label: "Abstieg" },
      ];
    case "3-liga":
      return [
        { positions: [1, 2], color: ZONE_COLORS.cl, label: "Aufstieg" },
        { positions: [3], color: ZONE_COLORS.relegation, label: "Relegation" },
        ...(totalTeams >= 18
          ? [{ positions: [totalTeams - 2, totalTeams - 1, totalTeams], color: ZONE_COLORS.abstieg, label: "Abstieg" }]
          : []),
      ];
    case "regionalliga-nordost":
      return [
        { positions: [1], color: ZONE_COLORS.cl, label: "Aufstiegsrunde" },
        ...(totalTeams >= 6
          ? [{ positions: [totalTeams - 1, totalTeams], color: ZONE_COLORS.abstieg, label: "Abstieg" }]
          : []),
      ];
    case "berlin-liga":
    case "oberliga-nofv-nord":
      return [
        { positions: [1], color: ZONE_COLORS.cl, label: "Aufstieg" },
        ...(totalTeams >= 6
          ? [{ positions: [totalTeams - 1, totalTeams], color: ZONE_COLORS.abstieg, label: "Abstieg" }]
          : []),
      ];
    default:
      return [];
  }
}

function getZoneColor(zones: ZoneConfig[], pos: number): string | null {
  for (const z of zones) {
    if (z.positions.includes(pos)) return z.color;
  }
  return null;
}

// ─── Legende ────────────────────────────────────────────────────

function ZoneLegend({ zones }: { zones: ZoneConfig[] }) {
  if (zones.length === 0) return null;
  const seen = new Set<string>();
  const unique = zones.filter((z) => {
    if (seen.has(z.label)) return false;
    seen.add(z.label);
    return true;
  });

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 px-6 py-2.5 border-t border-gray-200 dark:border-gray-700">
      {unique.map((z) => (
        <div key={z.label} className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: z.color }} />
          <span className="text-[10px] text-gray-500 dark:text-gray-400">{z.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Komponente ─────────────────────────────────────────────────

interface LeagueTableProps {
  leagueId: string;
}

export default function LeagueTable({ leagueId }: LeagueTableProps) {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [isPlaceholder, setIsPlaceholder] = useState(false);
  const [loading, setLoading] = useState(true);

  const isPokal = leagueId === "dfb-pokal" || leagueId === "dfb-pokal-frauen"
    || leagueId === "berliner-pokal" || leagueId === "polytan-pokal";

  useEffect(() => {
    if (isPokal) {
      setLoading(false);
      return;
    }

    getStandings(leagueId)
      .then((data) => {
        // Mindestens 4 Teams für eine sinnvolle Tabelle
        if (data.length >= 4) {
          setStandings(data);
          setIsPlaceholder(false);
        } else {
          setStandings(PLACEHOLDER_TABLE);
          setIsPlaceholder(true);
        }
      })
      .catch(() => {
        setStandings(PLACEHOLDER_TABLE);
        setIsPlaceholder(true);
      })
      .finally(() => setLoading(false));
  }, [leagueId, isPokal]);

  // Pokale: kein Tabellen-Widget (wird in PokalMatches gezeigt)
  if (isPokal) return null;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-headline text-xl text-off-black dark:text-white">Tabelle</h2>
        </div>
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const zones = getZones(leagueId, standings.length);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-headline text-xl text-off-black dark:text-white">Tabelle</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="pl-1 pr-2 py-3 font-medium w-1"></th>
              <th className="px-3 py-3 font-medium w-8">#</th>
              <th className="px-3 py-3 font-medium">Verein</th>
              <th className="px-3 py-3 font-medium text-center">Sp</th>
              <th className="px-3 py-3 font-medium text-center hidden sm:table-cell">S</th>
              <th className="px-3 py-3 font-medium text-center hidden sm:table-cell">U</th>
              <th className="px-3 py-3 font-medium text-center hidden sm:table-cell">N</th>
              <th className="px-3 py-3 font-medium text-center hidden md:table-cell">Tore</th>
              <th className="px-3 py-3 font-medium text-center">Diff</th>
              <th className="px-3 py-3 font-medium text-center">Pkt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {standings.map((row) => {
              const zoneColor = getZoneColor(zones, row.pos);
              return (
                <tr key={row.pos} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {/* Zonen-Indikator */}
                  <td className="pl-0 pr-0 py-0 w-1">
                    <div
                      className="w-1 h-full min-h-[44px]"
                      style={zoneColor ? { backgroundColor: zoneColor } : undefined}
                    />
                  </td>
                  <td className="px-3 py-3 font-medium text-off-black dark:text-white">{row.pos}</td>
                  <td className="px-3 py-3 font-medium text-off-black dark:text-white truncate max-w-[200px]">{row.team}</td>
                  <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-300">{row.sp}</td>
                  <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-300 hidden sm:table-cell">{row.s}</td>
                  <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-300 hidden sm:table-cell">{row.u}</td>
                  <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-300 hidden sm:table-cell">{row.n}</td>
                  <td className="px-3 py-3 text-center text-gray-600 dark:text-gray-300 hidden md:table-cell">{row.tore}</td>
                  <td className={`px-3 py-3 text-center font-medium ${
                    row.diff.startsWith("+") ? "text-green-600" : row.diff.startsWith("-") ? "text-red-500" : "text-gray-600"
                  }`}>
                    {row.diff}
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-off-black dark:text-white">{row.pkt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Zonen-Legende */}
      <ZoneLegend zones={zones} />

      {/* Footer */}
      <div className="px-6 py-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-[10px] text-gray-400 dark:text-gray-500">
          {isPlaceholder
            ? "Platzhalter-Daten — echte Tabelle wird bald verfügbar"
            : `Stand: ${new Date().toLocaleDateString("de-DE")}`
          }
        </p>
      </div>
    </div>
  );
}
