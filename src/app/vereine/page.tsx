import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ClubCard from "@/components/verein/ClubCard";
import { vereine } from "@/lib/mock/clubs";

export default function VereinePage() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-gray-900">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <h1 className="font-headline text-3xl sm:text-4xl text-off-black dark:text-white mb-2">
          Vereine
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-2xl">
          Die Vereinsprofile des Berliner Amateurfußballs — Kontakt, Trainingszeiten und Sportstätten auf einen Blick.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vereine.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
