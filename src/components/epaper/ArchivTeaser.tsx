"use client";

import Image from "next/image";
import Link from "next/link";
import { archivIssues } from "@/lib/mock/epaper";

export default function ArchivTeaser() {
  const previewIssues = archivIssues.slice(0, 4);

  return (
    <section className="border-b border-gray-200 dark:border-gray-700 pb-10 mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-xl sm:text-2xl text-off-black dark:text-white">
          Aus dem Archiv
        </h2>
        <Link
          href="/archiv"
          className="text-sm font-semibold text-forest-green dark:text-neon-green hover:underline"
        >
          Zum Archiv →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-6 sm:overflow-visible">
        {previewIssues.map((issue) => (
          <Link
            key={issue.id}
            href={`/epaper/${issue.id}`}
            className="group flex-shrink-0 w-[160px] sm:w-auto"
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
  );
}
