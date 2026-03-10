"use client";

import { Match } from "@/lib/mock/matches";

interface NextMatchWidgetProps {
  match: Match | undefined;
  accentColor: string;
}

export default function NextMatchWidget({ match, accentColor }: NextMatchWidgetProps) {
  if (!match) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="h-1.5" style={{ backgroundColor: accentColor }} />
      <div className="p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
          Nächstes Spiel
        </h3>
        <div className="flex items-center justify-between">
          {/* Home */}
          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: match.homeTeam.color }}
            >
              {match.homeTeam.shortName.slice(0, 3)}
            </div>
            <span className="text-sm font-semibold text-off-black dark:text-white">
              {match.homeTeam.shortName}
            </span>
          </div>

          {/* Info */}
          <div className="text-center px-4">
            <p className="text-lg font-bold text-off-black dark:text-white">vs</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {new Date(match.date).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" })}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {match.time} Uhr
            </p>
          </div>

          {/* Away */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <span className="text-sm font-semibold text-off-black dark:text-white">
              {match.awayTeam.shortName}
            </span>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: match.awayTeam.color }}
            >
              {match.awayTeam.shortName.slice(0, 3)}
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
          Spieltag {match.matchday}
        </p>
      </div>
    </div>
  );
}
