"use client";

import Link from "next/link";

export default function CrowdfundingBanner() {
  return (
    <section className="bg-neon-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-headline text-xl md:text-2xl text-forest-green leading-tight mb-1">
            Jetzt die FuWo unterstützen.
          </h2>
          <p className="text-forest-green/70 text-sm">
            Werde ein Teil der FuWo-Familie und unterstütze uns über Start-Next.
          </p>
        </div>
        <Link
          href="/unterstuetzen"
          className="shrink-0 px-6 py-2.5 min-h-[44px] bg-forest-green text-white font-semibold rounded-lg hover:bg-forest-green/90 transition-colors text-sm flex items-center"
        >
          Jetzt unterstützen
        </Link>
      </div>
    </section>
  );
}
