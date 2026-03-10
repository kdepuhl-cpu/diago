"use client";

import { Match } from "@/lib/mock/matches";

interface MatchResultsListProps {
  matches: Match[];
  accentColor: string;
}

export default function MatchResultsList({ matches, accentColor }: MatchResultsListProps) {
  const finishedMatches = matches.filter((m) => m.status === "finished");
  if (finishedMatches.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: accentColor }} />
      <div className="p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
          Letzte Ergebnisse
        </h3>
        <div className="space-y-3">
          {finishedMatches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                  style={{ backgroundColor: match.homeTeam.color }}
                >
                  {match.homeTeam.shortName.slice(0, 2)}
                </div>
                <span className="text-sm text-off-black dark:text-white truncate">
                  {match.homeTeam.shortName}
                </span>
              </div>

              <div className="px-3 text-center flex-shrink-0">
                <span className="text-sm font-bold text-off-black dark:text-white tabular-nums">
                  {match.homeScore} : {match.awayScore}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <span className="text-sm text-off-black dark:text-white truncate">
                  {match.awayTeam.shortName}
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                  style={{ backgroundColor: match.awayTeam.color }}
                >
                  {match.awayTeam.shortName.slice(0, 2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
