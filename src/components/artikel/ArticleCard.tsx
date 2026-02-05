import { Artikel } from "@/lib/types";
import { formatDate } from "@/lib/data";
import LeagueBadge from "@/components/liga/LeagueBadge";

interface ArticleCardProps {
  article: Artikel;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
      {article.bild && (
        <img
          src={article.bild}
          alt={article.titel}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <LeagueBadge liga={article.liga} />
          <span className="text-off-black/50 text-xs">
            {formatDate(article.datum)}
          </span>
        </div>
        <h2 className="font-headline text-xl font-bold text-off-black mb-2 leading-tight">
          {article.titel}
        </h2>
        <p className="text-off-black/70 text-sm line-clamp-2 font-sans">
          {article.teaser}
        </p>
      </div>
    </article>
  );
}
