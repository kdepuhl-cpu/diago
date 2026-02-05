"use client";

import { useEffect, useState } from "react";
import { getUserProgress, getLevelForPoints, getProgressToNextLevel, getNextLevel } from "@/lib/gamification";
import { useReadArticles } from "@/hooks/useReadArticles";

export default function ReadingStats() {
  const { readArticles } = useReadArticles();
  const [stats, setStats] = useState({
    points: 0,
    level: "Kreisliga-Fan",
    articlesRead: 0,
    progressPercent: 0,
    pointsToNext: 0,
  });

  useEffect(() => {
    const progress = getUserProgress();
    const level = getLevelForPoints(progress.points);
    const nextLevel = getNextLevel(level);
    const progressPercent = getProgressToNextLevel(progress.points, level);
    const pointsToNext = nextLevel ? nextLevel.minPoints - progress.points : 0;

    setStats({
      points: progress.points,
      level: level.name,
      articlesRead: readArticles.length,
      progressPercent,
      pointsToNext,
    });
  }, [readArticles]);

  return (
    <div className="bg-gradient-to-br from-forest-green to-forest-green/80 rounded-2xl p-6 text-white">
      <h3 className="font-headline text-lg mb-4 opacity-90">Dein Fortschritt</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-3xl font-bold">{stats.articlesRead}</p>
          <p className="text-xs opacity-75">Artikel gelesen</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-3xl font-bold">{stats.points}</p>
          <p className="text-xs opacity-75">Punkte</p>
        </div>
      </div>

      {/* Level */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{stats.level}</span>
          {stats.pointsToNext > 0 && (
            <span className="text-xs opacity-75">
              Noch {stats.pointsToNext} Punkte
            </span>
          )}
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${stats.progressPercent}%` }}
          />
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-sm opacity-75 text-center">
        {stats.articlesRead === 0
          ? "Lies deinen ersten Artikel!"
          : stats.articlesRead < 5
          ? "Guter Start! Weiter so!"
          : stats.articlesRead < 10
          ? "Du bist auf dem besten Weg!"
          : "Du bist ein echter Fan!"}
      </p>
    </div>
  );
}
