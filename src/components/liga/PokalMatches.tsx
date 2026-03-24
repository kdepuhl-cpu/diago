"use client";

import { useState, useEffect } from "react";
import { getMatches, type LeagueMatch } from "@/lib/api/standings";

interface PokalMatchesProps {
  leagueId: string;
}

interface Round {
  name: string;
  matches: LeagueMatch[];
}

export default function PokalMatches({ leagueId }: PokalMatchesProps) {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [activeRound, setActiveRound] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches(leagueId)
      .then((matches) => {
        if (matches.length === 0) {
          setLoading(false);
          return;
        }

        // Nach Spieltag/Runde gruppieren
        const roundMap = new Map<string, LeagueMatch[]>();
        for (const m of matches) {
          const key = m.matchday ? `${m.matchday}` : "0";
          if (!roundMap.has(key)) roundMap.set(key, []);
          roundMap.get(key)!.push(m);
        }

        // Runden-Namen zuweisen
        const roundNames: Record<string, string> = {
          "1": "1. Runde",
          "2": "2. Runde",
          "3": "Achtelfinale",
          "4": "Viertelfinale",
          "5": "Halbfinale",
          "6": "Finale",
        };

        const sorted = Array.from(roundMap.entries())
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([key, matches]) => ({
            name: roundNames[key] || `Runde ${key}`,
            matches: matches.sort((a, b) => {
              if (!a.date || !b.date) return 0;
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }),
          }));

        setRounds(sorted);

        // Zur aktuellsten Runde springen (letzte mit Ergebnissen oder erste ohne)
        const lastFinished = sorted.findLastIndex((r) =>
          r.matches.some((m) => m.status === "finished")
        );
        setActiveRound(lastFinished >= 0 ? lastFinished : 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [leagueId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-headline text-xl text-off-black dark:text-white">Pokal</h2>
        </div>
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex gap-4">
              <div className="h-5 flex-1 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (rounds.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-headline text-xl text-off-black dark:text-white">Pokal</h2>
        </div>
        <div className="p-8 text-center text-sm text-gray-400">
          Noch keine Pokaldaten vorhanden.
        </div>
      </div>
    );
  }

  const currentRound = rounds[activeRound];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Runden-Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {rounds.map((round, idx) => {
            const allFinished = round.matches.every((m) => m.status === "finished");
            const hasUpcoming = round.matches.some((m) => m.status === "scheduled");
            return (
              <button
                key={idx}
                onClick={() => setActiveRound(idx)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                  activeRound === idx
                    ? "border-forest-green text-forest-green"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {round.name}
                {allFinished && (
                  <span className="ml-1.5 text-[10px] text-gray-400">✓</span>
                )}
                {hasUpcoming && !allFinished && (
                  <span className="ml-1.5 w-1.5 h-1.5 bg-electric-orange rounded-full inline-block" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Paarungen der aktiven Runde */}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {currentRound.matches.map((match) => (
          <div key={match.id} className="px-5 py-4">
            {/* Datum */}
            {match.date && (
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-2">
                {new Date(match.date).toLocaleDateString("de-DE", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  ...(match.status !== "finished" ? { hour: "2-digit", minute: "2-digit" } : {}),
                })}
              </p>
            )}

            {/* Paarung */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium flex-1 ${
                match.status === "finished" && match.homeScore !== null && match.awayScore !== null && match.homeScore > match.awayScore
                  ? "text-off-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {match.homeTeam}
              </span>

              <div className={`text-sm font-bold px-3 py-1 rounded min-w-[52px] text-center ${
                match.status === "finished"
                  ? "bg-gray-100 dark:bg-gray-700 text-off-black dark:text-white"
                  : match.status === "live"
                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 animate-pulse"
                  : "bg-gray-50 dark:bg-gray-700/50 text-gray-400"
              }`}>
                {match.status === "finished" || match.status === "live"
                  ? `${match.homeScore}:${match.awayScore}`
                  : "-:-"
                }
              </div>

              <span className={`text-sm font-medium flex-1 text-right ${
                match.status === "finished" && match.homeScore !== null && match.awayScore !== null && match.awayScore > match.homeScore
                  ? "text-off-black dark:text-white"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {match.awayTeam}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
