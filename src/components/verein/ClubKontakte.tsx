import { Ansprechpartner } from "@/lib/types";

interface ClubKontakteProps {
  ansprechpartner: Ansprechpartner[];
}

export default function ClubKontakte({ ansprechpartner }: ClubKontakteProps) {
  if (ansprechpartner.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="font-headline text-xl text-off-black dark:text-white mb-4">
        Ansprechpartner
      </h2>

      <div className="space-y-4">
        {ansprechpartner.map((person, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-off-black dark:text-white text-sm">
                {person.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {person.rolle}
              </p>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="text-xs text-forest-green dark:text-green-400 hover:underline block mt-1"
                >
                  {person.email}
                </a>
              )}
              {person.telefon && (
                <a
                  href={`tel:${person.telefon.replace(/\s/g, "")}`}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-forest-green dark:hover:text-green-400 block mt-0.5"
                >
                  {person.telefon}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
