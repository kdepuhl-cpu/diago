export interface UserProgress {
  points: number;
  readArticles: string[];
  level: string;
}

export interface Level {
  name: string;
  minPoints: number;
  maxPoints: number;
}

export const LEVELS: Level[] = [
  { name: "Kreisliga-Fan", minPoints: 0, maxPoints: 50 },
  { name: "Bezirksliga-Kenner", minPoints: 51, maxPoints: 150 },
  { name: "Landesliga-Experte", minPoints: 151, maxPoints: 300 },
  { name: "Oberliga-Veteran", minPoints: 301, maxPoints: 500 },
  { name: "Bundesliga-Legende", minPoints: 501, maxPoints: Infinity },
];

export const POINTS_PER_ARTICLE = 10;

export function getLevelForPoints(points: number): Level {
  return LEVELS.find((level) => points >= level.minPoints && points <= level.maxPoints) || LEVELS[0];
}

export function getNextLevel(currentLevel: Level): Level | null {
  const currentIndex = LEVELS.findIndex((l) => l.name === currentLevel.name);
  if (currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1];
  }
  return null;
}

export function getProgressToNextLevel(points: number, currentLevel: Level): number {
  const nextLevel = getNextLevel(currentLevel);
  if (!nextLevel) return 100;

  const pointsInLevel = points - currentLevel.minPoints;
  const levelRange = nextLevel.minPoints - currentLevel.minPoints;
  return Math.min((pointsInLevel / levelRange) * 100, 100);
}

const STORAGE_KEY = "diago_user_progress";

export function getUserProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { points: 0, readArticles: [], level: LEVELS[0].name };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { points: 0, readArticles: [], level: LEVELS[0].name };
    }
  }
  return { points: 0, readArticles: [], level: LEVELS[0].name };
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markArticleAsRead(articleId: string): {
  newPoints: number;
  levelUp: boolean;
  previousLevel: string;
  currentLevel: string;
} {
  const progress = getUserProgress();

  // Check if already read
  if (progress.readArticles.includes(articleId)) {
    const level = getLevelForPoints(progress.points);
    return {
      newPoints: progress.points,
      levelUp: false,
      previousLevel: level.name,
      currentLevel: level.name,
    };
  }

  const previousLevel = getLevelForPoints(progress.points);
  const newPoints = progress.points + POINTS_PER_ARTICLE;
  const currentLevel = getLevelForPoints(newPoints);

  const newProgress: UserProgress = {
    points: newPoints,
    readArticles: [...progress.readArticles, articleId],
    level: currentLevel.name,
  };

  saveUserProgress(newProgress);

  return {
    newPoints,
    levelUp: previousLevel.name !== currentLevel.name,
    previousLevel: previousLevel.name,
    currentLevel: currentLevel.name,
  };
}

export function isArticleRead(articleId: string): boolean {
  const progress = getUserProgress();
  return progress.readArticles.includes(articleId);
}
