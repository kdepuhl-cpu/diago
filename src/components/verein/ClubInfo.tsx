import { Sportstaette } from "@/lib/types";

interface ClubInfoProps {
  sportstaette: Sportstaette;
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 text-forest-green dark:text-neon-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function ClubInfo({ sportstaette }: ClubInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="font-headline text-xl text-off-black dark:text-white mb-4">
        Sportstätte
      </h2>

      <div className="flex items-start gap-3 mb-4">
        <MapPinIcon />
        <div>
          <p className="font-semibold text-off-black dark:text-white">
            {sportstaette.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {sportstaette.adresse}, {sportstaette.plz} Berlin
          </p>
          {sportstaette.mapsUrl && (
            <a
              href={sportstaette.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-forest-green dark:text-neon-green hover:underline mt-2"
            >
              Auf Google Maps anzeigen
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        {sportstaette.kapazitaet && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {sportstaette.kapazitaet.toLocaleString("de-DE")} Plätze
          </span>
        )}
        {sportstaette.kunstrasen !== undefined && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            {sportstaette.kunstrasen ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Kunstrasen
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-green-700" />
                Naturrasen
              </>
            )}
          </span>
        )}
        {sportstaette.flutlicht && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Flutlicht
          </span>
        )}
      </div>
    </div>
  );
}
