"use client";

import { StandingRow } from "@/lib/mock/proficlubs";

interface StandingsExcerptProps {
  standings: StandingRow[];
  leagueName: string;
  accentColor: string;
}

export default function StandingsExcerpt({ standings, leagueName, accentColor }: StandingsExcerptProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: accentColor }} />
      <div className="p-5">
        <h3 className="font-headline text-lg text-off-black dark:text-white mb-4">
          {leagueName}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 pr-2">#</th>
                <th className="text-left py-2">Verein</th>
                <th className="text-center py-2 hidden sm:table-cell">Sp</th>
                <th className="text-center py-2">+/-</th>
                <th className="text-right py-2 font-bold">Pkt</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.position}
                  className={`border-b border-gray-100 dark:border-gray-700/50 ${
                    row.isHighlighted
                      ? "font-bold"
                      : ""
                  }`}
                  style={row.isHighlighted ? { backgroundColor: `${accentColor}10` } : undefined}
                >
                  <td className="py-2 pr-2 text-gray-500 dark:text-gray-400 tabular-nums">
                    {row.position}
                  </td>
                  <td className="py-2 text-off-black dark:text-white truncate max-w-[140px]">
                    {row.isHighlighted && (
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                    )}
                    {row.team}
                  </td>
                  <td className="py-2 text-center text-gray-500 dark:text-gray-400 tabular-nums hidden sm:table-cell">
                    {row.played}
                  </td>
                  <td className={`py-2 text-center tabular-nums ${
                    row.goalDiff.startsWith("+") ? "text-green-600 dark:text-neon-green" : row.goalDiff.startsWith("-") ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {row.goalDiff}
                  </td>
                  <td className="py-2 text-right font-bold text-off-black dark:text-white tabular-nums">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
