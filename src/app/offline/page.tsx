import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="font-headline text-3xl text-off-black dark:text-white mb-4">
          Keine Verbindung
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Es sieht so aus, als wärst du offline. Überprüfe deine Internetverbindung und versuche es erneut.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-forest-green text-white rounded-xl font-semibold hover:bg-forest-green/90 transition-colors"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="block w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-off-black dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>

        {/* Hint */}
        <p className="text-sm text-gray-400 mt-8">
          Tipp: Installiere DIAGO als App für bessere Offline-Unterstützung.
        </p>
      </div>
    </div>
  );
}
