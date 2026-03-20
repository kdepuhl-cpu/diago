import Image from "next/image";
import Link from "next/link";
import { VereinProfil, LIGEN } from "@/lib/types";

interface ClubCardProps {
  club: VereinProfil;
}

export default function ClubCard({ club }: ClubCardProps) {
  const liga = LIGEN.find((l) => l.id === club.ligaId);

  return (
    <Link
      href={`/verein/${club.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Color Band */}
      <div
        className="h-2"
        style={{ backgroundColor: club.farben?.primary || "#044110" }}
      />

      <div className="p-5">
        <div className="flex items-center gap-4">
          {club.wappen && (
            <Image
              src={club.wappen}
              alt={`${club.name} Wappen`}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-contain"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-headline text-lg text-off-black dark:text-white group-hover:text-forest-green dark:group-hover:text-green-400 transition-colors truncate">
              {club.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {club.bezirk}
              </span>
              {liga && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-forest-green/10 dark:bg-green-900/30 text-forest-green dark:text-neon-green">
                  {liga.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2">
          {club.beschreibung}
        </p>

        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">
          <span>Gegr. {club.gruendungsjahr}</span>
          {club.mitglieder && <span>{club.mitglieder} Mitglieder</span>}
          {club.mannschaften && <span>{club.mannschaften} Teams</span>}
        </div>
      </div>
    </Link>
  );
}
