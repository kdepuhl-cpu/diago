"use client";

import Link from "next/link";

export default function CrowdfundingCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-forest-green text-white shadow-lg border-t border-forest-green">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <p className="text-sm font-medium hidden sm:block">
          Die FuWo kommt zurück. Sei dabei.
        </p>
        <p className="text-sm font-medium sm:hidden">
          Sei dabei.
        </p>
        <Link
          href="/unterstuetzen"
          className="shrink-0 px-4 py-1.5 min-h-[36px] bg-neon-green text-forest-green text-sm font-semibold rounded-lg hover:bg-neon-green/90 transition-colors flex items-center"
        >
          Unterstütze die FuWo
        </Link>
      </div>
    </div>
  );
}
