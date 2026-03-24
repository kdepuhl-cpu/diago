"use client";

import Link from "next/link";
import Image from "next/image";
import { Artikel } from "@/lib/types";

interface InterviewDerWocheProps {
  article?: Artikel;
}

export default function InterviewDerWoche({ article }: InterviewDerWocheProps) {
  if (!article) {
    return (
      <section className="mb-10">
        <div className="bg-off-black dark:bg-gray-950 rounded-2xl overflow-hidden text-white">
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-full bg-electric-orange/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-electric-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              <p className="text-electric-orange text-xs font-bold uppercase tracking-wider">
                Interview der Woche
              </p>
            </div>
            <h3 className="font-headline text-2xl md:text-3xl mb-3">
              Gesichter des Berliner Amateurfußballs
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
              Spieler, Trainer, Ehrenamtliche — wir sprechen jede Woche mit Menschen,
              die den Berliner Fußball am Laufen halten. Persönlich, direkt, ehrlich.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-gray-500 text-xs">
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
        <div className="bg-off-black dark:bg-gray-950 rounded-2xl overflow-hidden text-white">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
            {/* Text */}
            <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-full bg-electric-orange/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-electric-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                <p className="text-electric-orange text-xs font-bold uppercase tracking-wider">
                  Interview der Woche
                </p>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl mb-3 group-hover:text-electric-orange transition-colors">
                {article.titel}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 max-w-2xl">
                {article.teaser}
              </p>
              <div className="mt-4 flex items-center gap-3 text-gray-500 text-xs">
                <span className="font-medium text-white">{article.autor?.name}</span>
                <span>&middot;</span>
                <span>{article.lesedauer} Min. Lesezeit</span>
              </div>
            </div>

            {/* Bild */}
            {article.bild && (
              <div className="relative w-full md:w-64 aspect-[4/3] md:aspect-auto">
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
