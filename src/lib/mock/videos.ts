// Mock-Daten für Video-Reels

export type VideoPlatform = "instagram" | "tiktok" | "youtube" | "direct";

export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl?: string;
  platform: VideoPlatform;
  duration: string; // Format: "0:44", "1:23"
  date: string;
  leagueId?: string;
}

// Platzhalter-Thumbnails mit verschiedenen Fußball-Motiven
const PLACEHOLDER_THUMBNAILS = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=711&fit=crop", // Stadion
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=711&fit=crop", // Spieler
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=711&fit=crop", // Ball
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=711&fit=crop", // Fans
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=711&fit=crop", // Tor
  "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=711&fit=crop", // Training
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=711&fit=crop", // Jubel
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=711&fit=crop", // Flutlicht
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Traumtor! BAK-Stürmer trifft aus 30 Metern",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[0],
    videoUrl: "https://www.instagram.com/reel/example1/",
    embedUrl: "https://www.instagram.com/reel/example1/embed/",
    platform: "instagram",
    duration: "0:32",
    date: "2026-02-08",
    leagueId: "berlin-liga",
  },
  {
    id: "v2",
    title: "Derby-Stimmung: BFC vs. Union II – Die Highlights",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[1],
    videoUrl: "https://www.youtube.com/shorts/example2",
    embedUrl: "https://www.youtube.com/embed/example2",
    platform: "youtube",
    duration: "0:58",
    date: "2026-02-07",
    leagueId: "regionalliga-nordost",
  },
  {
    id: "v3",
    title: "Elfmeter-Drama: So lief das Pokal-Aus",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[2],
    videoUrl: "https://www.tiktok.com/@berlinfussball/video/example3",
    embedUrl: "https://www.tiktok.com/embed/example3",
    platform: "tiktok",
    duration: "0:44",
    date: "2026-02-06",
    leagueId: "berliner-pokal",
  },
  {
    id: "v4",
    title: "Türkiyemspor feiert Derbysieg – Fans rasten aus!",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[3],
    videoUrl: "https://www.instagram.com/reel/example4/",
    embedUrl: "https://www.instagram.com/reel/example4/embed/",
    platform: "instagram",
    duration: "0:27",
    date: "2026-02-05",
    leagueId: "berlin-liga",
  },
  {
    id: "v5",
    title: "Training mit den Profis: Ein Tag bei Hertha II",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[4],
    videoUrl: "https://www.youtube.com/shorts/example5",
    embedUrl: "https://www.youtube.com/embed/example5",
    platform: "youtube",
    duration: "1:12",
    date: "2026-02-04",
    leagueId: "regionalliga-nordost",
  },
  {
    id: "v6",
    title: "Best of Wochenende: Die schönsten Tore",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[5],
    videoUrl: "https://www.instagram.com/reel/example6/",
    embedUrl: "https://www.instagram.com/reel/example6/embed/",
    platform: "instagram",
    duration: "1:34",
    date: "2026-02-03",
  },
  {
    id: "v7",
    title: "Kreisliga-Wahnsinn: 7 Tore in 10 Minuten",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[6],
    videoUrl: "https://www.tiktok.com/@berlinfussball/video/example7",
    embedUrl: "https://www.tiktok.com/embed/example7",
    platform: "tiktok",
    duration: "0:51",
    date: "2026-02-02",
    leagueId: "kreisliga-a",
  },
  {
    id: "v8",
    title: "Interview: Neuzugang bei Tennis Borussia",
    thumbnailUrl: PLACEHOLDER_THUMBNAILS[7],
    videoUrl: "https://www.youtube.com/shorts/example8",
    embedUrl: "https://www.youtube.com/embed/example8",
    platform: "youtube",
    duration: "2:05",
    date: "2026-02-01",
    leagueId: "berlin-liga",
  },
];

// Helper: Videos nach Liga
export function getVideosByLeague(leagueId: string): Video[] {
  return MOCK_VIDEOS.filter((v) => v.leagueId === leagueId);
}

// Helper: Neueste Videos
export function getLatestVideos(limit: number = 8): Video[] {
  return [...MOCK_VIDEOS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Helper: Platform Icon
export function getPlatformIcon(platform: VideoPlatform): string {
  const icons: Record<VideoPlatform, string> = {
    instagram: "📸",
    tiktok: "🎵",
    youtube: "▶️",
    direct: "🎬",
  };
  return icons[platform];
}

// Helper: Platform Label
export function getPlatformLabel(platform: VideoPlatform): string {
  const labels: Record<VideoPlatform, string> = {
    instagram: "Instagram",
    tiktok: "TikTok",
    youtube: "YouTube",
    direct: "Video",
  };
  return labels[platform];
}
