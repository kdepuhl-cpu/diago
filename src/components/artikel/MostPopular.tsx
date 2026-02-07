"use client";

import Link from "next/link";
import { Artikel } from "@/lib/types";
import { getLigaById } from "@/lib/data";
import { useReadArticles } from "@/hooks/useReadArticles";

interface MostPopularProps {
  articles: Artikel[];
}

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
      <h2 className="font-headline text-2xl text-off-black dark:text-white mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-orange" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
        Meistgelesen
      </h2>

      <div>
        {articles.slice(0, 5).map((article, index) => {
          const liga = getLigaById(article.ligaId);
          const articleIsRead = isRead(article.slug);

          return (
            <article
              key={article.slug}
              className="border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              <Link
                href={`/artikel/${article.slug}`}
                className="group flex items-start gap-4 py-4"
              >
                <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 w-8 flex-shrink-0 leading-none pt-0.5 tabular-nums">
                  {index + 1}
                </span>

                <div className="flex-1 min-w-0">
                  {liga && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange">
                      {liga.name}
                    </span>
                  )}
                  <h3 className={`text-[15px] font-semibold leading-snug mt-0.5 transition-colors group-hover:text-forest-green dark:group-hover:text-green-400 ${
                    articleIsRead ? "text-gray-500 dark:text-gray-400" : "text-off-black dark:text-white"
                  }`}>
                    <span className="line-clamp-2">{article.titel}</span>
                    {articleIsRead && <ReadBadge className="w-4 h-4 inline-block ml-1 align-middle" />}
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
