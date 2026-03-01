"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { archivIssues, getAllDecades } from "@/lib/mock/epaper";

export default function ArchivPage() {
  const decades = getAllDecades();
  const [activeDecade, setActiveDecade] = useState<string | null>(null);

  const filteredIssues = activeDecade
    ? archivIssues.filter((issue) => issue.decade === activeDecade)
    : archivIssues;

  // Group by decade for section headers
  const groupedByDecade: Record<string, typeof archivIssues> = {};
  for (const issue of filteredIssues) {
    if (!groupedByDecade[issue.decade]) {
      groupedByDecade[issue.decade] = [];
    }
    groupedByDecade[issue.decade].push(issue);
  }

  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        {/* Header */}
        <h1 className="font-headline text-3xl sm:text-4xl text-off-black dark:text-white mb-2">
          FUWO Archiv
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
          Die Geschichte des Berliner Amateurfußballs — digitalisiert. Stöbere in
          historischen Ausgaben der Fußball-Woche aus über sechs Jahrzehnten.
        </p>

        {/* Decade Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          <button
            onClick={() => setActiveDecade(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeDecade === null
                ? "bg-forest-green text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Alle
          </button>
          {decades.map((decade) => (
            <button
              key={decade}
              onClick={() => setActiveDecade(decade)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDecade === decade
                  ? "bg-forest-green text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {decade}
            </button>
          ))}
        </div>

        {/* Issues by Decade */}
        {Object.entries(groupedByDecade)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([decade, issues]) => (
            <section key={decade} className="mb-12">
              <h2 className="font-headline text-xl sm:text-2xl text-off-black dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                {decade}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {issues.map((issue) => (
                  <Link
                    key={issue.id}
                    href={`/epaper/${issue.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md mb-3 archiv-sepia">
                      <Image
                        src={issue.coverImage}
                        alt={issue.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <span className="text-white text-xs font-semibold">
                          {issue.year}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-off-black dark:text-white group-hover:text-forest-green dark:group-hover:text-green-400 transition-colors leading-snug">
                      {issue.title}
                    </h3>
                    {issue.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {issue.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
      </main>

      <Footer />
    </div>
  );
}
