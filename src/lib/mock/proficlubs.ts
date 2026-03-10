import { Artikel } from "@/lib/types";
import { Team, Match } from "./matches";

// === Profi-Club Interface ===

export interface ProfiClub {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  leagueId: string;
  leagueName: string;
  stadium: string;
  colors: { primary: string; secondary: string };
  initials: string;
  description: string;
}

export interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalDiff: string;
  points: number;
  isHighlighted?: boolean;
}

// === Club-Daten ===

export const PROFI_CLUBS: ProfiClub[] = [
  {
    id: "hertha",
    name: "Hertha BSC",
    shortName: "Hertha",
    slug: "hertha",
    leagueId: "2-bundesliga",
    leagueName: "2. Bundesliga",
    stadium: "Olympiastadion",
    colors: { primary: "#005CA9", secondary: "#FFFFFF" },
    initials: "BSC",
    description:
      "Hertha BSC ist der bekannteste Fußballverein der Hauptstadt. Gegründet 1892 spielt die Alte Dame aktuell in der 2. Bundesliga und kämpft um die Rückkehr ins Oberhaus.",
  },
  {
    id: "union",
    name: "1. FC Union Berlin",
    shortName: "Union",
    slug: "union",
    leagueId: "bundesliga",
    leagueName: "Bundesliga",
    stadium: "Stadion An der Alten Försterei",
    colors: { primary: "#ED1C24", secondary: "#1D1D1B" },
    initials: "FCU",
    description:
      "Der 1. FC Union Berlin steht für Leidenschaft und Zusammenhalt. Nach dem historischen Aufstieg 2019 hat sich Union in der Bundesliga etabliert und sich bis in die Champions League gespielt.",
  },
];

export function getProfiClubBySlug(slug: string): ProfiClub | undefined {
  return PROFI_CLUBS.find((c) => c.slug === slug);
}

// === Teams ===

const HERTHA_TEAM: Team = {
  id: "hertha",
  name: "Hertha BSC",
  shortName: "Hertha",
  color: "#005CA9",
};

const UNION_TEAM: Team = {
  id: "union",
  name: "1. FC Union Berlin",
  shortName: "Union",
  color: "#ED1C24",
};

// === Hertha Mock-Artikel ===

export const HERTHA_ARTICLES: Artikel[] = [
  {
    id: "hertha-1",
    titel: "Hertha kämpft um den Aufstieg — Sieg gegen Schalke",
    slug: "hertha-kaempft-aufstieg-sieg-schalke",
    teaser:
      "Mit einem verdienten 2:1-Heimsieg gegen den FC Schalke 04 bleibt Hertha BSC im Aufstiegsrennen der 2. Bundesliga. Derry Scherhant traf doppelt.",
    datum: "2026-02-28",
    kategorie: "spielbericht",
    ligaId: "2-bundesliga",
    vereinIds: ["hertha"],
    tags: ["Hertha BSC", "2. Bundesliga", "Aufstieg"],
    autor: { name: "Max Krüger" },
    lesedauer: 5,
    bild: {
      url: "https://placehold.co/800x450/005CA9/FFFFFF?text=Hertha+BSC",
      alt: "Hertha BSC Spielszene",
    },
  },
  {
    id: "hertha-2",
    titel: "Transfergerüchte: Kommt ein Stürmer aus der Bundesliga?",
    slug: "hertha-transfer-stuermer-bundesliga",
    teaser:
      "Hertha BSC soll an einem Angreifer aus der Bundesliga dran sein. Der Verein will die Offensive für den Aufstiegskampf verstärken.",
    datum: "2026-02-25",
    kategorie: "transfer",
    ligaId: "2-bundesliga",
    vereinIds: ["hertha"],
    tags: ["Hertha BSC", "Transfer", "2. Bundesliga"],
    autor: { name: "Lisa Berger" },
    lesedauer: 4,
    bild: {
      url: "https://placehold.co/800x450/005CA9/FFFFFF?text=Transfer",
      alt: "Hertha Transfer",
    },
  },
  {
    id: "hertha-3",
    titel: "Fiél setzt auf die Jugend — U23-Spieler überzeugen",
    slug: "hertha-fiel-jugend-u23",
    teaser:
      "Trainer Cristian Fiél gibt den eigenen Talenten eine Chance. Gleich drei U23-Spieler standen zuletzt in der Startelf.",
    datum: "2026-02-22",
    kategorie: "analyse",
    ligaId: "2-bundesliga",
    vereinIds: ["hertha"],
    tags: ["Hertha BSC", "Jugend", "Cristian Fiél"],
    autor: { name: "Max Krüger" },
    lesedauer: 6,
    bild: {
      url: "https://placehold.co/800x450/005CA9/FFFFFF?text=Jugend",
      alt: "Hertha Jugend",
    },
  },
  {
    id: "hertha-4",
    titel: "Olympiastadion: Zuschauerzahlen auf Rekordkurs",
    slug: "hertha-olympiastadion-zuschauer-rekord",
    teaser:
      "Trotz 2. Liga strömen die Fans ins Olympiastadion. Hertha vermeldet die besten Zuschauerzahlen seit fünf Jahren.",
    datum: "2026-02-18",
    kategorie: "news",
    ligaId: "2-bundesliga",
    vereinIds: ["hertha"],
    tags: ["Hertha BSC", "Olympiastadion", "Fans"],
    autor: { name: "Lisa Berger" },
    lesedauer: 3,
    bild: {
      url: "https://placehold.co/800x450/005CA9/FFFFFF?text=Olympiastadion",
      alt: "Olympiastadion",
    },
  },
];

