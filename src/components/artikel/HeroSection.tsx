import Link from "next/link";
import Image from "next/image";
import { Artikel } from "@/lib/types";

interface HeroSectionProps {
  hero: Artikel;
  sidebar: Artikel[];
  sectionTitle?: string;
  isLast?: boolean;
}

// Comment bubble icon
function CommentIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

export default function HeroSection({ hero, sidebar, sectionTitle, isLast = false }: HeroSectionProps) {
  return (
    <section className={`${!isLast ? "border-b border-gray-200 pb-8 mb-8" : "pb-8"}`}>
      {/* Section Title */}
      {sectionTitle && (
        <h2 className="font-headline text-2xl text-off-black mb-6">{sectionTitle}</h2>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Hero Article */}
        <article>
          <Link href={`/artikel/${hero.slug}`} className="group block">
            {/* Image - 16:9 aspect ratio */}
            <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-4 bg-gray-200">
              {hero.bild && (
                <Image
                  src={hero.bild.url}
                  alt={hero.bild.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            {/* Headline */}
            <h3 className="font-headline text-2xl lg:text-3xl text-off-black group-hover:text-forest-green transition-colors">
              {hero.titel}
            </h3>

            {/* Teaser */}
            <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
              {hero.teaser}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
              {hero.autor && <span>{hero.autor.name}</span>}
              <CommentIcon />
            </div>
          </Link>
        </article>

        {/* Sidebar Articles - With Thumbnails, equal height */}
        <div className="lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col justify-between h-full">
          {sidebar.map((artikel, index) => (
            <article
              key={artikel.slug}
              className={index !== sidebar.length - 1 ? "border-b border-gray-200 pb-4" : ""}
            >
              <Link href={`/artikel/${artikel.slug}`} className="group flex gap-4">
                {/* Thumbnail - 3:2 aspect ratio */}
                <div className="w-[150px] aspect-[3/2] relative flex-shrink-0 overflow-hidden rounded bg-gray-200">
                  {artikel.bild && (
                    <Image
                      src={artikel.bild.url}
                      alt={artikel.bild.alt}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Headline */}
                  <h4 className="text-base font-semibold text-off-black leading-snug line-clamp-3 group-hover:text-forest-green transition-colors">
                    {artikel.titel}
                  </h4>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    {artikel.autor && <span>{artikel.autor.name}</span>}
                    <CommentIcon />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
