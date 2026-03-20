"use client";

import { useState, useEffect } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import Link from "next/link";
import { getGruendungself, type CrowdfundingSupporter } from "@/lib/api/crowdfunding";

function MemberCard({ supporter }: { supporter: CrowdfundingSupporter }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
      {supporter.logo_url ? (
        <img
          src={supporter.logo_url}
          alt={supporter.name}
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-headline text-forest-green">
            {supporter.name.charAt(0)}
          </span>
        </div>
      )}
      <h3 className="font-headline text-lg text-off-black dark:text-white mb-1">
        {supporter.name}
      </h3>
      <p className="text-xs text-electric-orange font-semibold uppercase mb-2">
        {supporter.tier === "gruendungspartner" ? "Gründungspartner" : "Gründungself"}
      </p>
      {supporter.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {supporter.description}
        </p>
      )}
      {supporter.website && (
        <a
          href={supporter.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-forest-green dark:text-neon-green underline mt-2 inline-block"
        >
          Website
        </a>
      )}
    </div>
  );
}

export default function GruendungselfPage() {
  const [members, setMembers] = useState<CrowdfundingSupporter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGruendungself()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const hasMembers = members.length > 0;

  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main>
        <section className="bg-off-black text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-electric-orange font-semibold text-sm uppercase tracking-wider mb-3">
              Ab 1.000 Euro
            </p>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight mb-4">
              Die Gründungself
            </h1>
            <p className="text-gray-300 max-w-xl mx-auto">
              Die Gründungself sind die Menschen und Vereine, die den Neustart
              der Fußball-Woche ermöglichen. Jede:r bekommt eine eigene Seite —
              im Heft und auf der Website. Permanent.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="font-headline text-lg text-off-black dark:text-white mb-1">
                Eigene Seite im Heft
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dein Portrait — mit Foto, Geschichte und Logo. In der Erstausgabe und auf der Website.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <h3 className="font-headline text-lg text-off-black dark:text-white mb-1">
                Eintrag auf der Website
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanent sichtbar. Dein Name, dein Logo, deine Geschichte — für immer Teil der FuWo.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-headline text-lg text-off-black dark:text-white mb-1">
                Alle Rewards inklusive
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Print-Abo, Digital-Abo, Merch, Retro-Poster, Launch-Event — alles dabei.
              </p>
            </div>
          </div>

          {/* Mitglieder oder leerer State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : hasMembers ? (
            <>
              <h2 className="font-headline text-2xl text-off-black dark:text-white text-center mb-8">
                {members.length} {members.length === 1 ? "Mitglied" : "Mitglieder"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {members.map((m) => (
                  <MemberCard key={m.id} supporter={m} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center">
              <h2 className="font-headline text-xl text-off-black dark:text-white mb-2">
                Werde Teil der Gründungself.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                Hier erscheinen bald die Portraits aller Gründungself-Mitglieder.
                Die Plätze sind begrenzt — sei von Anfang an dabei.
              </p>
              <Link
                href="/unterstuetzen"
                className="inline-block px-6 py-3 min-h-[44px] bg-electric-orange text-white font-semibold rounded-lg hover:bg-electric-orange/90 transition-colors"
              >
                Gründungself werden — ab 1.000 Euro
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
