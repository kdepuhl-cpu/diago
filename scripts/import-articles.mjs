/**
 * Import Mock-Artikel aus data.ts nach Supabase
 * Run: node scripts/import-articles.mjs
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Liga-ID Mapping: data.ts → Supabase leagues
const LEAGUE_MAP = {
  "bundesliga-1": "bundesliga",
  "bundesliga-2": "2-bundesliga",
  "liga-3": "3-liga",
  "regionalliga-nordost": "regionalliga-nordost",
  "oberliga-nofv-nord": "oberliga-nofv-nord",
  "berlin-liga": "berlin-liga",
};

const IMAGES = {
  stadion: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600",
  action: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600",
  fans: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1600",
  rasen: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600",
  tor: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600",
  ball: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1600",
  flutlicht: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1600",
  derby: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1600",
  training: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1600",
};

const articles = [
  // === BUNDESLIGA (5) ===
  { title: "Stürmer-Spektakel aus dem Lehrbuch", slug: "stuermer-spektakel-union-frankfurt", excerpt: "Der Sieg des 1. FC Union in Frankfurt entspringt einer taktischen Meisterleistung. Ein Triumph in ungeahnter Dimension.", image_url: IMAGES.action, image_alt: "Union Berlin Spielszene", image_credit: "Foto: Koch", published_at: "2025-02-03T10:00:00Z", category: "spielbericht", league_id: "bundesliga", author_name: "Robert Klein", reading_time_minutes: 6, is_featured: true, tags: ["1. FC Union Berlin", "Eintracht Frankfurt", "Bundesliga"] },
  { title: "Aufstiegskampf spitzt sich zu", slug: "aufstiegskampf-bundesliga", excerpt: "Drei Punkte trennen die Top 5 der Tabelle. Der Saisonendspurt verspricht Spannung pur.", image_url: IMAGES.flutlicht, image_alt: "Bundesliga Flutlicht", image_credit: "Foto: Meyer", published_at: "2025-02-02T14:00:00Z", category: "analyse", league_id: "bundesliga", author_name: "Lisa Schmidt", reading_time_minutes: 4, tags: ["Bundesliga", "Tabelle", "Aufstiegskampf"] },
  { title: "Trainer nach Niederlage unter Druck", slug: "trainer-unter-druck-bundesliga", excerpt: "Nach der dritten Pleite in Folge wackelt der Stuhl des Übungsleiters.", image_url: IMAGES.rasen, image_alt: "Spielfeld", image_credit: "Foto: Weber", published_at: "2025-02-01T18:00:00Z", category: "news", league_id: "bundesliga", author_name: "Thomas Müller", reading_time_minutes: 3, tags: ["Bundesliga", "Trainer"] },
  { title: "Neuzugang überzeugt beim Debüt", slug: "neuzugang-debuet-bundesliga", excerpt: "Der Winter-Transfer zeigt sofort, warum der Verein tief in die Tasche gegriffen hat.", image_url: IMAGES.ball, image_alt: "Fußball", image_credit: "Foto: Schulz", published_at: "2025-01-31T12:00:00Z", category: "spielbericht", league_id: "bundesliga", author_name: "Anna Becker", reading_time_minutes: 5, tags: ["Bundesliga", "Transfer", "Neuzugang"] },
  { title: "Rekordtransfer vor dem Absprung", slug: "rekordtransfer-bundesliga", excerpt: "Gerüchte um einen Wechsel nach England verdichten sich. Ablöse könnte 50 Millionen übersteigen.", image_url: IMAGES.stadion, image_alt: "Stadion", image_credit: "Foto: Richter", published_at: "2025-01-30T09:00:00Z", category: "transfer", league_id: "bundesliga", author_name: "Max Hoffmann", reading_time_minutes: 4, tags: ["Bundesliga", "Transfer", "Premier League"] },

  // === 2. BUNDESLIGA (5) ===
  { title: "Der Abstiegszone gefährlich nah", slug: "hertha-abstiegszone-heimschwaeche", excerpt: "Ohne Überwindung der Heimschwäche wird Hertha BSC nicht oben mitspielen können.", image_url: IMAGES.stadion, image_alt: "Olympiastadion Berlin", image_credit: "Foto: Winter", published_at: "2025-02-02T14:00:00Z", category: "analyse", league_id: "2-bundesliga", author_name: "Karsten Doneck", reading_time_minutes: 5, tags: ["Hertha BSC", "2. Bundesliga", "Berlin", "Olympiastadion"] },
  { title: "Derbysieg befeuert Aufstiegshoffnung", slug: "derbysieg-zweite-liga", excerpt: "Mit dem prestigeträchtigen Erfolg klettert das Team auf Platz drei der Tabelle.", image_url: IMAGES.fans, image_alt: "Derbysieg Jubel", image_credit: "Foto: Koch", published_at: "2025-02-01T20:00:00Z", category: "spielbericht", league_id: "2-bundesliga", author_name: "Michael Braun", reading_time_minutes: 4, tags: ["2. Bundesliga", "Derby", "Aufstieg"] },
  { title: "Kapitän verlängert bis 2028", slug: "kapitaen-verlaengert-zweite-liga", excerpt: "Der Führungsspieler bekennt sich zum Verein und unterschreibt einen neuen Dreijahresvertrag.", image_url: IMAGES.action, image_alt: "Spielszene", image_credit: "Foto: Richter", published_at: "2025-01-30T10:00:00Z", category: "transfer", league_id: "2-bundesliga", author_name: "Sandra Klein", reading_time_minutes: 3, tags: ["2. Bundesliga", "Vertrag", "Kapitän"] },
  { title: "Torjäger meldet sich fit zurück", slug: "torjaeger-fit-zweite-liga", excerpt: "Nach wochenlanger Verletzungspause steht der Goalgetter vor dem Comeback.", image_url: IMAGES.tor, image_alt: "Tornetz", image_credit: "Foto: Berger", published_at: "2025-01-29T16:00:00Z", category: "news", league_id: "2-bundesliga", author_name: "Peter Hoffmann", reading_time_minutes: 2, tags: ["2. Bundesliga", "Comeback", "Verletzung"] },
  { title: "Stadion-Neubau endlich genehmigt", slug: "stadion-neubau-zweite-liga", excerpt: "Nach jahrelangem Ringen gibt die Stadt grünes Licht für die neue Arena.", image_url: IMAGES.flutlicht, image_alt: "Flutlicht", image_credit: "Foto: Lang", published_at: "2025-01-28T11:00:00Z", category: "news", league_id: "2-bundesliga", author_name: "Claudia Weber", reading_time_minutes: 4, tags: ["2. Bundesliga", "Stadion", "Neubau"] },

  // === 3. LIGA (5) ===
  { title: "Tabellenführer patzt überraschend", slug: "tabellenfuehrer-patzt-dritte-liga", excerpt: "Der Spitzenreiter verliert erstmals seit zehn Spielen und die Verfolger wittern ihre Chance.", image_url: IMAGES.action, image_alt: "3. Liga Action", image_credit: "Foto: Schmidt", published_at: "2025-02-03T15:00:00Z", category: "spielbericht", league_id: "3-liga", author_name: "Frank Weber", reading_time_minutes: 4, tags: ["3. Liga", "Tabellenführer", "Überraschung"] },
  { title: "Aufsteiger überrascht die Liga", slug: "aufsteiger-ueberrascht-dritte-liga", excerpt: "Der Neuling mischt die Konkurrenz auf und steht sensationell auf einem Aufstiegsplatz.", image_url: IMAGES.fans, image_alt: "Aufsteiger Fans", image_credit: "Foto: Lange", published_at: "2025-02-02T12:00:00Z", category: "analyse", league_id: "3-liga", author_name: "Julia Hartmann", reading_time_minutes: 5, tags: ["3. Liga", "Aufsteiger", "Aufstieg"] },
  { title: "Nachwuchstalent feiert Profidebüt", slug: "nachwuchstalent-dritte-liga", excerpt: "Mit 17 Jahren steht der Youngster erstmals in der Startelf und liefert sofort ab.", image_url: IMAGES.ball, image_alt: "Fußball Close-up", image_credit: "Foto: Krause", published_at: "2025-02-01T14:00:00Z", category: "news", league_id: "3-liga", author_name: "Markus Fischer", reading_time_minutes: 3, tags: ["3. Liga", "Nachwuchs", "Debüt"] },
  { title: "Stadionausbau wird konkreter", slug: "stadionausbau-dritte-liga", excerpt: "Die Pläne für die Erweiterung der Arena nehmen Form an. Baubeginn soll 2026 sein.", image_url: IMAGES.stadion, image_alt: "Stadion", image_credit: "Foto: Wolf", published_at: "2025-01-31T09:00:00Z", category: "news", league_id: "3-liga", author_name: "Claudia Neumann", reading_time_minutes: 4, tags: ["3. Liga", "Stadion", "Ausbau"] },
  { title: "Elfmeterkiller hält Sieg fest", slug: "elfmeterkiller-dritte-liga", excerpt: "Der Keeper pariert zwei Strafstöße und sichert seinem Team drei wichtige Punkte.", image_url: IMAGES.tor, image_alt: "Torwart", image_credit: "Foto: Engel", published_at: "2025-01-30T18:00:00Z", category: "spielbericht", league_id: "3-liga", author_name: "Stefan Roth", reading_time_minutes: 3, tags: ["3. Liga", "Torwart", "Elfmeter"] },

  // === REGIONALLIGA NORDOST (5) ===
  { title: "Altglienicke schiebt sich immer weiter vor", slug: "altglienicke-tabellenspitze-regionalliga", excerpt: "Heimlich, still und gar nicht leise pirscht sich die VSG an die Ligaspitze heran.", image_url: IMAGES.rasen, image_alt: "VSG Altglienicke", image_credit: "Foto: Kellner", published_at: "2025-02-01T16:00:00Z", category: "analyse", league_id: "regionalliga-nordost", author_name: "Harri Ramin", reading_time_minutes: 4, tags: ["VSG Altglienicke", "Regionalliga", "Berlin"] },
  { title: "BFC Preussen sorgt für Furore", slug: "bfc-preussen-regionalliga", excerpt: "Der Aufsteiger gewinnt das dritte Spiel in Folge und etabliert sich im oberen Tabellendrittel.", image_url: IMAGES.fans, image_alt: "BFC Preussen Fans", image_credit: "Foto: Schulze", published_at: "2025-01-31T18:00:00Z", category: "spielbericht", league_id: "regionalliga-nordost", author_name: "Dirk Baumann", reading_time_minutes: 3, tags: ["BFC Preussen", "Regionalliga", "Berlin"] },
  { title: "Lok Leipzig verteidigt Tabellenführung", slug: "lok-leipzig-regionalliga", excerpt: "Der Titelverteidiger lässt nichts anbrennen und baut den Vorsprung aus.", image_url: IMAGES.action, image_alt: "Lok Leipzig", image_credit: "Foto: Friedrich", published_at: "2025-01-30T20:00:00Z", category: "spielbericht", league_id: "regionalliga-nordost", author_name: "Steffen Krug", reading_time_minutes: 4, tags: ["1. FC Lok Leipzig", "Regionalliga", "Tabellenführer"] },
  { title: "Transfercoup für Berliner Verein", slug: "transfercoup-regionalliga", excerpt: "Ein ehemaliger Zweitligaspieler wechselt in die Regionalliga und sorgt für Aufsehen.", image_url: IMAGES.flutlicht, image_alt: "Flutlicht Abend", image_credit: "Foto: Engel", published_at: "2025-01-29T11:00:00Z", category: "transfer", league_id: "regionalliga-nordost", author_name: "Nina Vogel", reading_time_minutes: 3, tags: ["Regionalliga", "Transfer", "Berlin"] },
  { title: "Hallescher FC in der Krise", slug: "halle-krise-regionalliga", excerpt: "Nach drei Niederlagen in Serie gerät der Favorit ins Straucheln. Trainer zählt das Team an.", image_url: IMAGES.stadion, image_alt: "Halle Stadion", image_credit: "Foto: Meier", published_at: "2025-01-28T14:00:00Z", category: "analyse", league_id: "regionalliga-nordost", author_name: "Jens Lehmann", reading_time_minutes: 5, tags: ["Hallescher FC", "Regionalliga", "Krise"] },

  // === OBERLIGA NOFV NORD (5) ===
  { title: "Die Sache mit dem glücklichen Händchen", slug: "hertha-03-zwickau-oberliga", excerpt: "Der zur Pause eingewechselte von Baer benötigt nur vier Minuten für den Siegtreffer.", image_url: IMAGES.tor, image_alt: "Oberliga Spiel", image_credit: "Foto: Koch", published_at: "2025-01-31T18:00:00Z", category: "spielbericht", league_id: "oberliga-nofv-nord", author_name: "Matthias Schütt", reading_time_minutes: 3, tags: ["Hertha 03 Zehlendorf", "Oberliga", "Berlin"] },
  { title: "Abstiegskampf wird zur Nervenschlacht", slug: "abstiegskampf-oberliga", excerpt: "Im Tabellenkeller trennen nur vier Punkte sechs Mannschaften. Jedes Spiel zählt.", image_url: IMAGES.fans, image_alt: "Oberliga Fans", image_credit: "Foto: Hartwig", published_at: "2025-01-30T14:00:00Z", category: "analyse", league_id: "oberliga-nofv-nord", author_name: "Oliver Thiel", reading_time_minutes: 5, tags: ["Oberliga", "Abstiegskampf"] },
  { title: "Spielertrainer übernimmt Verantwortung", slug: "spielertrainer-oberliga", excerpt: "Nach der Trennung vom Coach springt ein Routinier als Interimslösung ein.", image_url: IMAGES.ball, image_alt: "Fußball", image_credit: "Foto: Berger", published_at: "2025-01-29T10:00:00Z", category: "news", league_id: "oberliga-nofv-nord", author_name: "Carsten Wolff", reading_time_minutes: 3, tags: ["Oberliga", "Trainer", "Spielertrainer"] },
  { title: "Pokalüberraschung bahnt sich an", slug: "pokalueberraschung-oberliga", excerpt: "Der Underdog steht überraschend im Halbfinale des Landespokals.", image_url: IMAGES.action, image_alt: "Pokaljubel", image_credit: "Foto: Seidel", published_at: "2025-01-28T17:00:00Z", category: "spielbericht", league_id: "oberliga-nofv-nord", author_name: "Ralf Köhler", reading_time_minutes: 4, tags: ["Oberliga", "Landespokal", "Pokal"] },
  { title: "Traditionsverein kämpft ums Überleben", slug: "traditionsverein-oberliga", excerpt: "Finanzielle Probleme zwingen den Klub zu drastischen Maßnahmen. Fans starten Spendenaktion.", image_url: IMAGES.flutlicht, image_alt: "Flutlicht Stadion", image_credit: "Foto: Lange", published_at: "2025-01-27T12:00:00Z", category: "news", league_id: "oberliga-nofv-nord", author_name: "Bernd Schneider", reading_time_minutes: 6, tags: ["Oberliga", "Finanzen", "Fans"] },

  // === BERLIN-LIGA (5) ===
  { title: "Stabile Defensive und ein Doppel-Härtel", slug: "makkabi-neustrelitz-berlin-liga", excerpt: "Neustrelitz bringt Makkabi eine Heimniederlage bei – eine Lehrstunde für den Gastgeber.", image_url: IMAGES.rasen, image_alt: "Berlin-Liga Spielfeld", image_credit: "Foto: dedepress", published_at: "2025-01-30T15:00:00Z", category: "spielbericht", league_id: "berlin-liga", author_name: "Matthias Schütt", reading_time_minutes: 3, tags: ["TuS Makkabi Berlin", "TSV 1860 Neustrelitz", "Berlin-Liga"] },
  { title: "Türkiyemspor zurück auf Kurs", slug: "tuerkiyemspor-berlin-liga", excerpt: "Nach schwachem Saisonstart findet der Traditionsverein zurück in die Spur.", image_url: IMAGES.action, image_alt: "Türkiyemspor", image_credit: "Foto: Yilmaz", published_at: "2025-01-29T19:00:00Z", category: "analyse", league_id: "berlin-liga", author_name: "Deniz Özkan", reading_time_minutes: 4, tags: ["Türkiyemspor Berlin", "Berlin-Liga", "Kreuzberg"] },
  { title: "Lokalrivalen liefern packendes Derby", slug: "derby-berlin-liga", excerpt: "Vor ausverkauftem Haus trennen sich die Nachbarn nach einem Spektakel unentschieden.", image_url: IMAGES.fans, image_alt: "Derby Berlin Fans", image_credit: "Foto: Schneider", published_at: "2025-01-28T14:00:00Z", category: "spielbericht", league_id: "berlin-liga", author_name: "Jan Westphal", reading_time_minutes: 5, tags: ["Berlin-Liga", "Derby", "Berlin"] },
  { title: "Jugendarbeit trägt Früchte", slug: "jugendarbeit-berlin-liga", excerpt: "Gleich drei Eigengewächse schaffen den Sprung in die erste Mannschaft.", image_url: IMAGES.ball, image_alt: "Fußball Nachwuchs", image_credit: "Foto: Krüger", published_at: "2025-01-27T11:00:00Z", category: "news", league_id: "berlin-liga", author_name: "Lena Hoffmann", reading_time_minutes: 3, tags: ["Berlin-Liga", "Nachwuchs", "Jugend"] },
  { title: "Spitzenreiter mit weißer Weste", slug: "spitzenreiter-berlin-liga", excerpt: "Zehn Siege in zehn Spielen: Der Tabellenführer scheint unaufhaltsam auf dem Weg zum Titel.", image_url: IMAGES.tor, image_alt: "Tornetz", image_credit: "Foto: Hartmann", published_at: "2025-01-26T16:00:00Z", category: "analyse", league_id: "berlin-liga", author_name: "Sven Müller", reading_time_minutes: 4, tags: ["Berlin-Liga", "Tabellenführer", "Meisterschaft"] },

  // === ARTIKEL MIT VOLLEM INHALT (31-36) ===
  {
    title: "BFC Dynamo feiert Derbysieg gegen den BAK",
    slug: "bfc-dynamo-derbysieg-bak",
    excerpt: "Vor über 2.000 Zuschauern im Sportforum setzt sich der BFC Dynamo mit 3:1 gegen den Berliner AK durch. Ein emotionales Derby, das erst in der zweiten Halbzeit entschieden wird.",
    content: `Das Sportforum in Hohenschönhausen bebte. Schon eine Stunde vor dem Anpfiff strömten die Fans durch die Tore, die Bratwurststände waren umlagert, und aus den Lautsprechern dröhnte der Vereinssong. Es war Derby-Tag — BFC Dynamo gegen den Berliner AK — und die Vorfreude war mit Händen zu greifen.

Die erste Halbzeit gehörte zunächst den Gästen. Der BAK spielte mutig nach vorne und belohnte sich in der 23. Minute: Nach einer Ecke von der rechten Seite stieg Innenverteidiger Krause am höchsten und köpfte zum 0:1 ein. Die BFC-Fans verstummten für einen Moment, doch die Mannschaft reagierte stark. Kurz vor der Pause erzielte Stürmer Weiß nach einem sehenswerten Doppelpass den verdienten Ausgleich.

In der Kabine schwor Trainer Voigt seine Mannschaft ein: „Wir spielen zu Hause, das hier ist unser Wohnzimmer. Zeigt das auf dem Platz!" Die Ansprache wirkte. Ab der 55. Minute dominierte der BFC das Geschehen. Das 2:1 fiel durch einen direkt verwandelten Freistoß von Kapitän Reinhardt — ein Kunstwerk aus 22 Metern in den linken Winkel. Der Torschrei hallte durch ganz Lichtenberg.

Als der eingewechselte Nachwuchsspieler Petrov in der 82. Minute das 3:1 erzielte, brachen alle Dämme. Der 18-Jährige rutschte auf Knien über den Rasen, seine Mitspieler warfen sich auf ihn. Es war sein erstes Tor für die erste Mannschaft und was für eines — ein Solo über 30 Meter, vorbei an zwei Gegenspielern, trocken ins kurze Eck.

„Das war Berlin-Liga pur", sagte BFC-Trainer Voigt sichtlich bewegt nach dem Spiel. „Die Atmosphäre, die Emotionen, der Kampfgeist — dafür lieben wir diesen Sport." Mit dem Dreier klettert der BFC auf Rang drei. Der BAK hingegen muss die vierte Niederlage in Folge verdauen und rutscht im Klassement weiter ab.`,
    image_url: IMAGES.derby, image_alt: "Derby im Sportforum", image_credit: "Foto: Langhammer",
    published_at: "2026-02-28T18:00:00Z", category: "spielbericht", league_id: "berlin-liga",
    author_name: "Matthias Schütt", author_image: "https://placehold.co/80x80/1F1F1F/white?text=MS",
    reading_time_minutes: 5, tags: ["BFC Dynamo", "Berliner AK", "Berlin-Liga", "Derby"], club_ids: ["bfc"],
  },
  {
    title: "Rückrunden-Analyse: Wer steigt in die Oberliga auf?",
    slug: "rueckrunden-analyse-berlin-liga-aufstieg",
    excerpt: "Die Berlin-Liga bietet in dieser Saison einen packenden Aufstiegskampf. Altglienicke, BFC Dynamo und Tennis Borussia liefern sich ein Kopf-an-Kopf-Rennen.",
    content: `Die Winterpause ist vorbei und die Berlin-Liga startet in eine entscheidende Rückrunde. Drei Teams haben sich an der Tabellenspitze abgesetzt und machen den Aufstieg in die Oberliga unter sich aus. Wir nehmen die Favoriten unter die Lupe.

VSG Altglienicke führt die Tabelle mit drei Punkten Vorsprung an. Der Trumpf der Mannschaft aus Treptow-Köpenick: die beste Defensive der Liga mit nur 14 Gegentoren. Trainer Claus Dieter Wollitz hat ein System installiert, das auf Stabilität und schnelles Umschalten setzt. Die Schwäche? Gegen tiefstehende Gegner fehlt oft die kreative Lösung im letzten Drittel.

Der BFC Dynamo hat in der Hinrunde die meisten Tore aller Teams erzielt — 48 Treffer in 17 Spielen sprechen eine deutliche Sprache. Angeführt von Torjäger Reinhardt, der bereits 16 Mal getroffen hat, ist die Offensive des BFC eine Wucht. Die Achillesferse bleibt die Auswärtsschwäche: Nur drei Siege in neun Partien auf fremdem Platz.

Tennis Borussia überrascht diese Saison auf ganzer Linie. Die Veilchen aus Charlottenburg haben die längste Serie der Liga — acht Spiele ungeschlagen. Coach Berkhan hat aus einer jungen Truppe ein eingespieltes Team geformt, das vor allem durch Leidenschaft besticht. Ob die schmale Kaderbreite bis zum Saisonende reicht, bleibt die große Frage.

Unsere Prognose: Altglienicke hat die besten Karten, doch der BFC könnte im direkten Duell am 15. März alles auf den Kopf stellen. TeBe bleibt der Joker, der für eine Überraschung gut ist. Eines ist sicher — diese Rückrunde wird nichts für schwache Nerven.`,
    image_url: IMAGES.rasen, image_alt: "Berlin-Liga Spielfeld", image_credit: "Foto: Kellner",
    published_at: "2026-02-25T10:00:00Z", category: "analyse", league_id: "berlin-liga",
    author_name: "Harri Ramin", author_image: "https://placehold.co/80x80/044110/white?text=HR",
    reading_time_minutes: 6, is_premium: true, tags: ["Berlin-Liga", "Aufstieg", "VSG Altglienicke", "BFC Dynamo", "Tennis Borussia"], club_ids: ["altglienicke", "bfc", "tebe"],
  },
  {
    title: "Türkiyemspor verpflichtet Ex-Herthaner Selke",
    slug: "tuerkiyemspor-transfer-selke",
    excerpt: "Transferhammer in der Berlin-Liga: Türkiyemspor Berlin gibt die Verpflichtung von Davit Selke bekannt. Der ehemalige Bundesligaspieler unterschreibt bis Saisonende in Kreuzberg.",
    content: `Es ist der Transfer-Knaller des Winters in der Berlin-Liga. Türkiyemspor Berlin hat die Verpflichtung von Davit Selke bekannt gegeben. Der 31-jährige Stürmer, der in der Bundesliga für Werder Bremen, Hertha BSC und den 1. FC Köln auflief, schließt sich dem Kreuzberger Traditionsverein bis zum Saisonende an.

„Davit kennt Berlin, er kennt den Berliner Fußball", sagte Türkiyemspor-Vorsitzender Erkan Yilmaz bei der Vorstellung im Katzbachstadion. „Er bringt nicht nur Qualität, sondern auch Erfahrung und Mentalität mit, die unserer jungen Mannschaft extrem helfen werden." Selke selbst zeigte sich emotional: „Ich habe die schönsten Jahre meiner Karriere in Berlin verbracht. Jetzt will ich etwas zurückgeben."

Der Angreifer, der insgesamt 164 Bundesligaspiele absolvierte und dabei 29 Tore erzielte, war zuletzt vereinslos. Nach seinem Abschied aus der 2. Bundesliga im Sommer hatte er sich fit gehalten und die Angebote geprüft. Dass es am Ende Türkiyemspor wurde, hat auch persönliche Gründe: „Ich wohne in Kreuzberg. Meine Kinder gehen hier zur Schule. Dieser Verein steht für etwas — für Zusammenhalt, für Integration, für den Kiez."

Für Türkiyemspor ist die Verpflichtung ein enormer Imagegewinn. Die Nachricht verbreitete sich wie ein Lauffeuer in den sozialen Medien, der Instagram-Post erreichte innerhalb von Stunden über 10.000 Likes. Sportlich soll Selke die Offensive beleben — mit nur 22 Toren in 17 Spielen hat Türkiyemspor Nachholbedarf. Der Debüt-Einsatz ist für kommendes Wochenende gegen Croatia Berlin geplant.`,
    image_url: IMAGES.training, image_alt: "Training bei Türkiyemspor", image_credit: "Foto: Yilmaz",
    published_at: "2026-02-22T14:00:00Z", category: "transfer", league_id: "berlin-liga",
    author_name: "Deniz Özkan", author_image: "https://placehold.co/80x80/E30A17/white?text=DÖ",
    reading_time_minutes: 5, tags: ["Türkiyemspor Berlin", "Transfer", "Berlin-Liga", "Kreuzberg"], club_ids: ["tuerkiyemspor"],
  },
  {
    title: "Wir wollen in die Regionalliga - Interview mit Trainer König",
    slug: "interview-trainer-koenig-zehlendorf",
    excerpt: "Hertha Zehlendorf dominiert die Oberliga NOFV Nord. Im exklusiven Interview spricht Cheftrainer Alexander König über seine Philosophie und die Aufstiegsambitionen.",
    content: `Hertha Zehlendorf steht an der Spitze der Oberliga NOFV Nord. Trainer Alexander König hat den Verein aus dem Berliner Südwesten innerhalb von zwei Jahren transformiert. Wir treffen ihn zum Gespräch im Vereinsheim am Dahlemer Weg.

Fußball-Woche: Herr König, Sie sind seit zwei Jahren Trainer bei Hertha Zehlendorf. Was hat sich seitdem verändert?

Alexander König: Als ich kam, war die Mannschaft im unteren Tabellendrittel. Wir haben zunächst an der Mentalität gearbeitet. Die Jungs mussten lernen, an sich zu glauben. Dazu kamen taktische Anpassungen — wir spielen jetzt ein aggressives Pressing, das viele Gegner überfordert.

FW: Wie definieren Sie Ihre Spielphilosophie?

König: Wir wollen den Ball haben und nach vorne spielen. Aber nicht blind, sondern mit Struktur. Jeder Spieler kennt seine Laufwege, seine Optionen. Wir trainieren Spielsituationen bis ins Detail. Und wenn wir den Ball verlieren, attackieren wir sofort — fünf Sekunden Gegenpressing ist bei uns Gesetz.

FW: Die Oberliga dominieren Sie souverän. Was ist das Ziel?

König: Wir wollen aufsteigen. Punkt. Die Regionalliga ist unser erklärtes Ziel. Aber wir wollen das nachhaltig tun. Wir haben in den Nachwuchs investiert, die Trainingsplätze verbessert. Der Aufstieg soll kein Strohfeuer sein.

FW: Was macht Hertha Zehlendorf als Verein besonders?

König: Die Gemeinschaft. Wir haben Fans, die bei jedem Auswärtsspiel dabei sind — ob in Rostock oder Erfurt. Dazu kommt eine Nachwuchsabteilung, die hervorragende Arbeit leistet. Drei Spieler aus unserer aktuellen Startelf sind Eigengewächse. Das macht mich besonders stolz.`,
    image_url: IMAGES.flutlicht, image_alt: "Hertha Zehlendorf Flutlichtspiel", image_credit: "Foto: Schütt",
    published_at: "2026-02-20T09:00:00Z", category: "interview", league_id: "oberliga-nofv-nord",
    author_name: "Robert Klein", author_image: "https://placehold.co/80x80/333333/white?text=RK",
    reading_time_minutes: 7, is_premium: true, tags: ["Hertha Zehlendorf", "Oberliga", "Interview", "Aufstieg"],
  },
  {
    title: "Wintereinbruch: Kompletter Spieltag in der Berlin-Liga abgesagt",
    slug: "wintereinbruch-spieltag-abgesagt",
    excerpt: "Der heftige Schneefall hat Berlin fest im Griff. Der BFV sagt sämtliche Spiele der Berlin-Liga am Wochenende ab.",
    content: `Berlin versinkt im Schnee — und mit der weißen Pracht ruht auch der Ball. Der Berliner Fußball-Verband (BFV) hat am Freitagmittag entschieden: Alle Pflichtspiele der Berlin-Liga, Oberliga sowie der Landes- und Bezirksligen am kommenden Wochenende fallen aus. Betroffen sind insgesamt 87 Partien.

„Die Sicherheit der Spieler und Zuschauer geht vor", erklärte BFV-Spielausschuss-Vorsitzender Wolfgang Riedel. „Die Platzverhältnisse lassen auf keiner Anlage in Berlin einen ordnungsgemäßen Spielbetrieb zu." Bis zu 25 Zentimeter Neuschnee wurden in der Nacht zu Freitag gemessen, dazu Temperaturen von minus acht Grad.

Für die Vereine bedeutet die Absage eine enorme logistische Herausforderung. Der ohnehin enge Terminkalender wird noch voller. „Wir müssen in den kommenden Wochen Englische Wochen einplanen", sagt BFC-Dynamo-Geschäftsführerin Katrin Lehmann. „Das ist für Amateurvereine, deren Spieler berufstätig sind, eine echte Belastung."

Besonders bitter trifft es den Tabellenführer VSG Altglienicke. „Wir hatten gerade einen Lauf", sagte Trainer Wollitz. „Natürlich ist es ärgerlich, aber die Gesundheit geht vor." Tennis Borussia hingegen kann die Pause nutzen: Zwei angeschlagene Leistungsträger könnten durch die zusätzliche Erholungszeit rechtzeitig fit werden.

Der BFV plant, die Nachholtermine bis Mitte nächster Woche zu kommunizieren.`,
    image_url: IMAGES.stadion, image_alt: "Verschneites Stadion", image_credit: "Foto: dpa",
    published_at: "2026-02-18T12:00:00Z", category: "news", league_id: "berlin-liga",
    author_name: "Jan Westphal", author_image: "https://placehold.co/80x80/4A90D9/white?text=JW",
    reading_time_minutes: 4, tags: ["Berlin-Liga", "Spielausfall", "Winter", "BFV"],
  },
  {
    title: "Viktoria schlägt Croatia im Topspiel der Berlin-Liga",
    slug: "viktoria-croatia-topspiel-berlin-liga",
    excerpt: "Ein packendes Topspiel endet 2:1 für den FC Viktoria Berlin. Vor stimmungsvoller Kulisse dreht Viktoria einen Rückstand.",
    content: `Was für ein Fußball-Abend in Britz! Vor 1.800 begeisterten Zuschauern — die beste Kulisse der laufenden Berlin-Liga-Saison — lieferten sich der FC Viktoria Berlin und SV Croatia Berlin ein Spiel, das den Amateurfußball in seiner schönsten Form zeigte.

Croatia begann furios. Nur acht Minuten waren gespielt, als Spielmacher Hrvoje Matic mit einem Traumtor die Gästeführung erzielte. Aus 25 Metern zirkelte er den Ball unhaltbar in den rechten Winkel. Das Friedrich-Ebert-Stadion verstummte kurz, doch die Viktoria-Fans peitschten ihr Team sofort wieder nach vorne.

In der 38. Minute erzielte Viktorias Mittelstürmer Kowalski den Ausgleich. Der Jubel war ohrenbetäubend. Die zweite Halbzeit war ein offener Schlagabtausch. In der 67. Minute köpfte der eingewechselte Bergmann zum 2:1 ein.

Croatia warf in der Schlussphase alles nach vorne — doch Viktoria überstand die Drangphase. „Das war Werbung für die Berlin-Liga", sagte Viktoria-Coach Brehme strahlend.`,
    image_url: IMAGES.fans, image_alt: "Fans im Friedrich-Ebert-Stadion", image_credit: "Foto: Schneider",
    published_at: "2026-02-15T20:00:00Z", category: "spielbericht", league_id: "berlin-liga",
    author_name: "Lena Hoffmann", author_image: "https://placehold.co/80x80/FC401D/white?text=LH",
    reading_time_minutes: 6, tags: ["FC Viktoria Berlin", "SV Croatia Berlin", "Berlin-Liga", "Topspiel"],
  },

  // === KULTUR (3) ===
  { title: "Trikot-Kultur: Warum Berliner Amateurvereine zu Streetwear-Ikonen werden", slug: "trikot-kultur-berliner-amateurvereine-streetwear", excerpt: "Von Türkiyemspor über TeBe bis zum BAK — Berliner Amateurtrikots sind längst mehr als Sportbekleidung.", image_url: IMAGES.fans, image_alt: "Berliner Fans im Trikot", image_credit: "Foto: Richter", published_at: "2026-03-01T10:00:00Z", category: "kultur", league_id: "berlin-liga", author_name: "Mia Richter", reading_time_minutes: 5, is_premium: true, tags: ["Kultur", "Fashion", "Streetwear", "Trikots", "Berlin"] },
  { title: "Playlist der Kabine: Was Berlins Kicker vor dem Anpfiff hören", slug: "playlist-kabine-berlin-fussball-musik", excerpt: "Deutschrap, Afrobeats oder doch Techno? Wir haben in die Kabinen der Berlin-Liga geschaut.", image_url: IMAGES.action, image_alt: "Spieler in der Kabine", image_credit: "Foto: Özkan", published_at: "2026-02-26T14:00:00Z", category: "kultur", league_id: "berlin-liga", author_name: "Deniz Özkan", reading_time_minutes: 4, tags: ["Kultur", "Musik", "Berlin-Liga", "Playlist", "Lifestyle"] },
  { title: "Gaming meets Grassroots: Wie EA FC die Berliner Kreisliga entdeckt", slug: "gaming-ea-fc-berliner-kreisliga", excerpt: "Electronic Arts hat erstmals Spieler aus der Berliner Kreisliga in EA FC aufgenommen.", image_url: IMAGES.ball, image_alt: "Fußball und Gaming", image_credit: "Foto: Westphal", published_at: "2026-02-20T09:00:00Z", category: "kultur", league_id: "berlin-liga", author_name: "Jan Westphal", reading_time_minutes: 6, tags: ["Kultur", "Gaming", "EA FC", "Kreisliga", "Berlin"] },
];

// Set defaults
for (const a of articles) {
  a.is_featured = a.is_featured ?? false;
  a.is_premium = a.is_premium ?? false;
  a.club_ids = a.club_ids ?? [];
  a.content = a.content ?? null;
  a.author_image = a.author_image ?? null;
  a.image_caption = a.image_caption ?? null;
}

async function importArticles() {
  console.log(`Importing ${articles.length} articles...\n`);

  let success = 0;
  let errors = 0;

  for (const article of articles) {
    const { data, error } = await supabase
      .from("articles")
      .upsert(article, { onConflict: "slug" })
      .select("slug, title")
      .single();

    if (error) {
      console.error(`  FAIL: ${article.slug} — ${error.message}`);
      errors++;
    } else {
      console.log(`  OK: ${data.title.substring(0, 50)}`);
      success++;
    }
  }

  console.log(`\nDone: ${success} OK, ${errors} errors`);
}

importArticles();
