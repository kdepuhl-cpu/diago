"use client";

import Link from "next/link";
import Image from "next/image";
import { Artikel } from "@/lib/types";

interface SpielerDerWocheProps {
  article?: Artikel;
}

export default function SpielerDerWoche({ article }: SpielerDerWocheProps) {
  // Placeholder wenn kein Artikel vorhanden
  if (!article) {
    return (
      <section className="mb-10">
        <div className="bg-gradient-to-br from-forest-green to-forest-green/80 rounded-2xl overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-10">
            <p className="text-electric-orange text-xs font-bold uppercase tracking-wider mb-2">
              Thema der Woche
            </p>
            <h2 className="font-headline text-3xl md:text-4xl text-white mb-3">
              Spieler der Woche
            </h2>
            <p className="text-white/70 text-sm max-w-lg">
              Jeden Montag: Wer hat am Wochenende den Unterschied gemacht?
              Unser Aufmacher mit dem besten Auftritt der Berliner Amateurliga-Woche.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-white/50 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Bald verfügbar
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <Link href={`/artikel/${article.slug}`} className="group block">
        <div className="bg-gradient-to-br from-forest-green to-forest-green/80 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Text */}
            <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col justify-center">
              <p className="text-electric-orange text-xs font-bold uppercase tracking-wider mb-2">
                Thema der Woche
              </p>
              <h2 className="font-headline text-3xl md:text-4xl text-white mb-3 group-hover:text-mint-green transition-colors">
                {article.titel}
              </h2>
              <p className="text-white/70 text-sm line-clamp-3">
                {article.teaser}
              </p>
              <div className="mt-4 flex items-center gap-3 text-white/50 text-xs">
                <span>{article.autor?.name}</span>
                <span>&middot;</span>
                <span>{article.lesedauer} Min. Lesezeit</span>
              </div>
            </div>

            {/* Bild */}
            {article.bild && (
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={article.bild.url}
                  alt={article.titel}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}
