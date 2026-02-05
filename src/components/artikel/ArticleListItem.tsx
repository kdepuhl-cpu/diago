import { Artikel, KATEGORIE_LABELS } from "@/lib/types";
import { formatDate, getLigaById } from "@/lib/data";

interface ArticleListItemProps {
  article: Artikel;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const liga = getLigaById(article.ligaId);

  return (
    <article className="flex gap-4 cursor-pointer group py-4 border-b border-gray-100 last:border-b-0">
      {/* Thumbnail (square) */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 overflow-hidden rounded-lg">
        {article.bild && (
          <img
            src={article.bild.url}
            alt={article.bild.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Dachzeile (Kategorie) */}
        <span className="text-orange text-[10px] font-bold uppercase tracking-wider">
          {KATEGORIE_LABELS[article.kategorie]}
        </span>

        {/* Headline */}
        <h3 className="font-headline text-base text-off-black mt-1 leading-tight line-clamp-2">
          {article.titel}
        </h3>

        {/* Meta: Liga Badge + Datum */}
        <div className="flex items-center gap-2 mt-2">
          {liga && (
            <span className="text-[10px] font-semibold text-forest-green bg-mint/30 px-1.5 py-0.5 rounded">
              {liga.name}
            </span>
          )}
          <span className="text-off-black/40 text-[10px]">
            {formatDate(article.datum)}
          </span>
        </div>
      </div>
    </article>
  );
}
