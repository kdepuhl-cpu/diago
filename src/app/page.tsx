import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import HeroSection from "@/components/artikel/HeroSection";
import { artikel } from "@/lib/data";

export default function Home() {
  // Gruppiere Artikel nach Liga
  const bundesligaArtikel = artikel.filter((a) => a.ligaId === "bundesliga-1");
  const zweiteLigaArtikel = artikel.filter((a) => a.ligaId === "bundesliga-2");
  const dritteLigaArtikel = artikel.filter((a) => a.ligaId === "liga-3");
  const regionalArtikel = artikel.filter((a) => a.ligaId === "regionalliga-nordost");
  const oberligaArtikel = artikel.filter((a) => a.ligaId === "oberliga-nofv-nord");
  const berlinLigaArtikel = artikel.filter((a) => a.ligaId === "berlin-liga");

  return (
    <div className="min-h-screen bg-off-white">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-12">
        {/* Bundesliga Section */}
        {bundesligaArtikel.length > 0 && (
          <HeroSection
            sectionTitle="Bundesliga"
            hero={bundesligaArtikel[0]}
            sidebar={bundesligaArtikel.slice(1, 5)}
          />
        )}

        {/* 2. Liga Section */}
        {zweiteLigaArtikel.length > 0 && (
          <HeroSection
            sectionTitle="2. Bundesliga"
            hero={zweiteLigaArtikel[0]}
            sidebar={zweiteLigaArtikel.slice(1, 5)}
          />
        )}

        {/* 3. Liga Section */}
        {dritteLigaArtikel.length > 0 && (
          <HeroSection
            sectionTitle="3. Liga"
            hero={dritteLigaArtikel[0]}
            sidebar={dritteLigaArtikel.slice(1, 5)}
          />
        )}

        {/* Regionalliga Section */}
        {regionalArtikel.length > 0 && (
          <HeroSection
            sectionTitle="Regionalliga Nordost"
            hero={regionalArtikel[0]}
            sidebar={regionalArtikel.slice(1, 5)}
          />
        )}

        {/* Oberliga Section */}
        {oberligaArtikel.length > 0 && (
          <HeroSection
            sectionTitle="Oberliga NOFV Nord"
            hero={oberligaArtikel[0]}
            sidebar={oberligaArtikel.slice(1, 5)}
          />
        )}

        {/* Berlin-Liga Section */}
        {berlinLigaArtikel.length > 0 && (
          <HeroSection
            sectionTitle="Berlin-Liga"
            hero={berlinLigaArtikel[0]}
            sidebar={berlinLigaArtikel.slice(1, 5)}
            isLast={true}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
