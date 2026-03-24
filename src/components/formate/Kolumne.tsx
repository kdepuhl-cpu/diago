"use client";

import Link from "next/link";
import { Artikel } from "@/lib/types";

interface KolumneProps {
  article?: Artikel;
}

export default function Kolumne({ article }: KolumneProps) {
  if (!article) {
    return (
      <section className="mb-10">
        <div className="border-l-4 border-electric-orange bg-white dark:bg-gray-800 rounded-r-xl shadow-sm p-6 md:p-8">
          <p className="text-electric-orange text-xs font-bold uppercase tracking-wider mb-2">
            Kommentar
          </p>
          <h3 className="font-headline text-2xl md:text-3xl text-off-black dark:text-white mb-3">
            Die Kolumne
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
            Meinung, Einordnung, Haltung — jeden Freitag ein Kommentar zum Berliner Amateurfußball.
            Was bewegt die Szene, was muss sich ändern, was feiern wir?
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bald verfügbar
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <Link href={`/artikel/${article.slug}`} className="group block">
        <div className="border-l-4 border-electric-orange bg-white dark:bg-gray-800 rounded-r-xl shadow-sm p-6 md:p-8">
          <p className="text-electric-orange text-xs font-bold uppercase tracking-wider mb-2">
            Kommentar
          </p>
          <h3 className="font-headline text-2xl md:text-3xl text-off-black dark:text-white mb-3 group-hover:text-forest-green transition-colors">
            {article.titel}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 max-w-2xl">
            {article.teaser}
          </p>
          <div className="mt-4 flex items-center gap-3 text-gray-400 text-xs">
            <span className="font-medium text-off-black dark:text-white">{article.autor?.name}</span>
            <span>&middot;</span>
            <span>{article.lesedauer} Min. Lesezeit</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
