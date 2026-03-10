# Fussballwoche — Feature-Übersicht (Stand: März 2026)

**Live unter: fuwo.netlify.app**

## Einordnung

Das ist eine **erste Testversion** — ein funktionaler Prototyp um zu zeigen:
- Was ist technisch möglich?
- Wie viel Aufwand steckt dahinter?
- Was brauchen wir wirklich — und was nicht?

**Design-Anpassungen kommen später** — erst wenn das Layout ggf. überarbeitet wurde und eine angepasste CI von Hempel steht. Aktuell geht es um Funktionalität, nicht um Optik.

---

## Was die Plattform abbildet

### 1. Ligen & Daten
- 30+ Ligen — von Bundesliga bis Kreisliga A/B/C, Frauen, Pokal, Jugend
- Liga-Seiten mit Tabellen-Platzhalter und Spieltag-Ansicht
- *Ausbau: Echte Tabellen-/Ergebnis-API (z.B. fussball.de-Anbindung)*

### 2. Ergebnis-Dienste
- Topspiele-Widget auf der Startseite (Live-Ticker-Stil)
- Spieltag-Ergebnisse pro Liga mit Vereinslogos
- *Ausbau: Live-Daten statt Mock-Daten, Push-Notifications*

### 3. Vereins-Websites
- Vereinsprofile mit Steckbrief (Kontakt, Trainingszeiten, Sportstätten)
- Vereins-Übersichtsseite
- *Ausbau: Vollständige Vereins-Datenbank mit echten Daten*

### 4. Partnereinbindung
- Struktur für Sponsoring/Partner-Integration angelegt
- Werbeflächen und Kategorie-Sponsoring technisch vorbereitet
- *Ausbau: Partner-Logos, Branded Content, Kooperationsseiten*

### 5. Job-Markt
- Job-Listings für Berliner Fußball (Trainer, Spieler, Ehrenamt)
- Kategorie-Filter, Detail-Seiten, Job-Highlights auf Startseite
- *Ausbau: Vereins-seitige Job-Erstellung, Bewerbungsflow*

### 6. Tipp-Spiele
- 1-X-2-Voting pro Spiel
- Prozentanzeige nach Tipp-Abgabe
- Scoreboard / Rangliste
- *Ausbau: Wöchentliche Spieltage, Prämien, Streaks*

### 7. Lese-Experience / Content
- Artikel im Athletic-Stil (Hero, Sidebar, Tags)
- Reading Progress Bar, Lesezeit-Anzeige
- Reader Score (Gamification: Punkte + Level fürs Lesen)
- Bookmarks, Suche, Dark Mode
- E-Paper mit digitalem Blättererlebnis + Archiv
- *Ausbau: Artikel-CMS (statt Mock-Daten), Newsletter*

### 8. User-System
- Login/Register, Onboarding (Name, Lieblingsvereine, Bezirk)
- Personalisierung ("Mein Verein" auf Startseite)
- Profil mit Reader-Level
- Admin-Dashboard (Artikel-, Vereins-, Jobs-CRUD)

---

## Komplexität & Aufwand

**Die Komplexität steigt** — Echtzeit-Spieldaten, wechselnde Inhalte, viele gleichzeitige Nutzer und Bezahlsysteme erfordern eine robustere Infrastruktur als der aktuelle Prototyp.

**Der Entwicklungsaufwand dagegen sinkt massiv.** Durch KI-gestützte Entwicklungstools wird der Aufwand um ein Vielfaches reduziert — dieser Prototyp ist ein gutes Beispiel dafür. Es ist davon auszugehen, dass in den nächsten 6 Monaten weitere, schnellere LLM-Modelle erscheinen, die uns ermöglichen, das System stetig und kosteneffizient weiterzuentwickeln. Wir schaffen uns damit jetzt eine ideale Ausgangslage.

---

## Zusammenfassung

Alle Module stehen funktional. Inhalte sind exemplarisch. Design folgt nach CI-Abstimmung mit Hempel. Jetzt geht es darum, gemeinsam zu bewerten: Was davon brauchen wir, was priorisieren wir, was streichen wir?
