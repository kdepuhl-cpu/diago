"use client";

import { useState, useEffect } from "react";
import { getUpcomingMatches, getRecentResults, type LeagueMatch } from "@/lib/api/standings";

interface LeagueMatchesProps {
  leagueId: string;
}

export default function LeagueMatches({ leagueId }: LeagueMatchesProps) {
  const [tab, setTab] = useState<"results" | "upcoming">("results");
  const [upcoming, setUpcoming] = useState<LeagueMatch[]>([]);
  const [results, setResults] = useState<LeagueMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getUpcomingMatches(leagueId, 10),
      getRecentResults(leagueId, 10),
    ])
      .then(([up, res]) => {
        setUpcoming(up);
        setResults(res);
        // Default: Ergebnisse wenn vorhanden, sonst Kommende
        if (res.length === 0 && up.length > 0) setTab("upcoming");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [leagueId]);

  const hasData = upcoming.length > 0 || results.length > 0;

  if (!loading && !hasData) return null;

  const matches = tab === "results" ? results : upcoming;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-headline text-xl text-off-black dark:text-white">Spiele</h2>
      </div>

      {/* Tabs — Ergebnisse zuerst */}
      {hasData && (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setTab("results")}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              tab === "results"
                ? "text-forest-green border-b-2 border-forest-green"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Ergebnisse ({results.length})
          </button>
          <button
            onClick={() => setTab("upcoming")}
            className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
              tab === "upcoming"
                ? "text-forest-green border-b-2 border-forest-green"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            Kommende ({upcoming.length})
          </button>
        </div>
      )}

      {loading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex justify-between items-center py-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      ) : matches.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-400 dark:text-gray-500">
          {tab === "results" ? "Noch keine Ergebnisse" : "Keine kommenden Spiele"}
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {matches.map((match) => (
            <div key={match.id} className="px-4 py-3">
              {/* Spieltag + Datum */}
              {(match.matchday || match.date) && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">
                  {match.matchday ? `${match.matchday}. Spieltag` : ""}
                  {match.matchday && match.date ? " • " : ""}
                  {match.date &&
                    new Date(match.date).toLocaleDateString("de-DE", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      ...(match.status !== "finished" ? { hour: "2-digit", minute: "2-digit" } : {}),
                    })
                  }
                </p>
              )}
              {/* Teams + Score */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-off-black dark:text-white truncate flex-1">
                  {match.homeTeam}
                </span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded min-w-[44px] text-center ${
                  match.status === "finished"
                    ? "bg-gray-100 dark:bg-gray-700 text-off-black dark:text-white"
                    : match.status === "live"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse"
                    : "text-gray-400 dark:text-gray-500"
                }`}>
                  {match.status === "finished" || match.status === "live"
                    ? `${match.homeScore}:${match.awayScore}`
                    : "-:-"
                  }
                </span>
                <span className="text-sm font-medium text-off-black dark:text-white truncate flex-1 text-right">
                  {match.awayTeam}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
