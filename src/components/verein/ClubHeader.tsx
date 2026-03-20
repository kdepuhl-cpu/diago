import Image from "next/image";
import { VereinProfil, LIGEN } from "@/lib/types";

interface ClubHeaderProps {
  club: VereinProfil;
}

export default function ClubHeader({ club }: ClubHeaderProps) {
  const liga = LIGEN.find((l) => l.id === club.ligaId);

  return (
    <div className="relative">
      {/* Color Band */}
      <div
        className="h-3 rounded-t-xl"
        style={{ backgroundColor: club.farben?.primary || "#044110" }}
      />

      <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-sm border border-gray-200 dark:border-gray-700 border-t-0 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {club.wappen && (
            <Image
              src={club.wappen}
              alt={`${club.name} Wappen`}
              width={100}
              height={100}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-contain bg-gray-50 dark:bg-gray-900 p-2"
            />
          )}

          <div className="flex-1">
            <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-off-black dark:text-white">
              {club.name}
            </h1>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {club.bezirk}
              </span>
              {liga && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-forest-green/10 dark:bg-green-900/30 text-forest-green dark:text-neon-green">
                  {liga.name}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                Gegr. {club.gruendungsjahr}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
              {club.beschreibung}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