// === Union Mock-Artikel ===

export const UNION_ARTICLES: Artikel[] = [
  {
    id: "union-1",
    titel: "Union feiert Auswärtssieg in Frankfurt",
    slug: "union-auswaertssieg-frankfurt",
    teaser:
      "Der 1. FC Union Berlin gewinnt überraschend 2:0 bei Eintracht Frankfurt und klettert in der Tabelle. Jordan traf per Doppelpack.",
    datum: "2026-02-28",
    kategorie: "spielbericht",
    ligaId: "bundesliga",
    vereinIds: ["union"],
    tags: ["1. FC Union Berlin", "Bundesliga", "Eintracht Frankfurt"],
    autor: { name: "Toni Richter" },
    lesedauer: 5,
    bild: {
      url: "https://placehold.co/800x450/ED1C24/FFFFFF?text=Union+Berlin",
      alt: "Union Berlin Spielszene",
    },
  },
  {
    id: "union-2",
    titel: "Alte Försterei: Stadionausbau nimmt Formen an",
    slug: "union-alte-foersterei-stadionausbau",
    teaser:
      "Die Pläne für den Ausbau des Stadions An der Alten Försterei auf 37.000 Plätze werden konkreter. Baubeginn soll 2027 sein.",
    datum: "2026-02-24",
    kategorie: "news",
    ligaId: "bundesliga",
    vereinIds: ["union"],
    tags: ["1. FC Union Berlin", "Alte Försterei", "Stadionausbau"],
    autor: { name: "Toni Richter" },
    lesedauer: 4,
    bild: {
      url: "https://placehold.co/800x450/ED1C24/FFFFFF?text=Alte+F%C3%B6rsterei",
      alt: "Alte Försterei",
    },
  },
  {
    id: "union-3",
    titel: "Svensson-Effekt: Wie der Trainer Union stabilisiert",
    slug: "union-svensson-effekt-trainer",
    teaser:
      "Seit Bo Svenssons Amtsantritt hat Union nur ein Spiel verloren. Eine Analyse der taktischen Veränderungen.",
    datum: "2026-02-20",
    kategorie: "analyse",
    ligaId: "bundesliga",
    vereinIds: ["union"],
    tags: ["1. FC Union Berlin", "Bo Svensson", "Taktik"],
    autor: { name: "Max Krüger" },
    lesedauer: 7,
    bild: {
      url: "https://placehold.co/800x450/ED1C24/FFFFFF?text=Svensson",
      alt: "Bo Svensson",
    },
  },
  {
    id: "union-4",
    titel: "Fan-Kultur in Köpenick: Mehr als nur Fußball",
    slug: "union-fan-kultur-koepenick",
    teaser:
      "Union Berlin lebt von seiner einzigartigen Fan-Kultur. Ein Blick hinter die Kulissen des Kultvereins aus Köpenick.",
    datum: "2026-02-16",
    kategorie: "interview",
    ligaId: "bundesliga",
    vereinIds: ["union"],
    tags: ["1. FC Union Berlin", "Fans", "Köpenick"],
    autor: { name: "Lisa Berger" },
    lesedauer: 6,
    bild: {
      url: "https://placehold.co/800x450/ED1C24/FFFFFF?text=Fan-Kultur",
      alt: "Union Fan-Kultur",
    },
  },
];

// === Hertha Mock-Matches ===

export const HERTHA_MATCHES: Match[] = [
  {
    id: "h-1",
    homeTeam: HERTHA_TEAM,
    awayTeam: { id: "schalke", name: "FC Schalke 04", shortName: "S04", color: "#004D9D" },
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    date: "2026-02-28",
    time: "13:30",
    leagueId: "2-bundesliga",
    matchday: 24,
  },
  {
    id: "h-2",
    homeTeam: { id: "kaiserslautern", name: "1. FC Kaiserslautern", shortName: "FCK", color: "#E30613" },
    awayTeam: HERTHA_TEAM,
    homeScore: 1,
    awayScore: 1,
    status: "finished",
    date: "2026-02-22",
    time: "13:30",
    leagueId: "2-bundesliga",
    matchday: 23,
  },
  {
    id: "h-3",
    homeTeam: HERTHA_TEAM,
    awayTeam: { id: "hsv", name: "Hamburger SV", shortName: "HSV", color: "#004B8D" },
    homeScore: 3,
    awayScore: 0,
    status: "finished",
    date: "2026-02-15",
    time: "20:30",
    leagueId: "2-bundesliga",
    matchday: 22,
  },
  {
    id: "h-4",
    homeTeam: { id: "nuernberg", name: "1. FC Nürnberg", shortName: "FCN", color: "#8B0000" },
    awayTeam: HERTHA_TEAM,
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "2026-03-07",
    time: "13:30",
    leagueId: "2-bundesliga",
    matchday: 25,
  },
];

