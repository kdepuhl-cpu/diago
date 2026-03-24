/**
 * OpenLigaDB API Client
 *
 * Legale, kostenlose API für deutsche Fußball-Ligen.
 * Lizenz: Open Database License (ODbL)
 * Docs: https://api.openligadb.de/index.html
 *
 * Verfügbare Ligen:
 *   bl1  = Bundesliga
 *   bl2  = 2. Bundesliga
 *   bl3  = 3. Liga
 *   dfb  = DFB-Pokal
 *   rlno = Regionalliga Nordost
 */

const API_BASE = "https://api.openligadb.de";

// Mapping: unsere Liga-IDs → OpenLigaDB Shortcuts + Saison
export interface OpenLigaMapping {
  leagueId: string;         // unsere ID (z.B. "bundesliga")
  shortcut: string;         // OpenLigaDB shortcut (z.B. "bl1")
  season: number;           // Saison-Startjahr (z.B. 2025 für 25/26)
}

export const OPENLIGA_LEAGUES: OpenLigaMapping[] = [
  { leagueId: "bundesliga",           shortcut: "bl1",  season: 2025 },
  { leagueId: "2-bundesliga",         shortcut: "bl2",  season: 2025 },
  { leagueId: "3-liga",               shortcut: "bl3",  season: 2025 },
  { leagueId: "dfb-pokal",            shortcut: "dfb",  season: 2025 },
  { leagueId: "regionalliga-nordost", shortcut: "rlno", season: 2025 },
];

// Hilfsfunktion: unsere leagueId → OpenLigaDB mapping
export function getOpenLigaMapping(leagueId: string): OpenLigaMapping | undefined {
  return OPENLIGA_LEAGUES.find((m) => m.leagueId === leagueId);
}

export function isOpenLigaLeague(leagueId: string): boolean {
  return OPENLIGA_LEAGUES.some((m) => m.leagueId === leagueId);
}

// ─── API Types ──────────────────────────────────────────────────

interface OLTeam {
  teamId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
}

interface OLMatchResult {
  resultName: string;       // "Halbzeit", "Endergebnis"
  pointsTeam1: number;
  pointsTeam2: number;
  resultOrderID: number;
  resultTypeID: number;
}

interface OLGroup {
  groupName: string;        // "1. Spieltag"
  groupOrderID: number;
}

export interface OLMatch {
  matchID: number;
  matchDateTime: string;
  matchDateTimeUTC: string;
  matchIsFinished: boolean;
  group: OLGroup;
  team1: OLTeam;
  team2: OLTeam;
  matchResults: OLMatchResult[];
}

export interface OLTableEntry {
  teamInfoId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
  points: number;
  matches: number;
  won: number;
  draw: number;
  lost: number;
  goals: number;
  opponentGoals: number;
  goalDiff: number;
}

// ─── API Calls ──────────────────────────────────────────────────

async function olFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    next: { revalidate: 300 }, // 5 Min. Cache (Next.js)
  });
  if (!res.ok) {
    throw new Error(`OpenLigaDB ${res.status}: ${endpoint}`);
  }
  return res.json();
}

/**
 * Aktuelle Tabelle einer Liga
 */
export async function getOpenLigaTable(shortcut: string, season: number): Promise<OLTableEntry[]> {
  return olFetch<OLTableEntry[]>(`/getbltable/${shortcut}/${season}`);
}

/**
 * Alle Spiele einer Liga/Saison
 */
export async function getOpenLigaMatches(shortcut: string, season: number): Promise<OLMatch[]> {
  return olFetch<OLMatch[]>(`/getmatchdata/${shortcut}/${season}`);
}

/**
 * Spiele eines bestimmten Spieltags
 */
export async function getOpenLigaMatchday(shortcut: string, season: number, matchday: number): Promise<OLMatch[]> {
  return olFetch<OLMatch[]>(`/getmatchdata/${shortcut}/${season}/${matchday}`);
}

/**
 * Aktueller Spieltag
 */
export async function getOpenLigaCurrentMatchday(shortcut: string): Promise<OLMatch[]> {
  return olFetch<OLMatch[]>(`/getmatchdata/${shortcut}`);
}

/**
 * Nächstes Spiel einer Liga
 */
export async function getOpenLigaNextMatch(shortcut: string): Promise<OLMatch> {
  return olFetch<OLMatch>(`/getnextmatchbyleagueshortcut/${shortcut}`);
}

// ─── Converter: OpenLigaDB → unsere Typen ───────────────────────

import type { Standing } from "./standings";
import type { LeagueMatch } from "./standings";

export function olTableToStandings(entries: OLTableEntry[]): Standing[] {
  return entries.map((entry, index) => {
    const diff = entry.goalDiff;
    return {
      pos: index + 1,
      team: entry.teamName,
      teamId: String(entry.teamInfoId),
      sp: entry.matches,
      s: entry.won,
      u: entry.draw,
      n: entry.lost,
      tore: `${entry.goals}:${entry.opponentGoals}`,
      diff: diff > 0 ? `+${diff}` : `${diff}`,
      pkt: entry.points,
    };
  });
}

export function olMatchToLeagueMatch(match: OLMatch): LeagueMatch {
  // Endergebnis finden (resultOrderID 2 oder letztes Ergebnis)
  const endResult = match.matchResults?.find((r) => r.resultOrderID === 2)
    || match.matchResults?.[match.matchResults.length - 1];

  const homeScore = endResult?.pointsTeam1 ?? null;
  const awayScore = endResult?.pointsTeam2 ?? null;

  // Status ableiten
  let status: LeagueMatch["status"] = "scheduled";
  if (match.matchIsFinished) {
    status = "finished";
  } else if (homeScore !== null && awayScore !== null) {
    status = "live";
  }

  // Spieltag aus group.groupName parsen ("1. Spieltag" → 1)
  const matchdayMatch = match.group?.groupName?.match(/(\d+)/);
  const matchday = matchdayMatch ? parseInt(matchdayMatch[1]) : null;

  return {
    id: String(match.matchID),
    matchday,
    date: match.matchDateTimeUTC || match.matchDateTime,
    homeTeam: match.team1.teamName,
    awayTeam: match.team2.teamName,
    homeScore,
    awayScore,
    status,
    fussballDeUrl: null,
  };
}

/**
 * Kommende Spiele aus allen Matches filtern
 */
export function getUpcomingFromMatches(matches: OLMatch[], limit = 8): LeagueMatch[] {
  const now = new Date();
  return matches
    .filter((m) => !m.matchIsFinished && new Date(m.matchDateTimeUTC || m.matchDateTime) > now)
    .sort((a, b) => new Date(a.matchDateTimeUTC || a.matchDateTime).getTime() - new Date(b.matchDateTimeUTC || b.matchDateTime).getTime())
    .slice(0, limit)
    .map(olMatchToLeagueMatch);
}

/**
 * Letzte Ergebnisse aus allen Matches filtern
 */
export function getRecentFromMatches(matches: OLMatch[], limit = 8): LeagueMatch[] {
  return matches
    .filter((m) => m.matchIsFinished)
    .sort((a, b) => new Date(b.matchDateTimeUTC || b.matchDateTime).getTime() - new Date(a.matchDateTimeUTC || a.matchDateTime).getTime())
    .slice(0, limit)
    .map(olMatchToLeagueMatch);
}
