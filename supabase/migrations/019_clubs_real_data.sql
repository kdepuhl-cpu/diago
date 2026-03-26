-- ============================================
-- 019: Echte Vereinsdaten – 31 Berliner Vereine
-- Regionalliga Nordost, Oberliga NOFV Nord, Berlin-Liga
-- Quellen: Wikipedia, Vereinswebsites, Transfermarkt, Kicker
-- ============================================

-- ============================================
-- 1. Bestehende Clubs aktualisieren + Neue einfügen
--    Upsert: ON CONFLICT (id) DO UPDATE
-- ============================================

-- ============================================
-- REGIONALLIGA NORDOST – Berliner Vereine
-- ============================================

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'bfc',
  'BFC Dynamo',
  'BFC',
  'bfc-dynamo',
  'regionalliga-nordost',
  'Lichtenberg',
  1966,
  '#8B0000',
  '#FFFFFF',
  'Der BFC Dynamo, 1966 gegründet, ist der Rekordmeister der DDR-Oberliga mit zehn Titeln in Folge (1979–1988). Nach der Wende durchlief der Verein einen langen Weg durch die unteren Ligen. Heute spielt der BFC in der Regionalliga Nordost und hat eine der aktivsten und leidenschaftlichsten Fanszenen im Berliner Amateurfußball.',
  2148,
  NULL,
  '{
    "sportstaette": {"name": "Sportforum Berlin", "adresse": "Weißenseer Weg 51-55", "plz": "13053", "bezirk": "Lichtenberg", "mapsUrl": "https://maps.google.com/?q=Sportforum+Berlin+Hohenschönhausen", "kapazitaet": 12400, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 9860869-0", "email": "info@bfc.com", "website": "https://bfc.com"},
    "socialMedia": {"instagram": "https://instagram.com/bfcdynamo_official", "facebook": "https://facebook.com/berlinerfcdynamo"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'altglienicke',
  'VSG Altglienicke',
  'VSG',
  'vsg-altglienicke',
  'regionalliga-nordost',
  'Treptow-Köpenick',
  1948,
  '#003DA5',
  '#FFFFFF',
  'Die VSG Altglienicke, 1948 gegründet mit sportlichen Wurzeln bis 1883, hat sich zu einer der Erfolgsgeschichten des Berliner Fußballs entwickelt. Von den unteren Ligen bis in die Regionalliga Nordost – der Verein aus Treptow-Köpenick steht für konsequente Arbeit, solide Nachwuchsförderung und familiäre Vereinskultur.',
  1100,
  NULL,
  '{
    "sportstaette": {"name": "Stadion Altglienicke", "adresse": "Alter Schönefelder Weg 20", "plz": "12524", "bezirk": "Treptow-Köpenick", "mapsUrl": "https://maps.google.com/?q=Stadion+Altglienicke+Berlin", "kapazitaet": 2500, "kunstrasen": true, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 6731026", "email": "info@fussball.vsg-altglienicke.de", "website": "https://www.vsg-altglienicke.de"},
    "socialMedia": {"instagram": "https://instagram.com/vsgaltglienicke_official", "facebook": "https://facebook.com/VSGAltglienicke"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'zehlendorf',
  'Hertha 03 Zehlendorf',
  'H03',
  'hertha-03-zehlendorf',
  'regionalliga-nordost',
  'Steglitz-Zehlendorf',
  1903,
  '#003DA5',
  '#FFFFFF',
  'Der FC Hertha 03 Zehlendorf, 1903 gegründet, ist ein traditionsreicher Berliner Fußballverein mit starker Jugendarbeit und über 50 Mannschaften. Nach dem Aufstieg in die Regionalliga Nordost hat der Verein aus Zehlendorf bewiesen, dass er auch auf überregionaler Ebene mithalten kann.',
  NULL,
  51,
  '{
    "sportstaette": {"name": "Ernst-Reuter-Sportfeld", "adresse": "Onkel-Tom-Straße 40", "plz": "14169", "bezirk": "Steglitz-Zehlendorf", "mapsUrl": "https://maps.google.com/?q=Ernst-Reuter-Sportfeld+Berlin", "kapazitaet": 5000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 3198144-0", "email": "service@h03.de", "website": "https://www.h03.de"},
    "socialMedia": {"instagram": "https://instagram.com/h03zehlendorf", "facebook": "https://facebook.com/h03.de"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'hertha2',
  'Hertha BSC II',
  'Hertha II',
  'hertha-bsc-ii',
  'regionalliga-nordost',
  'Charlottenburg-Wilmersdorf',
  1892,
  '#003DA5',
  '#FFFFFF',
  'Die zweite Mannschaft von Hertha BSC spielt in der Regionalliga Nordost und dient als Bindeglied zwischen der exzellenten Jugendakademie und dem Profikader. Im Stadion auf dem Wurfplatz im Olympiapark bieten die jungen Herthaner attraktiven Fußball.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Stadion auf dem Wurfplatz", "adresse": "Hanns-Braun-Straße 2", "plz": "14053", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Stadion+auf+dem+Wurfplatz+Berlin", "kapazitaet": 5400, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.herthabsc.com"},
    "socialMedia": {"instagram": "https://instagram.com/herthabsc", "facebook": "https://facebook.com/herthabsc"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'preussen',
  'BFC Preussen',
  'Preussen',
  'bfc-preussen',
  'regionalliga-nordost',
  'Steglitz-Zehlendorf',
  1894,
  '#000000',
  '#FFFFFF',
  'Der Berliner Fußballclub Preussen 1894 ist einer der ältesten Fußballvereine Deutschlands. Aus Lankwitz stammend, blickt der Verein auf über 130 Jahre Fußballgeschichte zurück. In der Regionalliga Nordost beweist der BFC, dass Tradition und sportlicher Ehrgeiz zusammengehören.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Preussenstadion", "adresse": "Malteserstraße 24-36", "plz": "12249", "bezirk": "Steglitz-Zehlendorf", "mapsUrl": "https://maps.google.com/?q=Preussenstadion+Berlin+Lankwitz", "kapazitaet": 7000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"telefon": "+49 30 40741303", "email": "info@bfc-preussen.de", "website": "https://bfc-preussen.de"},
    "socialMedia": {"instagram": "https://instagram.com/bfc_preussen_official", "facebook": "https://facebook.com/bfcpreussen.fussball"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

-- ============================================
-- OBERLIGA NOFV NORD – Berliner Vereine
-- ============================================

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'bak',
  'Berliner AK 07',
  'BAK',
  'berliner-ak-07',
  'oberliga-nofv-nord',
  'Mitte',
  1907,
  '#D50000',
  '#FFFFFF',
  'Der Berliner Athletik Klub 07, kurz BAK, wurde 1907 in Moabit gegründet und ist im historischen Poststadion beheimatet. Der Verein gehört zu den traditionsreichsten Berliner Klubs und kämpft in der Oberliga NOFV Nord um den Wiederaufstieg in die Regionalliga.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Poststadion", "adresse": "Lehrter Straße 59", "plz": "10557", "bezirk": "Mitte", "mapsUrl": "https://maps.google.com/?q=Poststadion+Berlin", "kapazitaet": 10000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"email": "info@bak07.de", "website": "https://www.bak07.de"},
    "socialMedia": {"instagram": "https://instagram.com/berlinerak1907", "facebook": "https://facebook.com/berlinerathletikklub07"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'tebe',
  'Tennis Borussia Berlin',
  'TeBe',
  'tennis-borussia',
  'oberliga-nofv-nord',
  'Charlottenburg-Wilmersdorf',
  1902,
  '#7B2D8E',
  '#FFFFFF',
  'Tennis Borussia Berlin, liebevoll TeBe genannt, ist einer der traditionsreichsten Vereine der Hauptstadt. 1902 gegründet, spielte der Klub in den 1970ern in der Bundesliga. Im legendären Mommsenstadion in Westend steht TeBe für leidenschaftlichen Fußball mit einer der treuesten Fanszenen Berlins.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Mommsenstadion", "adresse": "Waldschulallee 34", "plz": "14055", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Mommsenstadion+Berlin", "kapazitaet": 14700, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 30102166", "email": "info@tebe.de", "website": "https://www.tebe.de"},
    "socialMedia": {"instagram": "https://instagram.com/TennisBorussia", "facebook": "https://facebook.com/TennisBorussiaBerlin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'eintracht-mahlsdorf',
  'Eintracht Mahlsdorf',
  'Mahlsdorf',
  'eintracht-mahlsdorf',
  'oberliga-nofv-nord',
  'Marzahn-Hellersdorf',
  1896,
  '#9370DB',
  '#FFFFFF',
  'Der BSV Eintracht Mahlsdorf, gegründet 1896, ist der Verein von Tino Loest, dem neuen Eigentümer der Fußball-Woche. Aus Mahlsdorf in Marzahn-Hellersdorf stammend, hat sich Eintracht in der Oberliga NOFV Nord etabliert und steht für bodenständigen Berliner Amateurfußball.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Am Rosenhag", "adresse": "Melanchthonstraße 52D", "plz": "12623", "bezirk": "Marzahn-Hellersdorf", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Am+Rosenhag+Berlin+Mahlsdorf", "kapazitaet": 2500, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"telefon": "+49 30 5646162", "email": "vorstand@bsv-eintracht-mahlsdorf.de", "website": "https://www.bsv-eintracht-mahlsdorf.de"},
    "socialMedia": {"instagram": "https://instagram.com/eintracht_mahlsdorf_official", "facebook": "https://facebook.com/EintrachtMahlsdorf"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'viktoria',
  'FC Viktoria 1889 Berlin',
  'Viktoria',
  'fc-viktoria-berlin',
  'oberliga-nofv-nord',
  'Steglitz-Zehlendorf',
  1889,
  '#FFFFFF',
  '#000000',
  'Der FC Viktoria 1889 Berlin, einer der ältesten Fußballvereine Deutschlands, entstand 2013 aus der Fusion von BFC Viktoria 1889 und dem Lichterfelder FC. Im Stadion Lichterfelde bietet der Verein mit über 65 Mannschaften ein breites sportliches Angebot und spielte 2022 sogar im DFB-Pokal.',
  1600,
  65,
  '{
    "sportstaette": {"name": "Stadion Lichterfelde", "adresse": "Ostpreußendamm / Krahmerstraße 15", "plz": "12207", "bezirk": "Steglitz-Zehlendorf", "mapsUrl": "https://maps.google.com/?q=Stadion+Lichterfelde+Berlin", "kapazitaet": 4300, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 75444898-00", "email": "info@viktoria.berlin", "website": "https://viktoria.berlin"},
    "socialMedia": {"instagram": "https://instagram.com/viktoriaberlin", "facebook": "https://facebook.com/FCViktoria1889Berlin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'croatia',
  'SD Croatia Berlin',
  'Croatia',
  'sd-croatia-berlin',
  'oberliga-nofv-nord',
  'Tempelhof-Schöneberg',
  1972,
  '#D50000',
  '#FFFFFF',
  'Der Sportsko Društvo Croatia Berlin wurde 1972 von kroatischen Einwanderern in Tempelhof gegründet. Mit rund 23 Mannschaften ist Croatia Berlin ein wichtiger Bestandteil des Berliner Amateurfußballs und steht für Integration durch Sport.',
  NULL,
  23,
  '{
    "sportstaette": {"name": "Friedrich-Ebert-Stadion", "adresse": "Bosestraße 21", "plz": "12103", "bezirk": "Tempelhof-Schöneberg", "mapsUrl": "https://maps.google.com/?q=Friedrich-Ebert-Stadion+Berlin+Tempelhof", "kapazitaet": 5000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"telefon": "+49 30 6949940", "email": "info@sdcroatia.de", "website": "https://sdcroatia.de"},
    "socialMedia": {"instagram": "https://instagram.com/sdcroatiaberlin", "facebook": "https://facebook.com/sdcroatiaberlinev"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'lichtenberg',
  'SV Lichtenberg 47',
  'L47',
  'sv-lichtenberg-47',
  'oberliga-nofv-nord',
  'Lichtenberg',
  1947,
  '#003DA5',
  '#FFFFFF',
  'Der SV Lichtenberg 47 wurde 1947 gegründet und ist im legendären Hans-Zoschke-Stadion (heute HOWOGE-Arena) beheimatet. Mit fast 10.000 Plätzen hat der Verein eines der atmosphärischsten Stadien im Berliner Amateurfußball. Über 900 Mitglieder tragen die blau-weißen Farben.',
  900,
  NULL,
  '{
    "sportstaette": {"name": "HOWOGE-Arena «Hans Zoschke»", "adresse": "Normannenstraße 26-28", "plz": "10367", "bezirk": "Lichtenberg", "mapsUrl": "https://maps.google.com/?q=Hans-Zoschke-Stadion+Berlin", "kapazitaet": 9900, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 5589151", "email": "praesidium@lichtenberg47.de", "website": "https://www.lichtenberg47.de"},
    "socialMedia": {"instagram": "https://instagram.com/sv_lichtenberg_47", "facebook": "https://facebook.com/Lichtenberg47"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'tasmania',
  'Tasmania Berlin',
  'Tasmania',
  'tasmania-berlin',
  'oberliga-nofv-nord',
  'Neukölln',
  1973,
  '#003DA5',
  '#D50000',
  'Der SV Tasmania Berlin, 1973 gegründet als Nachfolger des legendären SC Tasmania 1900, ist im Werner-Seelenbinder-Sportpark in Neukölln beheimatet. Tasmania ist berühmt-berüchtigt für die Bundesliga-Saison 1965/66 mit nur 10 Punkten – ein Rekord, der nie gebrochen wurde.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Werner-Seelenbinder-Sportpark", "adresse": "Oderstraße 182", "plz": "12051", "bezirk": "Neukölln", "mapsUrl": "https://maps.google.com/?q=Werner-Seelenbinder-Sportpark+Berlin", "kapazitaet": 6000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"telefon": "+49 30 6268193", "email": "geschaeftsstelle@sv-tasmania-berlin.de", "website": "https://www.sv-tasmania-berlin.de"},
    "socialMedia": {"instagram": "https://instagram.com/svtasmaniaberlin_official", "facebook": "https://facebook.com/tasmaniaberlin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'sparta',
  'Sparta Lichtenberg',
  'Sparta',
  'sparta-lichtenberg',
  'oberliga-nofv-nord',
  'Lichtenberg',
  1911,
  '#D50000',
  '#FFFFFF',
  'Der SV Sparta Lichtenberg 1911, in Rummelsburg beheimatet, blickt auf über 110 Jahre Vereinsgeschichte zurück. Mit rund 300 Kindern und Jugendlichen in 17 Teams leistet Sparta hervorragende Nachwuchsarbeit im Berliner Osten.',
  NULL,
  17,
  '{
    "sportstaette": {"name": "Paul-Kalkbrenner-Sportfeld", "adresse": "Fischerstraße 15", "plz": "10317", "bezirk": "Lichtenberg", "mapsUrl": "https://maps.google.com/?q=Paul-Kalkbrenner-Sportfeld+Berlin", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"telefon": "+49 30 5592551", "email": "info@sv-sparta.de", "website": "https://www.sv-sparta.de"},
    "socialMedia": {"instagram": "https://instagram.com/spartalichtenberg", "facebook": "https://facebook.com/SVSpartaLichtenberg"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'makkabi',
  'TuS Makkabi Berlin',
  'Makkabi',
  'tus-makkabi-berlin',
  'oberliga-nofv-nord',
  'Charlottenburg-Wilmersdorf',
  1970,
  '#003DA5',
  '#FFFFFF',
  'Der TuS Makkabi Berlin, 1970 aus der Fusion von Bar-Kochba (1898), Hakoah und Makkabi Berlin entstanden, ist einer der größten jüdischen Sportvereine Deutschlands. In der Julius-Hirsch-Sportanlage in Charlottenburg verbindet der Verein sportliche Ambitionen mit gesellschaftlichem Engagement.',
  500,
  NULL,
  '{
    "sportstaette": {"name": "Julius-Hirsch-Sportanlage", "adresse": "Harbigstraße 40", "plz": "14055", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Julius-Hirsch-Sportanlage+Berlin", "kapazitaet": 3500, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"telefon": "+49 30 2184708", "email": "info@tus-makkabi.de", "website": "https://tus-makkabi.de"},
    "socialMedia": {"instagram": "https://instagram.com/tusmakkabiberlin", "facebook": "https://facebook.com/tusmakkabiberlinev"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

-- ============================================
-- BERLIN-LIGA
-- ============================================

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'fuechse',
  'Füchse Berlin Reinickendorf',
  'Füchse',
  'fuechse-berlin-reinickendorf',
  'berlin-liga',
  'Reinickendorf',
  1891,
  '#006B3F',
  '#FFFFFF',
  'Die Reinickendorfer Füchse, gegründet 1891, sind der Herbstmeister der Berlin-Liga 2025/26 und einer der ambitioniertesten Vereine der Stadt. Am Sportplatz Kienhorststraße treiben die Grün-Weißen den Aufstieg in die Oberliga voran.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Kienhorststraße", "adresse": "Kienhorststraße 170", "plz": "13403", "bezirk": "Reinickendorf", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Kienhorststraße+Berlin", "kapazitaet": 5000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.fuechse-berlin-reinickendorf.de"},
    "socialMedia": {"instagram": "https://instagram.com/fuechseberlin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'tuerkspor',
  'Berlin Türkspor',
  'Türkspor',
  'berlin-tuerkspor',
  'berlin-liga',
  'Charlottenburg-Wilmersdorf',
  1965,
  '#C8102E',
  '#FFFFFF',
  'Berlin Türkspor 1965 ist ein fester Bestandteil des Berliner Amateurfußballs. Am Sportplatz Heckerdamm vertritt der Verein die türkische Community in Charlottenburg und hat sich in der Berlin-Liga etabliert.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Heckerdamm", "adresse": "Heckerdamm 204", "plz": "13627", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Heckerdamm+Berlin", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "socialMedia": {"instagram": "https://instagram.com/berlin_tuerkspor_1965"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'wilmersdorf',
  '1. FC Wilmersdorf',
  'Wilmersdorf',
  '1-fc-wilmersdorf',
  'berlin-liga',
  'Charlottenburg-Wilmersdorf',
  1989,
  '#C8102E',
  '#FFFFFF',
  'Der 1. FC Wilmersdorf entstand 1989 durch eine Fusion und trägt den Namenszusatz 1911 in Erinnerung an seinen Vorgängerverein. An der Sportanlage Blissestraße in Wilmersdorf spielt der Verein in der Berlin-Liga.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportanlage Blissestraße", "adresse": "Straße am Schoelerpark 39", "plz": "10715", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Sportanlage+Blissestraße+Berlin", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://fcwilmersdorf.de"},
    "socialMedia": {"instagram": "https://instagram.com/1.fcwilmersdorf"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'charlottenburg',
  'SC Charlottenburg',
  'SCC',
  'sc-charlottenburg',
  'berlin-liga',
  'Charlottenburg-Wilmersdorf',
  1902,
  '#000000',
  '#FFFFFF',
  'Der Sport-Club Charlottenburg, 1902 gegründet, teilt sich das Mommsenstadion mit Tennis Borussia und ist einer der traditionsreichsten Vereine im Berliner Westen. Mit einer Kapazität von 11.500 Plätzen bietet das SCC eine besondere Heimspiel-Atmosphäre.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Mommsenstadion", "adresse": "Waldschulallee 34", "plz": "14055", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Mommsenstadion+Berlin", "kapazitaet": 11500, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.scc-berlin.de"},
    "socialMedia": {"instagram": "https://instagram.com/sccharlottenburg.fussball"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'staaken',
  'SC Staaken',
  'Staaken',
  'sc-staaken',
  'berlin-liga',
  'Spandau',
  1919,
  '#003DA5',
  '#FFFFFF',
  'Der Sport-Club Staaken 1919, im Berliner Westen in Spandau beheimatet, ist nach dem Abstieg aus der Oberliga zurück in der Berlin-Liga. Am Sportpark Staaken kämpft der Verein um den direkten Wiederaufstieg.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportpark Staaken", "adresse": "Eichholzbahn 116", "plz": "13591", "bezirk": "Spandau", "mapsUrl": "https://maps.google.com/?q=Sportpark+Staaken+Berlin", "kapazitaet": 1500, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://sc-staaken.de"},
    "socialMedia": {"instagram": "https://instagram.com/scstaaken1919"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'stern',
  'SFC Stern 1900',
  'Stern',
  'sfc-stern-1900',
  'berlin-liga',
  'Steglitz-Zehlendorf',
  1900,
  '#FFD700',
  '#003DA5',
  'Der Steglitzer Fussball-Club Stern 1900 ist einer der ältesten reinen Fußballvereine Berlins. In Gelb-Blau kämpft Stern seit über 120 Jahren am Sportplatz Schildhornstraße in Steglitz.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Schildhornstraße", "adresse": "Kreuznacher Straße 29-45", "plz": "14197", "bezirk": "Steglitz-Zehlendorf", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Schildhornstraße+Berlin", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://stern1900.de"},
    "socialMedia": {"instagram": "https://instagram.com/sfcstern.1900"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'mariendorf',
  'TSV Mariendorf 1897',
  'Mariendorf',
  'tsv-mariendorf-1897',
  'berlin-liga',
  'Tempelhof-Schöneberg',
  1897,
  '#C8102E',
  '#FFFFFF',
  'Der Tempelhofer Sportverein Mariendorf 1897 ist einer der traditionsreichsten Vereine Südwest-Berlins. Im Volksparkstadion Mariendorf mit 10.000 Plätzen hat der Verein eine der größten Spielstätten der Berlin-Liga.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Volksparkstadion Mariendorf", "adresse": "Prühßstraße 90", "plz": "12109", "bezirk": "Tempelhof-Schöneberg", "mapsUrl": "https://maps.google.com/?q=Volksparkstadion+Mariendorf+Berlin", "kapazitaet": 10000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.tsvmariendorf97.de"},
    "socialMedia": {"instagram": "https://instagram.com/tsvmariendorf1897"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'bw90',
  'Blau-Weiß 90 Berlin',
  'BW 90',
  'blau-weiss-90-berlin',
  'berlin-liga',
  'Tempelhof-Schöneberg',
  1992,
  '#003DA5',
  '#FFFFFF',
  'Die SpVgg Blau-Weiß 90 Berlin wurde 1992 nach der Insolvenz des Bundesliga-Klubs neugegründet. Der traditionsreiche Name lebt in Tempelhof weiter, wo der Aufsteiger in der Berlin-Liga 2025/26 spielt.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Rathausstraße", "adresse": "Rathausstraße 10a", "plz": "12105", "bezirk": "Tempelhof-Schöneberg", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Rathausstraße+Berlin+Tempelhof", "kapazitaet": 3000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.blauweiss90berlin.de"},
    "socialMedia": {"instagram": "https://instagram.com/blauweissberlin.official"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'spandauer-kickers',
  'FSV Spandauer Kickers',
  'Spandauer Kickers',
  'fsv-spandauer-kickers',
  'berlin-liga',
  'Spandau',
  1975,
  '#FF6600',
  '#003DA5',
  'Der FSV Spandauer Kickers 1975 bringt Farbe in die Berlin-Liga – in Orange und Blau vertreten die Kickers den Bezirk Spandau. An der Sportanlage Staaken-West mit 2.500 Plätzen sind sie eine feste Größe im Westen.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportanlage Staaken-West", "adresse": "Brunsbütteler Damm 441", "plz": "13591", "bezirk": "Spandau", "mapsUrl": "https://maps.google.com/?q=Sportanlage+Staaken-West+Berlin", "kapazitaet": 2500, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.spaki-berlin.de"},
    "socialMedia": {"instagram": "https://instagram.com/spandauerkickers"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'berliner-sc',
  'Berliner SC',
  'BSC',
  'berliner-sc',
  'berlin-liga',
  'Charlottenburg-Wilmersdorf',
  1895,
  '#000000',
  '#FFD700',
  'Der Berliner Sport-Club, 1895 gegründet, ist einer der ältesten Sportvereine Berlins. Am Hubertussportplatz in Grunewald spielt der BSC in der Berlin-Liga und pflegt eine über 130-jährige Vereinstradition in Schwarz-Gold.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Hubertussportplatz", "adresse": "Hubertusallee 50", "plz": "14193", "bezirk": "Charlottenburg-Wilmersdorf", "mapsUrl": "https://maps.google.com/?q=Hubertussportplatz+Berlin", "kapazitaet": 2500, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.berlinersportclub.de"},
    "socialMedia": {"instagram": "https://instagram.com/berlinersc_fussball"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'frohnau',
  'Frohnauer SC',
  'Frohnau',
  'frohnauer-sc',
  'berlin-liga',
  'Reinickendorf',
  1946,
  '#000000',
  '#FFFFFF',
  'Der Frohnauer Sport Club 1946 ist am Poloplatz im grünen Norden Berlins beheimatet. In Schwarz-Weiß vertritt der Verein den Bezirk Reinickendorf in der Berlin-Liga.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Poloplatz", "adresse": "Schönfließer Straße 12A", "plz": "13465", "bezirk": "Reinickendorf", "mapsUrl": "https://maps.google.com/?q=Poloplatz+Frohnau+Berlin", "kapazitaet": 1500, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://frohnauersc.de"},
    "socialMedia": {"instagram": "https://instagram.com/frohnauersc"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'hohen-neuendorf',
  'BW Hohen Neuendorf',
  'BWHN',
  'bw-hohen-neuendorf',
  'berlin-liga',
  NULL,
  1921,
  '#003DA5',
  '#FFFFFF',
  'Der SV Blau-Weiß Hohen Neuendorf, 1921 gegründet, ist der einzige Brandenburger Verein in der Berlin-Liga. Aus dem Landkreis Oberhavel stammend, spielt der Verein an der Sportanlage Niederheide.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportanlage Niederheide", "adresse": "Friedrich-Engels-Straße 21a", "plz": "16540", "bezirk": null, "mapsUrl": "https://maps.google.com/?q=Sportanlage+Niederheide+Hohen+Neuendorf", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://bwhnd.de"},
    "socialMedia": {"instagram": "https://instagram.com/bwhnd_club"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'rudow',
  'TSV Rudow 1888',
  'Rudow',
  'tsv-rudow-1888',
  'berlin-liga',
  'Neukölln',
  1888,
  '#006B3F',
  '#FFFFFF',
  'Der Turn- und Sportverein Rudow 1888 ist einer der ältesten Vereine Berlins. 2025 in die Berlin-Liga aufgestiegen, vertritt der Verein in Grün-Weiß-Rot den Bezirk Neukölln am Sportplatz Stubenrauchstraße.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sportplatz Stubenrauchstraße", "adresse": "Neuköllner Straße 277", "plz": "12357", "bezirk": "Neukölln", "mapsUrl": "https://maps.google.com/?q=Sportplatz+Stubenrauchstraße+Berlin+Rudow", "kapazitaet": 500, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://www.tsv-rudow.de"},
    "socialMedia": {"instagram": "https://instagram.com/tsvrudow1888"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'empor',
  'SV Empor Berlin',
  'Empor',
  'sv-empor-berlin',
  'berlin-liga',
  'Pankow',
  1949,
  '#003DA5',
  '#FFFFFF',
  'Der Sportverein Empor Berlin, 1949 gegründet, ist im Kleinen Stadion im Friedrich-Ludwig-Jahn-Sportpark in Pankow beheimatet. Der Verein steht für soliden Berliner Amateurfußball im Prenzlauer Berg.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Kleines Stadion im Jahn-Sportpark", "adresse": "Cantianstraße 24", "plz": "10437", "bezirk": "Pankow", "mapsUrl": "https://maps.google.com/?q=Jahn-Sportpark+Berlin", "kapazitaet": 2000, "kunstrasen": false, "flutlicht": true},
    "kontakt": {"website": "https://www.sv-empor-berlin.de"},
    "socialMedia": {"instagram": "https://instagram.com/sv_empor_berlin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'fortuna-biesdorf',
  'Fortuna Biesdorf',
  'Fortuna',
  'fortuna-biesdorf',
  'berlin-liga',
  'Marzahn-Hellersdorf',
  1905,
  '#006B3F',
  '#FFFFFF',
  'Der VfB Fortuna Biesdorf 1905 aus Marzahn-Hellersdorf ist einer der traditionsreichen Vereine im Berliner Osten. An der Grabensprungarena spielt Fortuna in Grün-Weiß und steht für beständigen Amateurfußball.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Grabensprungarena", "adresse": "Grabensprung 56", "plz": "12683", "bezirk": "Marzahn-Hellersdorf", "mapsUrl": "https://maps.google.com/?q=Grabensprungarena+Berlin+Biesdorf", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://www.fortuna-biesdorf.de"},
    "socialMedia": {"instagram": "https://instagram.com/fortunabiesdorf"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'polar-pinguin',
  'Polar Pinguin',
  'Polar',
  'polar-pinguin',
  'berlin-liga',
  'Tempelhof-Schöneberg',
  1990,
  '#000000',
  '#FFFFFF',
  'Polar Pinguin Berlin – gegründet 1990 als Thekenmannschaft aus der Schöneberger Punkszene, alle Spieler unbezahlt. Was als Spaßprojekt begann, hat sich bis in die Berlin-Liga hochgearbeitet. An der PolArena in Tempelhof lebt der Underdog-Spirit.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "PolArena", "adresse": "Markgrafenstraße 19-24", "plz": "12105", "bezirk": "Tempelhof-Schöneberg", "mapsUrl": "https://maps.google.com/?q=PolArena+Berlin+Tempelhof", "kapazitaet": 500, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://www.polar-pinguin.berlin"},
    "socialMedia": {"instagram": "https://instagram.com/polar_pinguin"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'ssc-suedwest',
  'SSC Südwest',
  'Südwest',
  'ssc-suedwest',
  'berlin-liga',
  'Steglitz-Zehlendorf',
  1947,
  '#C8102E',
  '#FFFFFF',
  'Der Steglitzer Sport Club Südwest 1947, als Aufsteiger in der Berlin-Liga 2025/26, spielt an der Sochos-Sportanlage in Steglitz. In Rot-Weiß vertritt der Verein den Bezirk Steglitz-Zehlendorf.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Sochos-Sportanlage", "adresse": "Lessingstraße 5-8", "plz": "12169", "bezirk": "Steglitz-Zehlendorf", "mapsUrl": "https://maps.google.com/?q=Sochos-Sportanlage+Berlin+Steglitz", "kapazitaet": 1000, "kunstrasen": false, "flutlicht": false},
    "kontakt": {"website": "https://sscsuedwest.de"},
    "socialMedia": {"instagram": "https://instagram.com/official.ssc_suedwest"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

-- ============================================
-- Türkiyemspor – jetzt Landesliga Staffel 2
-- ============================================

INSERT INTO clubs (id, name, short_name, slug, league_id, bezirk, founded_year, primary_color, secondary_color, description, members, teams_count, profile)
VALUES (
  'tuerkiyemspor',
  'Türkiyemspor Berlin',
  'Türkiyem',
  'tuerkiyemspor-berlin',
  'landesliga-2',
  'Friedrichshain-Kreuzberg',
  1978,
  '#E30A17',
  '#FFFFFF',
  'Türkiyemspor Berlin wurde 1978 von türkischen Einwanderern in Kreuzberg gegründet und ist weit mehr als ein Fußballverein. Als Symbol für Integration und kulturelle Vielfalt hat der Klub Berliner Sportgeschichte geschrieben. In den 2000ern spielte Türkiyemspor in der Oberliga und ist bis heute eine feste Größe im Berliner Amateurfußball.',
  NULL,
  NULL,
  '{
    "sportstaette": {"name": "Katzbachstadion", "adresse": "Dudenstraße 40", "plz": "10965", "bezirk": "Friedrichshain-Kreuzberg", "mapsUrl": "https://maps.google.com/?q=Katzbachstadion+Berlin", "kapazitaet": 3000, "kunstrasen": true, "flutlicht": true},
    "kontakt": {"telefon": "030 6915 2230", "email": "info@tuerkiyemspor.de", "website": "https://www.tuerkiyemspor.de"},
    "socialMedia": {"instagram": "https://instagram.com/tuerkiyemspor", "facebook": "https://facebook.com/tuerkiyemspor"},
    "ansprechpartner": [],
    "trainingszeiten": []
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, short_name = EXCLUDED.short_name, slug = EXCLUDED.slug,
  league_id = EXCLUDED.league_id, bezirk = EXCLUDED.bezirk, founded_year = EXCLUDED.founded_year,
  primary_color = EXCLUDED.primary_color, secondary_color = EXCLUDED.secondary_color,
  description = EXCLUDED.description, members = EXCLUDED.members, teams_count = EXCLUDED.teams_count,
  profile = EXCLUDED.profile, updated_at = now();

-- ============================================
-- Veraltete Einträge entfernen
-- ============================================

-- Wacker Nordhausen ist kein Berliner Verein
DELETE FROM clubs WHERE id = 'wacker';

-- Union II spielt nicht mehr in Regionalliga Nordost 2025/26
DELETE FROM clubs WHERE id = 'union2';
