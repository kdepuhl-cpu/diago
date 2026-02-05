import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import ReadingProgressBar from "@/components/artikel/ReadingProgressBar";
import MarkAsReadButton from "@/components/artikel/MarkAsReadButton";
import { artikel, getArtikelBySlug, formatDate, getLigaById } from "@/lib/data";
import { KATEGORIE_LABELS } from "@/lib/types";

// Icons
function ShareIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
}

// Calculate reading time based on text length (~1000 chars = 1 min)
function calculateReadingTime(text: string): number {
  const charCount = text.length;
  const minutes = Math.ceil(charCount / 1000);
  return Math.max(minutes, 1); // Minimum 1 minute
}

// Placeholder article text for reading time calculation
const ARTICLE_TEXT = `Der Sieg war mehr als verdient. Von Beginn an zeigte die Mannschaft, dass sie es ernst meinte mit dem Angriff auf die Tabellenspitze. Bereits in der fünften Minute setzte der Mittelfeldspieler das erste Ausrufezeichen, als sein Schuss nur knapp am Pfosten vorbeiging. Die Fans auf den Rängen spürten sofort: Heute würde etwas Besonderes passieren. Die Defensive stand sicher, das Mittelfeld kontrollierte das Spiel mit beeindruckender Souveränität. Wir haben genau das umgesetzt, was wir uns vorgenommen hatten, erklärte der Trainer nach dem Spiel. Die Jungs haben von der ersten bis zur letzten Minute gezeigt, dass sie bereit sind für die großen Aufgaben. Seine Worte hallten durch die Mixed Zone, während draußen die Fans noch immer feierten. Das 1:0 fiel dann in der 34. Minute – ein sehenswert herausgespielter Treffer über mehrere Stationen. Der Stürmer vollendete nach einer butterweichen Flanke von der rechten Seite per Kopf. Es war sein achter Saisontreffer und unterstrich einmal mehr seine Klasse. Die gegnerische Abwehr stand wie angewurzelt, konnte dem perfekt getimten Laufweg nichts entgegensetzen. Zur Halbzeit führte das Heimteam verdient. In der Kabine schwor der Kapitän seine Mitspieler ein: 45 Minuten noch, dann haben wir es geschafft. Die Ansprache zeigte Wirkung. Nach dem Seitenwechsel drückten die Gäste zwar auf den Ausgleich, doch die Abwehrreihe hielt stand. Jeder Zweikampf wurde angenommen, jeder Ball mit letztem Einsatz verteidigt. Die taktische Umstellung des Trainers erwies sich als Geniestreich. Mit einer Fünferkette und zwei schnellen Außenbahnspieler wurden die Räume eng gemacht. Der gegnerische Spielaufbau lief ins Leere, immer wieder prallten die Angriffe an der kompakten Formation ab. Wir haben heute gezeigt, dass wir auch defensiv auf höchstem Niveau agieren können, lobte der Co-Trainer später. In der 78. Minute dann die Entscheidung: Ein Konter wie aus dem Lehrbuch, abgeschlossen vom eingewechselten Youngster, der damit sein erstes Profitor erzielte. Die Fans feierten ihn frenetisch. Mit gerade einmal 18 Jahren steht er nun in den Geschichtsbüchern des Vereins. Das ist ein Traum, sagte er mit Tränen in den Augen nach dem Abpfiff. Die Schlussphase wurde dann noch einmal hitzig. Zwei Gelbe Karten auf jeder Seite zeugten von der Intensität dieser Partie. Doch das Heimteam ließ sich nicht aus der Ruhe bringen. Mit kluger Spielverzögerung und sicherem Passspiel wurde die Zeit heruntergewürfelt. Als der Schiedsrichter schließlich abpfiff, kannte der Jubel keine Grenzen. Mit diesem Sieg schiebt sich das Team auf Platz drei der Tabelle vor. Nur noch zwei Punkte trennen sie vom Tabellenführer. Wir schauen von Spiel zu Spiel, betont der Kapitän bescheiden, doch die Ambitionen sind unverkennbar. Die Mannschaft hat Blut geleckt und will jetzt den ganz großen Wurf. Am kommenden Samstag wartet bereits die nächste Bewährungsprobe. Im Auswärtsspiel beim direkten Konkurrenten wird sich zeigen, ob die Mannschaft auch auswärts so souverän auftreten kann. Die Fans jedenfalls sind optimistisch – der Gästeblock ist bereits ausverkauft. Über 2.000 Anhänger werden die Reise antreten und ihr Team lautstark unterstützen. Die Saison könnte noch sehr lang und sehr erfolgreich werden.`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtikelPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArtikelBySlug(slug);

  if (!article) {
    notFound();
  }

  const liga = getLigaById(article.ligaId);

  // Get related articles (same liga, excluding current)
  const relatedArticles = artikel
    .filter((a) => a.ligaId === article.ligaId && a.slug !== slug)
    .slice(0, 3);

  // Tags from article data + kategorie
  const tags = [
    ...(article.tags || []),
    KATEGORIE_LABELS[article.kategorie],
  ];

  return (
    <div className="min-h-screen bg-off-white">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Hero Image - Fullwidth */}
      {article.bild && (
        <div className="w-full h-[70vh] relative bg-gray-200">
          <Image
            src={article.bild.url}
            alt={article.bild.alt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Image Caption */}
      {article.bild && (
        <div className="text-center py-4 px-4">
          <p className="text-sm text-gray-500">
            {article.bild.alt}
            {article.bild.credit && (
              <span className="italic text-gray-400"> — {article.bild.credit}</span>
            )}
          </p>
        </div>
      )}

      {/* Content Container */}
      <main className="max-w-2xl mx-auto px-4">
        {/* Dachzeile / Category */}
        <p className="uppercase text-sm tracking-wide text-center mt-8 text-forest-green font-medium">
          {KATEGORIE_LABELS[article.kategorie]}
        </p>

        {/* Headline */}
        <h1 className="font-headline text-4xl lg:text-5xl text-center mt-4 leading-tight text-off-black">
          {article.titel}
        </h1>

        {/* Teaser */}
        <p className="text-xl text-gray-600 text-center mt-4 leading-relaxed">
          {article.teaser}
        </p>

        {/* Author Area */}
        <div className="flex flex-col items-center mt-8">
          {/* Profile Image Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gray-300 mb-3" />

          <div className="text-center">
            <p className="text-sm">
              <span className="text-gray-500">Von </span>
              <span className="font-semibold text-off-black">
                {article.autor?.name || "Redaktion"}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(article.datum)}
              <span> · {calculateReadingTime(ARTICLE_TEXT)} Min. Lesezeit</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6 pb-8 border-b border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
            <ShareIcon />
            <span>Artikel teilen</span>
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <CommentIcon />
          </button>
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <SaveIcon />
          </button>
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none mt-8 space-y-6">
          <p>
            Der Sieg war mehr als verdient. Von Beginn an zeigte die Mannschaft, dass sie
            es ernst meinte mit dem Angriff auf die Tabellenspitze. Bereits in der fünften
            Minute setzte der Mittelfeldspieler das erste Ausrufezeichen, als sein Schuss
            nur knapp am Pfosten vorbeiging. Die Fans auf den Rängen spürten sofort: Heute
            würde etwas Besonderes passieren.
          </p>

          <p>
            Die Defensive stand sicher, das Mittelfeld kontrollierte das Spiel mit
            beeindruckender Souveränität. „Wir haben genau das umgesetzt, was wir uns
            vorgenommen hatten", erklärte der Trainer nach dem Spiel. „Die Jungs haben
            von der ersten bis zur letzten Minute gezeigt, dass sie bereit sind für die
            großen Aufgaben." Seine Worte hallten durch die Mixed Zone, während draußen
            die Fans noch immer feierten.
          </p>

          <p>
            Das 1:0 fiel dann in der 34. Minute – ein sehenswert herausgespielter Treffer
            über mehrere Stationen. Der Stürmer vollendete nach einer butterweichen Flanke
            von der rechten Seite per Kopf. Es war sein achter Saisontreffer und unterstrich
            einmal mehr seine Klasse. Die gegnerische Abwehr stand wie angewurzelt, konnte
            dem perfekt getimten Laufweg nichts entgegensetzen.
          </p>

          <p>
            Zur Halbzeit führte das Heimteam verdient. In der Kabine schwor der Kapitän
            seine Mitspieler ein: „45 Minuten noch, dann haben wir es geschafft." Die
            Ansprache zeigte Wirkung. Nach dem Seitenwechsel drückten die Gäste zwar auf
            den Ausgleich, doch die Abwehrreihe hielt stand. Jeder Zweikampf wurde
            angenommen, jeder Ball mit letztem Einsatz verteidigt.
          </p>

          <p>
            Die taktische Umstellung des Trainers erwies sich als Geniestreich. Mit einer
            Fünferkette und zwei schnellen Außenbahnspieler wurden die Räume eng gemacht.
            Der gegnerische Spielaufbau lief ins Leere, immer wieder prallten die Angriffe
            an der kompakten Formation ab. „Wir haben heute gezeigt, dass wir auch defensiv
            auf höchstem Niveau agieren können", lobte der Co-Trainer später.
          </p>
        </article>

        {/* Inline Image - Breaking out of container */}
        <div className="-mx-4 md:-mx-16 lg:-mx-32 my-10">
          {article.bild && (
            <div className="relative aspect-[21/9] bg-gray-200">
              <Image
                src={article.bild.url}
                alt="Spielszene"
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="text-center text-sm text-gray-500 mt-3 px-4">
            Spielszene aus der zweiten Halbzeit
            <span className="italic text-gray-400"> — Foto: Redaktion</span>
          </p>
        </div>

        {/* More Content */}
        <article className="prose prose-lg max-w-none space-y-6">
          <p>
            In der 78. Minute dann die Entscheidung: Ein Konter wie aus dem Lehrbuch,
            abgeschlossen vom eingewechselten Youngster, der damit sein erstes Profitor
            erzielte. Die Fans feierten ihn frenetisch. Mit gerade einmal 18 Jahren steht
            er nun in den Geschichtsbüchern des Vereins. „Das ist ein Traum", sagte er
            mit Tränen in den Augen nach dem Abpfiff.
          </p>

          <p>
            Die Schlussphase wurde dann noch einmal hitzig. Zwei Gelbe Karten auf jeder
            Seite zeugten von der Intensität dieser Partie. Doch das Heimteam ließ sich
            nicht aus der Ruhe bringen. Mit kluger Spielverzögerung und sicherem Passspiel
            wurde die Zeit heruntergewürfelt. Als der Schiedsrichter schließlich abpfiff,
            kannte der Jubel keine Grenzen.
          </p>

          <p>
            Mit diesem Sieg schiebt sich das Team auf Platz drei der Tabelle vor. Nur noch
            zwei Punkte trennen sie vom Tabellenführer. „Wir schauen von Spiel zu Spiel",
            betont der Kapitän bescheiden, doch die Ambitionen sind unverkennbar. Die
            Mannschaft hat Blut geleckt und will jetzt den ganz großen Wurf.
          </p>

          <p>
            Am kommenden Samstag wartet bereits die nächste Bewährungsprobe. Im Auswärtsspiel
            beim direkten Konkurrenten wird sich zeigen, ob die Mannschaft auch auswärts so
            souverän auftreten kann. Die Fans jedenfalls sind optimistisch – der Gästeblock
            ist bereits ausverkauft. Über 2.000 Anhänger werden die Reise antreten und ihr
            Team lautstark unterstützen. Die Saison könnte noch sehr lang und sehr erfolgreich
            werden.
          </p>
        </article>

        {/* Author Box End */}
        <div className="border-t border-gray-200 pt-6 mt-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
            <div>
              <p className="font-semibold text-off-black">
                {article.autor?.name || "Redaktion"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                DIAGO Reporter
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-gray-200 pt-4 mt-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href="#"
                  className="px-3 py-1.5 bg-gray-100 hover:bg-mint text-sm font-medium text-off-black rounded-full border border-gray-200 hover:border-forest-green transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mark as Read Button */}
        <div className="mt-8">
          <MarkAsReadButton articleId={article.id} />
        </div>

        {/* Your Next Read */}
        {relatedArticles.length > 0 && (
          <section className="border-t-4 border-gray-900 pt-6 mt-8 pb-12">
            <h2 className="font-headline text-2xl text-off-black mb-6">Lies auch</h2>

            <div className="space-y-6">
              {relatedArticles.map((related) => (
                <article key={related.slug} className="py-5 border-b border-gray-200 last:border-b-0">
                  <Link href={`/artikel/${related.slug}`} className="group flex gap-4">
                    {/* Thumbnail - 200x130 */}
                    <div className="w-[200px] h-[130px] relative flex-shrink-0 overflow-hidden rounded-sm bg-gray-200">
                      {related.bild && (
                        <Image
                          src={related.bild.url}
                          alt={related.bild.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      {/* Headline */}
                      <h3 className="text-lg font-semibold text-off-black leading-snug line-clamp-2 group-hover:text-forest-green transition-colors">
                        {related.titel}
                      </h3>

                      {/* Teaser */}
                      <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
                        {related.teaser}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                        {related.autor && <span>{related.autor.name}</span>}
                        <CommentIcon />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

// Generate static paths for all articles
export async function generateStaticParams() {
  return artikel.map((article) => ({
    slug: article.slug,
  }));
}
