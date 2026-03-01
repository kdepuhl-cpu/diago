import Image from "next/image";
import Link from "next/link";
import { Artikel } from "@/lib/types";
import { formatDate } from "@/lib/data";

interface ClubArticlesProps {
  articles: Artikel[];
  clubName: string;
}

export default function ClubArticles({ articles, clubName }: ClubArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="font-headline text-xl text-off-black dark:text-white mb-4">
        Artikel über {clubName}
      </h2>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/artikel/${article.slug}`}
            className="group flex gap-3"
          >
            {article.bild && (
              <div className="w-20 h-14 relative flex-shrink-0 rounded overflow-hidden bg-gray-200 dark:bg-gray-700">
                <Image
                  src={article.bild.url}
                  alt={article.bild.alt}
                  fill
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-off-black dark:text-white group-hover:text-forest-green dark:group-hover:text-green-400 transition-colors line-clamp-2 leading-snug">
                {article.titel}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(article.datum)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
