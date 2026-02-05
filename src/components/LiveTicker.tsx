"use client";

import { useRef } from "react";
import Link from "next/link";
import { Match, ALL_MATCHES } from "@/lib/mock/matches";

interface LiveTickerProps {
  matches?: Match[];
  title?: string;
}

// Team Logo Placeholder (farbiger Kreis mit Initialen)
function TeamLogo({ name, shortName, color }: { name: string; shortName: string; color: string }) {
  const initials = shortName.slice(0, 2).toUpperCase();

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
      title={name}
    >
      {initials}
    </div>
  );
}

// Status Badge
function StatusBadge({ status, minute }: { status: Match["status"]; minute?: number }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        LIVE {minute}&apos;
      </span>
    );
  }

  if (status === "finished") {
    return (
      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
        Beendet
      </span>
    );
  }

  return null;
}

// Match Card
function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
    <Link
      href={`/spiel/${match.id}`}
      className={`flex-shrink-0 w-[200px] bg-white dark:bg-gray-800 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        isLive
          ? "border-red-300 dark:border-red-500/50 shadow-red-100 dark:shadow-red-500/10"
          : "border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="p-3">
        {/* Status */}
        <div className="flex items-center justify-between mb-3">
          {isLive ? (
            <StatusBadge status="live" minute={match.minute} />
          ) : isUpcoming ? (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {match.time}
            </span>
          ) : (
            <StatusBadge status="finished" />
          )}
        </div>

        {/* Teams */}
        <div className="space-y-2">
          {/* Home */}
          <div className="flex items-center gap-2">
            <TeamLogo
              name={match.homeTeam.name}
              shortName={match.homeTeam.shortName}
              color={match.homeTeam.color}
            />
            <span className="flex-1 text-sm font-medium text-off-black dark:text-white truncate">
              {match.homeTeam.shortName}
            </span>
            <span className={`text-lg font-bold ${
              isLive ? "text-red-500" : "text-off-black dark:text-white"
            }`}>
              {match.homeScore ?? "-"}
            </span>
          </div>

          {/* Away */}
          <div className="flex items-center gap-2">
            <TeamLogo
              name={match.awayTeam.name}
              shortName={match.awayTeam.shortName}
              color={match.awayTeam.color}
            />
            <span className="flex-1 text-sm font-medium text-off-black dark:text-white truncate">
              {match.awayTeam.shortName}
            </span>
            <span className={`text-lg font-bold ${
              isLive ? "text-red-500" : "text-off-black dark:text-white"
            }`}>
              {match.awayScore ?? "-"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function LiveTicker({ matches = ALL_MATCHES, title = "Ergebnisse" }: LiveTickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Sort: Live first, then upcoming, then finished
  const sortedMatches = [...matches].sort((a, b) => {
    const order = { live: 0, upcoming: 1, finished: 2 };
    return order[a.status] - order[b.status];
  });

  const liveCount = matches.filter((m) => m.status === "live").length;

  return (
    <section className="py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-headline text-lg text-off-black dark:text-white">
              {title}
            </h2>
            {liveCount > 0 && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                {liveCount} Live
              </span>
            )}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Nach links scrollen"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Nach rechts scrollen"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4"
        >
          {sortedMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