// === Union Mock-Matches ===

export const UNION_MATCHES: Match[] = [
  {
    id: "u-1",
    homeTeam: { id: "frankfurt", name: "Eintracht Frankfurt", shortName: "SGE", color: "#E1000F" },
    awayTeam: UNION_TEAM,
    homeScore: 0,
    awayScore: 2,
    status: "finished",
    date: "2026-02-28",
    time: "15:30",
    leagueId: "bundesliga",
    matchday: 24,
  },
  {
    id: "u-2",
    homeTeam: UNION_TEAM,
    awayTeam: { id: "wolfsburg", name: "VfL Wolfsburg", shortName: "WOB", color: "#65B32E" },
    homeScore: 1,
    awayScore: 0,
    status: "finished",
    date: "2026-02-22",
    time: "15:30",
    leagueId: "bundesliga",
    matchday: 23,
  },
  {
    id: "u-3",
    homeTeam: { id: "hoffenheim", name: "TSG Hoffenheim", shortName: "TSG", color: "#1961B5" },
    awayTeam: UNION_TEAM,
    homeScore: 2,
    awayScore: 2,
    status: "finished",
    date: "2026-02-15",
    time: "15:30",
    leagueId: "bundesliga",
    matchday: 22,
  },
  {
    id: "u-4",
    homeTeam: UNION_TEAM,
    awayTeam: { id: "mainz", name: "1. FSV Mainz 05", shortName: "M05", color: "#ED1C24" },
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    date: "2026-03-08",
    time: "15:30",
    leagueId: "bundesliga",
    matchday: 25,
  },
];

// === Tabellen-Auszüge ===

export const HERTHA_STANDINGS: StandingRow[] = [
  { position: 1, team: "1. FC Köln", played: 24, won: 16, drawn: 4, lost: 4, goalDiff: "+22", points: 52 },
  { position: 2, team: "Hamburger SV", played: 24, won: 14, drawn: 6, lost: 4, goalDiff: "+18", points: 48 },
  { position: 3, team: "Hertha BSC", played: 24, won: 14, drawn: 5, lost: 5, goalDiff: "+15", points: 47, isHighlighted: true },
  { position: 4, team: "FC Schalke 04", played: 24, won: 13, drawn: 5, lost: 6, goalDiff: "+12", points: 44 },
  { position: 5, team: "SC Paderborn", played: 24, won: 12, drawn: 6, lost: 6, goalDiff: "+8", points: 42 },
  { position: 6, team: "1. FC Kaiserslautern", played: 24, won: 11, drawn: 6, lost: 7, goalDiff: "+5", points: 39 },
  { position: 7, team: "Fortuna Düsseldorf", played: 24, won: 10, drawn: 7, lost: 7, goalDiff: "+3", points: 37 },
  { position: 8, team: "1. FC Nürnberg", played: 24, won: 10, drawn: 5, lost: 9, goalDiff: "-2", points: 35 },
];

export const UNION_STANDINGS: StandingRow[] = [
  { position: 1, team: "FC Bayern München", played: 24, won: 19, drawn: 3, lost: 2, goalDiff: "+42", points: 60 },
  { position: 2, team: "Bayer Leverkusen", played: 24, won: 17, drawn: 4, lost: 3, goalDiff: "+30", points: 55 },
  { position: 3, team: "VfB Stuttgart", played: 24, won: 14, drawn: 5, lost: 5, goalDiff: "+18", points: 47 },
  { position: 4, team: "Borussia Dortmund", played: 24, won: 13, drawn: 6, lost: 5, goalDiff: "+15", points: 45 },
  { position: 5, team: "RB Leipzig", played: 24, won: 13, drawn: 4, lost: 7, goalDiff: "+12", points: 43 },
  { position: 6, team: "Eintracht Frankfurt", played: 24, won: 12, drawn: 5, lost: 7, goalDiff: "+8", points: 41 },
  { position: 7, team: "1. FC Union Berlin", played: 24, won: 11, drawn: 5, lost: 8, goalDiff: "+4", points: 38, isHighlighted: true },
  { position: 8, team: "SC Freiburg", played: 24, won: 10, drawn: 7, lost: 7, goalDiff: "+3", points: 37 },
];
