/**
 * Import echte Berliner Vereinsdaten in Supabase
 * Run: node scripts/import-clubs.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const clubs = [
  // =============================================
  // REGIONALLIGA NORDOST – Berliner Vereine
  // =============================================
  {
    id: "bfc",
    name: "BFC Dynamo",
    short_name: "BFC",
    slug: "bfc-dynamo",
    league_id: "regionalliga-nordost",
    bezirk: "Lichtenberg",
    founded_year: 1966,
    primary_color: "#8B0000",
    secondary_color: "#FFFFFF",
    description: "Der BFC Dynamo, 1966 gegründet, ist der Rekordmeister der DDR-Oberliga mit zehn Titeln in Folge (1979–1988). Nach der Wende durchlief der Verein einen langen Weg durch die unteren Ligen. Heute spielt der BFC in der Regionalliga Nordost und hat eine der aktivsten und leidenschaftlichsten Fanszenen im Berliner Amateurfußball.",
    members: 2148,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportforum Berlin", adresse: "Weißenseer Weg 51-55", plz: "13053", bezirk: "Lichtenberg", mapsUrl: "https://maps.google.com/?q=Sportforum+Berlin+Hohenschönhausen", kapazitaet: 12400, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 9860869-0", email: "info@bfc.com", website: "https://bfc.com" },
      socialMedia: { instagram: "https://instagram.com/bfcdynamo_official", facebook: "https://facebook.com/berlinerfcdynamo" },
    },
  },
  {
    id: "altglienicke",
    name: "VSG Altglienicke",
    short_name: "VSG",
    slug: "vsg-altglienicke",
    league_id: "regionalliga-nordost",
    bezirk: "Treptow-Köpenick",
    founded_year: 1948,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Die VSG Altglienicke, 1948 gegründet mit sportlichen Wurzeln bis 1883, hat sich zu einer der Erfolgsgeschichten des Berliner Fußballs entwickelt. Von den unteren Ligen bis in die Regionalliga Nordost – der Verein aus Treptow-Köpenick steht für konsequente Arbeit, solide Nachwuchsförderung und familiäre Vereinskultur.",
    members: 1100,
    teams_count: null,
    profile: {
      sportstaette: { name: "Stadion Altglienicke", adresse: "Alter Schönefelder Weg 20", plz: "12524", bezirk: "Treptow-Köpenick", mapsUrl: "https://maps.google.com/?q=Stadion+Altglienicke+Berlin", kapazitaet: 2500, kunstrasen: true, flutlicht: true },
      kontakt: { telefon: "+49 30 6731026", email: "info@fussball.vsg-altglienicke.de", website: "https://www.vsg-altglienicke.de" },
      socialMedia: { instagram: "https://instagram.com/vsgaltglienicke_official", facebook: "https://facebook.com/VSGAltglienicke" },
    },
  },
  {
    id: "zehlendorf",
    name: "Hertha 03 Zehlendorf",
    short_name: "H03",
    slug: "hertha-03-zehlendorf",
    league_id: "regionalliga-nordost",
    bezirk: "Steglitz-Zehlendorf",
    founded_year: 1903,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der FC Hertha 03 Zehlendorf, 1903 gegründet, ist ein traditionsreicher Berliner Fußballverein mit starker Jugendarbeit und über 50 Mannschaften. Nach dem Aufstieg in die Regionalliga Nordost hat der Verein aus Zehlendorf bewiesen, dass er auch auf überregionaler Ebene mithalten kann.",
    members: null,
    teams_count: 51,
    profile: {
      sportstaette: { name: "Ernst-Reuter-Sportfeld", adresse: "Onkel-Tom-Straße 40", plz: "14169", bezirk: "Steglitz-Zehlendorf", mapsUrl: "https://maps.google.com/?q=Ernst-Reuter-Sportfeld+Berlin", kapazitaet: 5000, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 3198144-0", email: "service@h03.de", website: "https://www.h03.de" },
      socialMedia: { instagram: "https://instagram.com/h03zehlendorf", facebook: "https://facebook.com/h03.de" },
    },
  },
  {
    id: "hertha2",
    name: "Hertha BSC II",
    short_name: "Hertha II",
    slug: "hertha-bsc-ii",
    league_id: "regionalliga-nordost",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1892,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Die zweite Mannschaft von Hertha BSC spielt in der Regionalliga Nordost und dient als Bindeglied zwischen der exzellenten Jugendakademie und dem Profikader. Im Stadion auf dem Wurfplatz im Olympiapark bieten die jungen Herthaner attraktiven Fußball.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Stadion auf dem Wurfplatz", adresse: "Hanns-Braun-Straße 2", plz: "14053", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Stadion+auf+dem+Wurfplatz+Berlin", kapazitaet: 5400, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.herthabsc.com" },
      socialMedia: { instagram: "https://instagram.com/herthabsc", facebook: "https://facebook.com/herthabsc" },
    },
  },
  {
    id: "preussen",
    name: "BFC Preussen",
    short_name: "Preussen",
    slug: "bfc-preussen",
    league_id: "regionalliga-nordost",
    bezirk: "Steglitz-Zehlendorf",
    founded_year: 1894,
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    description: "Der Berliner Fußballclub Preussen 1894 ist einer der ältesten Fußballvereine Deutschlands. Aus Lankwitz stammend, blickt der Verein auf über 130 Jahre Fußballgeschichte zurück. In der Regionalliga Nordost beweist der BFC, dass Tradition und sportlicher Ehrgeiz zusammengehören.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Preussenstadion", adresse: "Malteserstraße 24-36", plz: "12249", bezirk: "Steglitz-Zehlendorf", mapsUrl: "https://maps.google.com/?q=Preussenstadion+Berlin+Lankwitz", kapazitaet: 7000, kunstrasen: false, flutlicht: false },
      kontakt: { telefon: "+49 30 40741303", email: "info@bfc-preussen.de", website: "https://bfc-preussen.de" },
      socialMedia: { instagram: "https://instagram.com/bfc_preussen_official", facebook: "https://facebook.com/bfcpreussen.fussball" },
    },
  },

  // =============================================
  // OBERLIGA NOFV NORD – Berliner Vereine
  // =============================================
  {
    id: "bak",
    name: "Berliner AK 07",
    short_name: "BAK",
    slug: "berliner-ak-07",
    league_id: "oberliga-nofv-nord",
    bezirk: "Mitte",
    founded_year: 1907,
    primary_color: "#D50000",
    secondary_color: "#FFFFFF",
    description: "Der Berliner Athletik Klub 07, kurz BAK, wurde 1907 in Moabit gegründet und ist im historischen Poststadion beheimatet. Der Verein gehört zu den traditionsreichsten Berliner Klubs und kämpft in der Oberliga NOFV Nord um den Wiederaufstieg in die Regionalliga.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Poststadion", adresse: "Lehrter Straße 59", plz: "10557", bezirk: "Mitte", mapsUrl: "https://maps.google.com/?q=Poststadion+Berlin", kapazitaet: 10000, kunstrasen: false, flutlicht: true },
      kontakt: { email: "info@bak07.de", website: "https://www.bak07.de" },
      socialMedia: { instagram: "https://instagram.com/berlinerak1907", facebook: "https://facebook.com/berlinerathletikklub07" },
    },
  },
  {
    id: "tebe",
    name: "Tennis Borussia Berlin",
    short_name: "TeBe",
    slug: "tennis-borussia",
    league_id: "oberliga-nofv-nord",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1902,
    primary_color: "#7B2D8E",
    secondary_color: "#FFFFFF",
    description: "Tennis Borussia Berlin, liebevoll TeBe genannt, ist einer der traditionsreichsten Vereine der Hauptstadt. 1902 gegründet, spielte der Klub in den 1970ern in der Bundesliga. Im legendären Mommsenstadion in Westend steht TeBe für leidenschaftlichen Fußball mit einer der treuesten Fanszenen Berlins.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Mommsenstadion", adresse: "Waldschulallee 34", plz: "14055", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Mommsenstadion+Berlin", kapazitaet: 14700, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 30102166", email: "info@tebe.de", website: "https://www.tebe.de" },
      socialMedia: { instagram: "https://instagram.com/TennisBorussia", facebook: "https://facebook.com/TennisBorussiaBerlin" },
    },
  },
  {
    id: "eintracht-mahlsdorf",
    name: "Eintracht Mahlsdorf",
    short_name: "Mahlsdorf",
    slug: "eintracht-mahlsdorf",
    league_id: "oberliga-nofv-nord",
    bezirk: "Marzahn-Hellersdorf",
    founded_year: 1896,
    primary_color: "#9370DB",
    secondary_color: "#FFFFFF",
    description: "Der BSV Eintracht Mahlsdorf, gegründet 1896, ist der Verein von Tino Loest, dem neuen Eigentümer der Fußball-Woche. Aus Mahlsdorf in Marzahn-Hellersdorf stammend, hat sich Eintracht in der Oberliga NOFV Nord etabliert und steht für bodenständigen Berliner Amateurfußball.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Am Rosenhag", adresse: "Melanchthonstraße 52D", plz: "12623", bezirk: "Marzahn-Hellersdorf", mapsUrl: "https://maps.google.com/?q=Sportplatz+Am+Rosenhag+Berlin+Mahlsdorf", kapazitaet: 2500, kunstrasen: false, flutlicht: false },
      kontakt: { telefon: "+49 30 5646162", email: "vorstand@bsv-eintracht-mahlsdorf.de", website: "https://www.bsv-eintracht-mahlsdorf.de" },
      socialMedia: { instagram: "https://instagram.com/eintracht_mahlsdorf_official", facebook: "https://facebook.com/EintrachtMahlsdorf" },
    },
  },
  {
    id: "viktoria",
    name: "FC Viktoria 1889 Berlin",
    short_name: "Viktoria",
    slug: "fc-viktoria-berlin",
    league_id: "oberliga-nofv-nord",
    bezirk: "Steglitz-Zehlendorf",
    founded_year: 1889,
    primary_color: "#FFFFFF",
    secondary_color: "#000000",
    description: "Der FC Viktoria 1889 Berlin, einer der ältesten Fußballvereine Deutschlands, entstand 2013 aus der Fusion von BFC Viktoria 1889 und dem Lichterfelder FC. Im Stadion Lichterfelde bietet der Verein mit über 65 Mannschaften ein breites sportliches Angebot und spielte 2022 sogar im DFB-Pokal.",
    members: 1600,
    teams_count: 65,
    profile: {
      sportstaette: { name: "Stadion Lichterfelde", adresse: "Ostpreußendamm / Krahmerstraße 15", plz: "12207", bezirk: "Steglitz-Zehlendorf", mapsUrl: "https://maps.google.com/?q=Stadion+Lichterfelde+Berlin", kapazitaet: 4300, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 75444898-00", email: "info@viktoria.berlin", website: "https://viktoria.berlin" },
      socialMedia: { instagram: "https://instagram.com/viktoriaberlin", facebook: "https://facebook.com/FCViktoria1889Berlin" },
    },
  },
  {
    id: "croatia",
    name: "SD Croatia Berlin",
    short_name: "Croatia",
    slug: "sd-croatia-berlin",
    league_id: "oberliga-nofv-nord",
    bezirk: "Tempelhof-Schöneberg",
    founded_year: 1972,
    primary_color: "#D50000",
    secondary_color: "#FFFFFF",
    description: "Der Sportsko Društvo Croatia Berlin wurde 1972 von kroatischen Einwanderern in Tempelhof gegründet. Mit rund 23 Mannschaften ist Croatia Berlin ein wichtiger Bestandteil des Berliner Amateurfußballs und steht für Integration durch Sport.",
    members: null,
    teams_count: 23,
    profile: {
      sportstaette: { name: "Friedrich-Ebert-Stadion", adresse: "Bosestraße 21", plz: "12103", bezirk: "Tempelhof-Schöneberg", mapsUrl: "https://maps.google.com/?q=Friedrich-Ebert-Stadion+Berlin+Tempelhof", kapazitaet: 5000, kunstrasen: false, flutlicht: false },
      kontakt: { telefon: "+49 30 6949940", email: "info@sdcroatia.de", website: "https://sdcroatia.de" },
      socialMedia: { instagram: "https://instagram.com/sdcroatiaberlin", facebook: "https://facebook.com/sdcroatiaberlinev" },
    },
  },
  {
    id: "lichtenberg",
    name: "SV Lichtenberg 47",
    short_name: "L47",
    slug: "sv-lichtenberg-47",
    league_id: "oberliga-nofv-nord",
    bezirk: "Lichtenberg",
    founded_year: 1947,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der SV Lichtenberg 47 wurde 1947 gegründet und ist im legendären Hans-Zoschke-Stadion (heute HOWOGE-Arena) beheimatet. Mit fast 10.000 Plätzen hat der Verein eines der atmosphärischsten Stadien im Berliner Amateurfußball. Über 900 Mitglieder tragen die blau-weißen Farben.",
    members: 900,
    teams_count: null,
    profile: {
      sportstaette: { name: "HOWOGE-Arena «Hans Zoschke»", adresse: "Normannenstraße 26-28", plz: "10367", bezirk: "Lichtenberg", mapsUrl: "https://maps.google.com/?q=Hans-Zoschke-Stadion+Berlin", kapazitaet: 9900, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 5589151", email: "praesidium@lichtenberg47.de", website: "https://www.lichtenberg47.de" },
      socialMedia: { instagram: "https://instagram.com/sv_lichtenberg_47", facebook: "https://facebook.com/Lichtenberg47" },
    },
  },
  {
    id: "tasmania",
    name: "Tasmania Berlin",
    short_name: "Tasmania",
    slug: "tasmania-berlin",
    league_id: "oberliga-nofv-nord",
    bezirk: "Neukölln",
    founded_year: 1973,
    primary_color: "#003DA5",
    secondary_color: "#D50000",
    description: "Der SV Tasmania Berlin, 1973 gegründet als Nachfolger des legendären SC Tasmania 1900, ist im Werner-Seelenbinder-Sportpark in Neukölln beheimatet. Tasmania ist berühmt-berüchtigt für die Bundesliga-Saison 1965/66 mit nur 10 Punkten – ein Rekord, der nie gebrochen wurde.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Werner-Seelenbinder-Sportpark", adresse: "Oderstraße 182", plz: "12051", bezirk: "Neukölln", mapsUrl: "https://maps.google.com/?q=Werner-Seelenbinder-Sportpark+Berlin", kapazitaet: 6000, kunstrasen: false, flutlicht: true },
      kontakt: { telefon: "+49 30 6268193", email: "geschaeftsstelle@sv-tasmania-berlin.de", website: "https://www.sv-tasmania-berlin.de" },
      socialMedia: { instagram: "https://instagram.com/svtasmaniaberlin_official", facebook: "https://facebook.com/tasmaniaberlin" },
    },
  },
  {
    id: "sparta",
    name: "Sparta Lichtenberg",
    short_name: "Sparta",
    slug: "sparta-lichtenberg",
    league_id: "oberliga-nofv-nord",
    bezirk: "Lichtenberg",
    founded_year: 1911,
    primary_color: "#D50000",
    secondary_color: "#FFFFFF",
    description: "Der SV Sparta Lichtenberg 1911, in Rummelsburg beheimatet, blickt auf über 110 Jahre Vereinsgeschichte zurück. Mit rund 300 Kindern und Jugendlichen in 17 Teams leistet Sparta hervorragende Nachwuchsarbeit im Berliner Osten.",
    members: null,
    teams_count: 17,
    profile: {
      sportstaette: { name: "Paul-Kalkbrenner-Sportfeld", adresse: "Fischerstraße 15", plz: "10317", bezirk: "Lichtenberg", mapsUrl: "https://maps.google.com/?q=Paul-Kalkbrenner-Sportfeld+Berlin", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { telefon: "+49 30 5592551", email: "info@sv-sparta.de", website: "https://www.sv-sparta.de" },
      socialMedia: { instagram: "https://instagram.com/spartalichtenberg", facebook: "https://facebook.com/SVSpartaLichtenberg" },
    },
  },
  {
    id: "makkabi",
    name: "TuS Makkabi Berlin",
    short_name: "Makkabi",
    slug: "tus-makkabi-berlin",
    league_id: "oberliga-nofv-nord",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1970,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der TuS Makkabi Berlin, 1970 aus der Fusion von Bar-Kochba (1898), Hakoah und Makkabi Berlin entstanden, ist einer der größten jüdischen Sportvereine Deutschlands. In der Julius-Hirsch-Sportanlage in Charlottenburg verbindet der Verein sportliche Ambitionen mit gesellschaftlichem Engagement.",
    members: 500,
    teams_count: null,
    profile: {
      sportstaette: { name: "Julius-Hirsch-Sportanlage", adresse: "Harbigstraße 40", plz: "14055", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Julius-Hirsch-Sportanlage+Berlin", kapazitaet: 3500, kunstrasen: false, flutlicht: false },
      kontakt: { telefon: "+49 30 2184708", email: "info@tus-makkabi.de", website: "https://tus-makkabi.de" },
      socialMedia: { instagram: "https://instagram.com/tusmakkabiberlin", facebook: "https://facebook.com/tusmakkabiberlinev" },
    },
  },

  // =============================================
  // BERLIN-LIGA
  // =============================================
  {
    id: "fuechse",
    name: "Füchse Berlin Reinickendorf",
    short_name: "Füchse",
    slug: "fuechse-berlin-reinickendorf",
    league_id: "berlin-liga",
    bezirk: "Reinickendorf",
    founded_year: 1891,
    primary_color: "#006B3F",
    secondary_color: "#FFFFFF",
    description: "Die Reinickendorfer Füchse, gegründet 1891, sind der Herbstmeister der Berlin-Liga 2025/26 und einer der ambitioniertesten Vereine der Stadt. Am Sportplatz Kienhorststraße treiben die Grün-Weißen den Aufstieg in die Oberliga voran.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Kienhorststraße", adresse: "Kienhorststraße 170", plz: "13403", bezirk: "Reinickendorf", mapsUrl: "https://maps.google.com/?q=Sportplatz+Kienhorststraße+Berlin", kapazitaet: 5000, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.fuechse-berlin-reinickendorf.de" },
      socialMedia: { instagram: "https://instagram.com/fuechseberlin" },
    },
  },
  {
    id: "tuerkspor",
    name: "Berlin Türkspor",
    short_name: "Türkspor",
    slug: "berlin-tuerkspor",
    league_id: "berlin-liga",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1965,
    primary_color: "#C8102E",
    secondary_color: "#FFFFFF",
    description: "Berlin Türkspor 1965 ist ein fester Bestandteil des Berliner Amateurfußballs. Am Sportplatz Heckerdamm vertritt der Verein die türkische Community in Charlottenburg und hat sich in der Berlin-Liga etabliert.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Heckerdamm", adresse: "Heckerdamm 204", plz: "13627", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Sportplatz+Heckerdamm+Berlin", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      socialMedia: { instagram: "https://instagram.com/berlin_tuerkspor_1965" },
    },
  },
  {
    id: "wilmersdorf",
    name: "1. FC Wilmersdorf",
    short_name: "Wilmersdorf",
    slug: "1-fc-wilmersdorf",
    league_id: "berlin-liga",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1989,
    primary_color: "#C8102E",
    secondary_color: "#FFFFFF",
    description: "Der 1. FC Wilmersdorf entstand 1989 durch eine Fusion und trägt den Namenszusatz 1911 in Erinnerung an seinen Vorgängerverein. An der Sportanlage Blissestraße in Wilmersdorf spielt der Verein in der Berlin-Liga.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportanlage Blissestraße", adresse: "Straße am Schoelerpark 39", plz: "10715", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Sportanlage+Blissestraße+Berlin", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://fcwilmersdorf.de" },
      socialMedia: { instagram: "https://instagram.com/1.fcwilmersdorf" },
    },
  },
  {
    id: "charlottenburg",
    name: "SC Charlottenburg",
    short_name: "SCC",
    slug: "sc-charlottenburg",
    league_id: "berlin-liga",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1902,
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    description: "Der Sport-Club Charlottenburg, 1902 gegründet, teilt sich das Mommsenstadion mit Tennis Borussia und ist einer der traditionsreichsten Vereine im Berliner Westen. Mit einer Kapazität von 11.500 Plätzen bietet das SCC eine besondere Heimspiel-Atmosphäre.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Mommsenstadion", adresse: "Waldschulallee 34", plz: "14055", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Mommsenstadion+Berlin", kapazitaet: 11500, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.scc-berlin.de" },
      socialMedia: { instagram: "https://instagram.com/sccharlottenburg.fussball" },
    },
  },
  {
    id: "staaken",
    name: "SC Staaken",
    short_name: "Staaken",
    slug: "sc-staaken",
    league_id: "berlin-liga",
    bezirk: "Spandau",
    founded_year: 1919,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der Sport-Club Staaken 1919, im Berliner Westen in Spandau beheimatet, ist nach dem Abstieg aus der Oberliga zurück in der Berlin-Liga. Am Sportpark Staaken kämpft der Verein um den direkten Wiederaufstieg.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportpark Staaken", adresse: "Eichholzbahn 116", plz: "13591", bezirk: "Spandau", mapsUrl: "https://maps.google.com/?q=Sportpark+Staaken+Berlin", kapazitaet: 1500, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://sc-staaken.de" },
      socialMedia: { instagram: "https://instagram.com/scstaaken1919" },
    },
  },
  {
    id: "stern",
    name: "SFC Stern 1900",
    short_name: "Stern",
    slug: "sfc-stern-1900",
    league_id: "berlin-liga",
    bezirk: "Steglitz-Zehlendorf",
    founded_year: 1900,
    primary_color: "#FFD700",
    secondary_color: "#003DA5",
    description: "Der Steglitzer Fussball-Club Stern 1900 ist einer der ältesten reinen Fußballvereine Berlins. In Gelb-Blau kämpft Stern seit über 120 Jahren am Sportplatz Schildhornstraße in Steglitz.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Schildhornstraße", adresse: "Kreuznacher Straße 29-45", plz: "14197", bezirk: "Steglitz-Zehlendorf", mapsUrl: "https://maps.google.com/?q=Sportplatz+Schildhornstraße+Berlin", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://stern1900.de" },
      socialMedia: { instagram: "https://instagram.com/sfcstern.1900" },
    },
  },
  {
    id: "mariendorf",
    name: "TSV Mariendorf 1897",
    short_name: "Mariendorf",
    slug: "tsv-mariendorf-1897",
    league_id: "berlin-liga",
    bezirk: "Tempelhof-Schöneberg",
    founded_year: 1897,
    primary_color: "#C8102E",
    secondary_color: "#FFFFFF",
    description: "Der Tempelhofer Sportverein Mariendorf 1897 ist einer der traditionsreichsten Vereine Südwest-Berlins. Im Volksparkstadion Mariendorf mit 10.000 Plätzen hat der Verein eine der größten Spielstätten der Berlin-Liga.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Volksparkstadion Mariendorf", adresse: "Prühßstraße 90", plz: "12109", bezirk: "Tempelhof-Schöneberg", mapsUrl: "https://maps.google.com/?q=Volksparkstadion+Mariendorf+Berlin", kapazitaet: 10000, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.tsvmariendorf97.de" },
      socialMedia: { instagram: "https://instagram.com/tsvmariendorf1897" },
    },
  },
  {
    id: "bw90",
    name: "Blau-Weiß 90 Berlin",
    short_name: "BW 90",
    slug: "blau-weiss-90-berlin",
    league_id: "berlin-liga",
    bezirk: "Tempelhof-Schöneberg",
    founded_year: 1992,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Die SpVgg Blau-Weiß 90 Berlin wurde 1992 nach der Insolvenz des Bundesliga-Klubs neugegründet. Der traditionsreiche Name lebt in Tempelhof weiter, wo der Aufsteiger in der Berlin-Liga 2025/26 spielt.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Rathausstraße", adresse: "Rathausstraße 10a", plz: "12105", bezirk: "Tempelhof-Schöneberg", mapsUrl: "https://maps.google.com/?q=Sportplatz+Rathausstraße+Berlin+Tempelhof", kapazitaet: 3000, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.blauweiss90berlin.de" },
      socialMedia: { instagram: "https://instagram.com/blauweissberlin.official" },
    },
  },
  {
    id: "spandauer-kickers",
    name: "FSV Spandauer Kickers",
    short_name: "Sp. Kickers",
    slug: "fsv-spandauer-kickers",
    league_id: "berlin-liga",
    bezirk: "Spandau",
    founded_year: 1975,
    primary_color: "#FF6600",
    secondary_color: "#003DA5",
    description: "Der FSV Spandauer Kickers 1975 bringt Farbe in die Berlin-Liga – in Orange und Blau vertreten die Kickers den Bezirk Spandau. An der Sportanlage Staaken-West mit 2.500 Plätzen sind sie eine feste Größe im Westen.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportanlage Staaken-West", adresse: "Brunsbütteler Damm 441", plz: "13591", bezirk: "Spandau", mapsUrl: "https://maps.google.com/?q=Sportanlage+Staaken-West+Berlin", kapazitaet: 2500, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.spaki-berlin.de" },
      socialMedia: { instagram: "https://instagram.com/spandauerkickers" },
    },
  },
  {
    id: "berliner-sc",
    name: "Berliner SC",
    short_name: "BSC",
    slug: "berliner-sc",
    league_id: "berlin-liga",
    bezirk: "Charlottenburg-Wilmersdorf",
    founded_year: 1895,
    primary_color: "#000000",
    secondary_color: "#FFD700",
    description: "Der Berliner Sport-Club, 1895 gegründet, ist einer der ältesten Sportvereine Berlins. Am Hubertussportplatz in Grunewald spielt der BSC in der Berlin-Liga und pflegt eine über 130-jährige Vereinstradition in Schwarz-Gold.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Hubertussportplatz", adresse: "Hubertusallee 50", plz: "14193", bezirk: "Charlottenburg-Wilmersdorf", mapsUrl: "https://maps.google.com/?q=Hubertussportplatz+Berlin", kapazitaet: 2500, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.berlinersportclub.de" },
      socialMedia: { instagram: "https://instagram.com/berlinersc_fussball" },
    },
  },
  {
    id: "frohnau",
    name: "Frohnauer SC",
    short_name: "Frohnau",
    slug: "frohnauer-sc",
    league_id: "berlin-liga",
    bezirk: "Reinickendorf",
    founded_year: 1946,
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    description: "Der Frohnauer Sport Club 1946 ist am Poloplatz im grünen Norden Berlins beheimatet. In Schwarz-Weiß vertritt der Verein den Bezirk Reinickendorf in der Berlin-Liga.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Poloplatz", adresse: "Schönfließer Straße 12A", plz: "13465", bezirk: "Reinickendorf", mapsUrl: "https://maps.google.com/?q=Poloplatz+Frohnau+Berlin", kapazitaet: 1500, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://frohnauersc.de" },
      socialMedia: { instagram: "https://instagram.com/frohnauersc" },
    },
  },
  {
    id: "hohen-neuendorf",
    name: "BW Hohen Neuendorf",
    short_name: "BWHN",
    slug: "bw-hohen-neuendorf",
    league_id: "berlin-liga",
    bezirk: null,
    founded_year: 1921,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der SV Blau-Weiß Hohen Neuendorf, 1921 gegründet, ist der einzige Brandenburger Verein in der Berlin-Liga. Aus dem Landkreis Oberhavel stammend, spielt der Verein an der Sportanlage Niederheide.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportanlage Niederheide", adresse: "Friedrich-Engels-Straße 21a", plz: "16540", bezirk: null, mapsUrl: "https://maps.google.com/?q=Sportanlage+Niederheide+Hohen+Neuendorf", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://bwhnd.de" },
      socialMedia: { instagram: "https://instagram.com/bwhnd_club" },
    },
  },
  {
    id: "rudow",
    name: "TSV Rudow 1888",
    short_name: "Rudow",
    slug: "tsv-rudow-1888",
    league_id: "berlin-liga",
    bezirk: "Neukölln",
    founded_year: 1888,
    primary_color: "#006B3F",
    secondary_color: "#FFFFFF",
    description: "Der Turn- und Sportverein Rudow 1888 ist einer der ältesten Vereine Berlins. 2025 in die Berlin-Liga aufgestiegen, vertritt der Verein in Grün-Weiß-Rot den Bezirk Neukölln am Sportplatz Stubenrauchstraße.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sportplatz Stubenrauchstraße", adresse: "Neuköllner Straße 277", plz: "12357", bezirk: "Neukölln", mapsUrl: "https://maps.google.com/?q=Sportplatz+Stubenrauchstraße+Berlin+Rudow", kapazitaet: 500, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://www.tsv-rudow.de" },
      socialMedia: { instagram: "https://instagram.com/tsvrudow1888" },
    },
  },
  {
    id: "empor",
    name: "SV Empor Berlin",
    short_name: "Empor",
    slug: "sv-empor-berlin",
    league_id: "berlin-liga",
    bezirk: "Pankow",
    founded_year: 1949,
    primary_color: "#003DA5",
    secondary_color: "#FFFFFF",
    description: "Der Sportverein Empor Berlin, 1949 gegründet, ist im Kleinen Stadion im Friedrich-Ludwig-Jahn-Sportpark in Pankow beheimatet. Der Verein steht für soliden Berliner Amateurfußball im Prenzlauer Berg.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Kleines Stadion im Jahn-Sportpark", adresse: "Cantianstraße 24", plz: "10437", bezirk: "Pankow", mapsUrl: "https://maps.google.com/?q=Jahn-Sportpark+Berlin", kapazitaet: 2000, kunstrasen: false, flutlicht: true },
      kontakt: { website: "https://www.sv-empor-berlin.de" },
      socialMedia: { instagram: "https://instagram.com/sv_empor_berlin" },
    },
  },
  {
    id: "fortuna-biesdorf",
    name: "Fortuna Biesdorf",
    short_name: "Fortuna",
    slug: "fortuna-biesdorf",
    league_id: "berlin-liga",
    bezirk: "Marzahn-Hellersdorf",
    founded_year: 1905,
    primary_color: "#006B3F",
    secondary_color: "#FFFFFF",
    description: "Der VfB Fortuna Biesdorf 1905 aus Marzahn-Hellersdorf ist einer der traditionsreichen Vereine im Berliner Osten. An der Grabensprungarena spielt Fortuna in Grün-Weiß und steht für beständigen Amateurfußball.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Grabensprungarena", adresse: "Grabensprung 56", plz: "12683", bezirk: "Marzahn-Hellersdorf", mapsUrl: "https://maps.google.com/?q=Grabensprungarena+Berlin+Biesdorf", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://www.fortuna-biesdorf.de" },
      socialMedia: { instagram: "https://instagram.com/fortunabiesdorf" },
    },
  },
  {
    id: "polar-pinguin",
    name: "Polar Pinguin",
    short_name: "Polar",
    slug: "polar-pinguin",
    league_id: "berlin-liga",
    bezirk: "Tempelhof-Schöneberg",
    founded_year: 1990,
    primary_color: "#000000",
    secondary_color: "#FFFFFF",
    description: "Polar Pinguin Berlin – gegründet 1990 als Thekenmannschaft aus der Schöneberger Punkszene, alle Spieler unbezahlt. Was als Spaßprojekt begann, hat sich bis in die Berlin-Liga hochgearbeitet. An der PolArena in Tempelhof lebt der Underdog-Spirit.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "PolArena", adresse: "Markgrafenstraße 19-24", plz: "12105", bezirk: "Tempelhof-Schöneberg", mapsUrl: "https://maps.google.com/?q=PolArena+Berlin+Tempelhof", kapazitaet: 500, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://www.polar-pinguin.berlin" },
      socialMedia: { instagram: "https://instagram.com/polar_pinguin" },
    },
  },
  {
    id: "ssc-suedwest",
    name: "SSC Südwest",
    short_name: "Südwest",
    slug: "ssc-suedwest",
    league_id: "berlin-liga",
    bezirk: "Steglitz-Zehlendorf",
    founded_year: 1947,
    primary_color: "#C8102E",
    secondary_color: "#FFFFFF",
    description: "Der Steglitzer Sport Club Südwest 1947, als Aufsteiger in der Berlin-Liga 2025/26, spielt an der Sochos-Sportanlage in Steglitz. In Rot-Weiß vertritt der Verein den Bezirk Steglitz-Zehlendorf.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Sochos-Sportanlage", adresse: "Lessingstraße 5-8", plz: "12169", bezirk: "Steglitz-Zehlendorf", mapsUrl: "https://maps.google.com/?q=Sochos-Sportanlage+Berlin+Steglitz", kapazitaet: 1000, kunstrasen: false, flutlicht: false },
      kontakt: { website: "https://sscsuedwest.de" },
      socialMedia: { instagram: "https://instagram.com/official.ssc_suedwest" },
    },
  },

  // =============================================
  // LANDESLIGA – Türkiyemspor (korrigierte Liga)
  // =============================================
  {
    id: "tuerkiyemspor",
    name: "Türkiyemspor Berlin",
    short_name: "Türkiyem",
    slug: "tuerkiyemspor-berlin",
    league_id: "landesliga-2",
    bezirk: "Friedrichshain-Kreuzberg",
    founded_year: 1978,
    primary_color: "#E30A17",
    secondary_color: "#FFFFFF",
    description: "Türkiyemspor Berlin wurde 1978 von türkischen Einwanderern in Kreuzberg gegründet und ist weit mehr als ein Fußballverein. Als Symbol für Integration und kulturelle Vielfalt hat der Klub Berliner Sportgeschichte geschrieben. In den 2000ern spielte Türkiyemspor in der Oberliga und ist bis heute eine feste Größe im Berliner Amateurfußball.",
    members: null,
    teams_count: null,
    profile: {
      sportstaette: { name: "Katzbachstadion", adresse: "Dudenstraße 40", plz: "10965", bezirk: "Friedrichshain-Kreuzberg", mapsUrl: "https://maps.google.com/?q=Katzbachstadion+Berlin", kapazitaet: 3000, kunstrasen: true, flutlicht: true },
      kontakt: { telefon: "030 6915 2230", email: "info@tuerkiyemspor.de", website: "https://www.tuerkiyemspor.de" },
      socialMedia: { instagram: "https://instagram.com/tuerkiyemspor", facebook: "https://facebook.com/tuerkiyemspor" },
    },
  },
];

async function importClubs() {
  console.log(`Importing ${clubs.length} clubs...\n`);

  let success = 0;
  let errors = 0;

  for (const club of clubs) {
    const { data, error } = await supabase
      .from("clubs")
      .upsert(club, { onConflict: "id" })
      .select("id, name")
      .single();

    if (error) {
      console.error(`  FAIL: ${club.name} — ${error.message}`);
      errors++;
    } else {
      console.log(`  OK: ${data.name}`);
      success++;
    }
  }

  // Remove non-Berlin clubs
  for (const removeId of ["wacker", "union2"]) {
    const { error } = await supabase.from("clubs").delete().eq("id", removeId);
    if (error && !error.message.includes("0 rows")) {
      console.error(`  FAIL removing ${removeId}: ${error.message}`);
    } else {
      console.log(`  Removed: ${removeId}`);
    }
  }

  console.log(`\nDone: ${success} OK, ${errors} errors`);
}

importClubs();
