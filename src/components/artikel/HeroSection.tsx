"use client";

import Link from "next/link";
import Image from "next/image";
import { Artikel } from "@/lib/types";
import { useReadArticles } from "@/hooks/useReadArticles";
import NewBadge from "@/components/ui/NewBadge";
import FavoritesBadge from "@/components/user/FavoritesBadge";
import { KATEGORIE_LABELS } from "@/lib/types";
import { calculateReadingTime } from "@/lib/utils";
import LeagueSnapshot from "@/components/liga/LeagueSnapshot";

// Map section titles to league IDs for snapshot
const LEAGUE_ID_MAP: Record<string, string> = {
  "Regionalliga Nordost": "regionalliga-nordost",
  "Oberliga NOFV Nord": "oberliga-nofv-nord",
  "Berlin-Liga": "berlin-liga",
  "Bundesliga": "bundesliga-1",
  "2. Bundesliga": "bundesliga-2",
  "3. Liga": "liga-3",
};

interface HeroSectionProps {
  hero: Artikel;
  sidebar: Artikel[];
  sectionTitle?: string;
  isLast?: boolean;
}

function CommentIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function ReadBadge({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-forest-green text-white flex-shrink-0 ${className}`}>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function HeroSection({ hero, sidebar, sectionTitle, isLast = false }: HeroSectionProps) {
  const { isRead } = useReadArticles();
  const heroIsRead = isRead(hero.slug);

  return (
    <section className={`${!isLast ? "border-b border-gray-200 dark:border-gray-700 pb-10 mb-10" : "pb-8"}`}>
      {/* Section Title */}
      {sectionTitle && (
        <h2 className="font-mono text-2xl font-semibold text-off-black dark:text-white mb-[10px] sticky top-12 bg-off-white dark:bg-gray-900 py-2 -mx-4 px-4 z-10">
          {sectionTitle}
        </h2>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Hero Article */}
        <article className="group">
          <Link href={`/artikel/${hero.slug}`} className="block">
            {/* Image - 16:9 */}
            <div className="aspect-[16/9] relative overflow-hidden mb-[10px] bg-gray-200 dark:bg-gray-800 group-hover:shadow-xl transition-shadow duration-300">
              {hero.bild && (
                <Image
                  src={hero.bild.url}
                  alt={hero.bild.alt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-[10px]">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {KATEGORIE_LABELS[hero.kategorie]}
              </span>
              <NewBadge date={hero.datum} />
              <FavoritesBadge ligaId={hero.ligaId} />
            </div>

            {/* Headline */}
            <h3 className={`font-headline text-3xl lg:text-4xl font-bold leading-tight group-hover:text-forest-green dark:group-hover:text-green-400 transition-colors ${
              heroIsRead ? "text-gray-500 dark:text-gray-400" : "text-off-black dark:text-white"
            }`}>
              <span>{hero.titel}</span>
              {heroIsRead && <ReadBadge className="w-6 h-6 inline-block ml-2 align-middle" />}
            </h3>

            {/* Teaser */}
            <p className="text-gray-600 dark:text-gray-400 mt-[10px] line-clamp-2 text-[15px] leading-relaxed">
              {hero.teaser}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-[10px] font-mono text-xs text-gray-400 dark:text-gray-500">
              {hero.autor && <span className="text-gray-600 dark:text-gray-300">{hero.autor.name}</span>}
              <span>{hero.lesedauer ?? calculateReadingTime(hero.inhalt ?? hero.teaser)} Min.</span>
              <CommentIcon />
            </div>
          </Link>
        </article>

        {/* Sidebar Articles */}
        <div className="lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-6 flex flex-col gap-[10px]">
          {sidebar.map((artikel) => {
            const artikelIsRead = isRead(artikel.slug);

            return (
              <article
                key={artikel.slug}
                className="bg-gray-100 dark:bg-gray-800 rounded-sm"
              >
                <Link href={`/artikel/${artikel.slug}`} className="group flex gap-4 p-3">
                  {/* Thumbnail */}
                  <div className="w-[120px] sm:w-[140px] aspect-[3/2] relative flex-shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700 group-hover:shadow-md transition-shadow duration-300">
                    {artikel.bild && (
                      <Image
                        src={artikel.bild.url}
                        alt={artikel.bild.alt}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Content — Autor oben, Headline unten (am Thumbnail-Bottom ausgerichtet) */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Badges */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <NewBadge date={artikel.datum} />
                        <FavoritesBadge ligaId={artikel.ligaId} />
                      </div>
                      {/* Meta / Autor */}
                      <div className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
                        {artikel.autor && <span className="text-gray-500 dark:text-gray-400">{artikel.autor.name}</span>}
                      </div>
                    </div>
                    {/* Headline — Söhne Schmal Dreiviertelfett */}
                    <h4 className={`font-sans text-[15px] leading-snug font-bold group-hover:text-forest-green dark:group-hover:text-green-400 transition-colors ${
                      artikelIsRead ? "text-gray-500 dark:text-gray-400" : "text-off-black dark:text-white"
                    }`}>
                      <span className="line-clamp-3">{artikel.titel}</span>
                      {artikelIsRead && <ReadBadge className="w-4 h-4 inline-block ml-1 align-middle" />}
                    </h4>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* Tabelle + Ergebnisse Snapshot */}
      {sectionTitle && LEAGUE_ID_MAP[sectionTitle] && (
        <LeagueSnapshot
          leagueId={LEAGUE_ID_MAP[sectionTitle]}
          leagueSlug={LEAGUE_ID_MAP[sectionTitle]}
        />
      )}
    </section>
  );
}
