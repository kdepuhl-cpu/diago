"use client";

import { Liga } from "@/lib/types";

interface LeagueNavProps {
  leagues: Liga[];
  activeLeague: string;
  onLeagueChange: (leagueId: string) => void;
}

export default function LeagueNav({
  leagues,
  activeLeague,
  onLeagueChange,
}: LeagueNavProps) {
  return (
    <nav className="border-b border-gray-100" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => onLeagueChange("all")}
            className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-colors relative ${
              activeLeague === "all"
                ? "text-forest-green"
                : "text-off-black/50 hover:text-off-black"
            }`}
          >
            Alle
            {activeLeague === "all" && (
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-forest-green" />
            )}
          </button>
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => onLeagueChange(league.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-semibold transition-colors relative ${
                activeLeague === league.id
                  ? "text-forest-green"
                  : "text-off-black/50 hover:text-off-black"
              }`}
            >
              {league.name}
              {activeLeague === league.id && (
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-forest-green" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
