"use client";

import Link from "next/link";
import ProfiClubLogo from "./ProfiClubLogo";
import { Match } from "@/lib/mock/matches";
import { Artikel } from "@/lib/types";

interface ProfiClubHomeSectionProps {
  name: string;
  slug: string;
  initials: string;
  accentColor: string;
  leagueName: string;
  nextMatch?: Match;
  latestArticle?: Artikel;
}

export default function ProfiClubHomeSection({
  name,
  slug,
  initials,
  accentColor,
  leagueName,
  nextMatch,
  latestArticle,
}: ProfiClubHomeSectionProps) {
  return (
    <Link
      href={`/${slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="h-1.5" style={{ backgroundColor: accentColor }} />
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <ProfiClubLogo initials={initials} color={accentColor} size="sm" />
          <div className="min-w-0">
            <h3 className="font-headline text-xl text-off-black dark:text-white group-hover:opacity-80 transition-opacity truncate">
              {name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{leagueName}</span>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Next Match */}
        {nextMatch && (
          <div className="mb-3">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">
              Nächstes Spiel
            </span>
            <p className="text-sm font-medium text-off-black dark:text-white mt-0.5">
              {nextMatch.homeTeam.shortName} vs {nextMatch.awayTeam.shortName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(nextMatch.date).toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" })}
              {" · "}
              {nextMatch.time} Uhr
            </p>
          </div>
        )}

        {/* Latest Article */}
        {latestArticle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 border-t border-gray-100 dark:border-gray-700/50 pt-3">
            {latestArticle.titel}
          </p>
        )}
      </div>
    </Link>
  );
}
