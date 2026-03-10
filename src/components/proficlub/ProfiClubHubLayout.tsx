"use client";

import Link from "next/link";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ProfiClubLogo from "./ProfiClubLogo";
import NextMatchWidget from "./NextMatchWidget";
import StandingsExcerpt from "./StandingsExcerpt";
import MatchResultsList from "./MatchResultsList";
import { ProfiClub, StandingRow } from "@/lib/mock/proficlubs";
import { Match } from "@/lib/mock/matches";
import { Artikel } from "@/lib/types";

interface ProfiClubHubLayoutProps {
  club: ProfiClub;
  articles: Artikel[];
  matches: Match[];
  standings: StandingRow[];
}

export default function ProfiClubHubLayout({ club, articles, matches, standings }: ProfiClubHubLayoutProps) {
  const nextMatch = matches.find((m) => m.status === "upcoming");
  const hero = articles[0];
  const sidebarArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/" className="hover:text-forest-green dark:hover:text-green-400 transition-colors">
            Start
          </Link>
          <span>/</span>
          <span className="text-off-black dark:text-white font-medium">{club.name}</span>
        </nav>

        {/* Club Header */}
        <div className="relative">
          <div className="h-3 rounded-t-xl" style={{ backgroundColor: club.colors.primary }} />
          <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border border-gray-200 dark:border-gray-700 border-t-0 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <ProfiClubLogo initials={club.initials} color={club.colors.primary} size="lg" />
              <div>
                <h1 className="font-headline text-3xl lg:text-4xl text-off-black dark:text-white">
                  {club.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: club.colors.primary }}
                  >
                    {club.leagueName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {club.stadium}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
                  {club.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-8">
          {/* Main Column */}
          <div className="space-y-6">
            <NextMatchWidget match={nextMatch} accentColor={club.colors.primary} />

            {/* Hero Article */}
            {hero && (
              <Link
                href={`/artikel/${hero.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {hero.bild && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hero.bild.url}
                      alt={hero.bild.alt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide"
                        style={{ backgroundColor: club.colors.primary }}
                      >
                        {hero.kategorie === "spielbericht"
                          ? "Spielbericht"
                          : hero.kategorie === "analyse"
                          ? "Analyse"
                          : hero.kategorie === "transfer"
                          ? "Transfer"
                          : hero.kategorie === "interview"
                          ? "Interview"
                          : "News"}
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h2 className="font-headline text-xl sm:text-2xl text-off-black dark:text-white group-hover:opacity-80 transition-opacity">
                    {hero.titel}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                    {hero.teaser}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    {hero.autor && <span>{hero.autor.name}</span>}
                    {hero.lesedauer && <span>{hero.lesedauer} Min. Lesezeit</span>}
                  </div>
                </div>
              </Link>
            )}

            <MatchResultsList matches={matches} accentColor={club.colors.primary} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StandingsExcerpt
              standings={standings}
              leagueName={club.leagueName}
              accentColor={club.colors.primary}
            />

            {/* Sidebar Articles */}
            {sidebarArticles.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: club.colors.primary }} />
                <div className="p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                    Weitere Artikel
                  </h3>
                  <div className="space-y-4">
                    {sidebarArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/artikel/${article.slug}`}
                        className="group block"
                      >
                        <h4 className="text-sm font-semibold text-off-black dark:text-white group-hover:opacity-80 transition-opacity line-clamp-2">
                          {article.titel}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {article.autor?.name}
                          {" · "}
                          {new Date(article.datum).toLocaleDateString("de-DE", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
