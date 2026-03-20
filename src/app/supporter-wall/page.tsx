"use client";

import { useState, useEffect } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import Link from "next/link";
import { getSupporterWall, type CrowdfundingSupporter } from "@/lib/api/crowdfunding";

const TIER_LABELS: Record<string, string> = {
  kreisliga: "Kreisliga",
  bezirksliga: "Bezirksliga",
  "berlin-liga": "Berlin-Liga",
  oberliga: "Oberliga",
  regionalliga: "Regionalliga",
  bundesliga: "Bundesliga",
  ehrentribuene: "Ehrentribüne",
  gruendungself: "Gründungself",
  gruendungspartner: "Gründungspartner",
};

function SupporterBadge({ tier }: { tier: string }) {
  const isHighTier = ["gruendungself", "gruendungspartner", "ehrentribuene", "bundesliga"].includes(tier);
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${
        isHighTier
          ? "bg-electric-orange/10 text-electric-orange"
          : "bg-forest-green/10 text-forest-green dark:text-neon-green"
      }`}
    >
      {TIER_LABELS[tier] || tier}
    </span>
  );
}

export default function SupporterWallPage() {
  const [supporters, setSupporters] = useState<CrowdfundingSupporter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupporterWall()
      .then(setSupporters)
      .finally(() => setLoading(false));
  }, []);

  const hasSupporters = supporters.length > 0;

  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main>
        <section className="bg-off-black text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-electric-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Danke an alle
            </p>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight mb-4">
              Supporter-Wall
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              {hasSupporters
                ? `${supporters.length} Menschen und Vereine stehen hinter der FuWo.`
                : "Diese Wall wachst mit jeder Spende. Sei dabei."}
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse h-24" />
              ))}
            </div>
          ) : hasSupporters ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {supporters.map((s) => (
                <div
                  key={s.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center"
                >
                  <p className="font-semibold text-off-black dark:text-white text-sm mb-1">
                    {s.name}
                  </p>
                  <SupporterBadge tier={s.tier} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="font-headline text-xl text-off-black dark:text-white mb-2">
                Hier entsteht etwas Großes.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Sobald die Kampagne startet, erscheint hier jede:r Unterstützer:in.
                Werde eine:r der Ersten.
              </p>
              <Link
                href="/unterstuetzen"
                className="inline-block px-6 py-3 min-h-[44px] bg-forest-green text-white font-semibold rounded-lg hover:bg-forest-green/90 transition-colors"
              >
                Jetzt unterstützen
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
