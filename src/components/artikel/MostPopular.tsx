"use client";

import Link from "next/link";
import { Artikel } from "@/lib/types";
import { getLigaById } from "@/lib/data";
import { useReadArticles } from "@/hooks/useReadArticles";

interface MostPopularProps {
  articles: Artikel[];
}

// Read indicator - checkmark in circle
function ReadBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-forest-green text-white flex-shrink-0 ${className}`}>
      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

export default function MostPopular({ articles }: MostPopularProps) {
  const { isRead } = useReadArticles();

  return (
    <section className="py-8">
      {/* Section Title */}
      <h2 className="font-headline text-2xl text-off-black dark:text-white mb-6">Meistgelesen</h2>

      {/* Article List */}
      <div className="space-y-0">
        {articles.slice(0, 5).map((article, index) => {
          const liga = getLigaById(article.ligaId);
          const articleIsRead = isRead(article.slug);

          return (
            <article
              key={article.slug}
              className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                index === 0 ? "" : ""
              }`}
            >
              <Link
                href={`/artikel/${article.slug}`}
                className="group flex items-start gap-4 py-4"
              >
                {/* Large Number */}
                <span className="text-3xl font-bold text-gray-300 dark:text-gray-600 w-8 flex-shrink-0 leading-none pt-1">
                  {index + 1}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Liga Dachzeile */}
                  {liga && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-electric-orange dark:text-orange-400">
                      {liga.name}
                    </span>
                  )}

                  {/* Headline with Read Indicator */}
                  <h3
                    className={`font-semibold leading-snug mt-1 transition-colors flex items-center gap-1.5 ${
                      articleIsRead
                        ? "text-gray-500 dark:text-gray-400 group-hover:text-forest-green"
                        : "text-off-black dark:text-white group-hover:text-forest-green"
                    }`}
                  >
                    <span>{article.titel}</span>
                    {articleIsRead && <ReadBadge className="w-4 h-4 flex-shrink-0" />}
                  </h3>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
