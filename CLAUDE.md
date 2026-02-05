# CLAUDE.md – DIAGO

## Projektübersicht
DIAGO ist eine News-PWA für Berliner Amateurfußball-Fans. Inspiriert von der "Fußball-Woche", einer Berliner Print-Institution die 2024 eingestellt wurde.

**Ziel:** Lokale Fußball-News aus verschiedenen Ligen an einem Ort – von Bundesliga bis Kreisliga.

**Design-Vorbild:** The Athletic (ab jetzt der Maßstab!)

---

## Tech-Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript
- **PWA:** next-pwa (später)
- **Deployment:** Vercel (geplant)

---

## Design-System

### Farben
| Name | Hex | Verwendung |
|------|-----|------------|
| Forest Green | `#044110` | Primary, Header (alt), aktive Tabs |
| Electric Orange | `#FC401D` | Akzente, Dachzeilen, CTAs, Reading Progress Bar |
| Mint Green | `#D0FDDA` | Subtle Backgrounds, Hover |
| Off White | `#FAFAFA` | Page Background |
| Off Black | `#1F1F1F` | Header, Text, Footer |

### Typografie
| Verwendung | Font | Datei |
|------------|------|-------|
| Headlines | Manuka Bold | `public/fonts/manuka-bold.woff2` |
| Subheadings | Manrope Bold | Google Fonts |
| Body | Manrope Regular | Google Fonts |

### Assets
```
public/
├── fonts/
│   ├── Manuka-Bold.otf
│   └── manuka-bold.woff2
└── icons/
    ├── diago_logo_rgb_forest-green.svg (Wortmarke)
    ├── diago_logo_rgb_forest-green_icon.svg (Icon)
    ├── diago_logo_rgb_black.svg
    ├── diago_logo_rgb_black_icon.svg
    └── diago_logo_rgb_white_icon.svg
```

---

## Design-Referenz: The Athletic

### Header (Dark, Athletic-Style)
- Schwarzer Header (`bg-off-black`)
- Burger-Menu links
- Logo daneben
- Ligen horizontal mit Hover-States (`border-b-2` bei Hover)
- "•••" für mehr Ligen (Dropdown)
- Ligen-Abkürzungen: Bundesliga, Frauen-BL, 2. BL, 3. Liga, Regionalliga, Oberliga, Berlin

### Startseite Layout (Hero + Sidebar)
- Section pro Liga (Bundesliga, 2. Bundesliga, etc.)
- Hero-Artikel links (2 Spalten): großes Bild (16:9), Headline, Teaser, Autor
- Sidebar rechts (1 Spalte): 4 Artikel mit Thumbnails (150x100), Headlines, Autor
- Vertikale Border zwischen Hero und Sidebar
- Horizontale Border zwischen Sections
- Thumbnails und Sidebar-Content bündig mit Hero-Content abschließend

### Artikel-Detailseite (Athletic-Style)
- Hero-Bild fullwidth (70vh)
- Bildunterschrift zentriert + Fotograf-Credit
- Dachzeile (uppercase, zentriert)
- Headline (Manuka, sehr groß, zentriert)
- Autor-Bereich (Profilbild + Name + Datum)
- Action-Buttons (Share, Kommentare, Save)
- Artikel-Body (max-w-2xl, ~680px)
- Zwischenbilder (fullwidth)
- Autor-Box am Ende
- Tags
- "Your Next Read" Section

---

## Projektstruktur
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Startseite)
│   ├── liga/[slug]/page.tsx
│   └── artikel/[slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx (Dark, Athletic-Style)
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── artikel/
│   │   ├── HeroSection.tsx (Hero + Sidebar Grid)
│   │   ├── ReadingProgressBar.tsx
│   │   └── GelesenButton.tsx
│   └── ui/
│       ├── Badge.tsx
│       └── Button.tsx
├── lib/
│   ├── types.ts
│   ├── data.ts (Artikel-Daten mit Unsplash-Bildern)
│   ├── gamification.ts (Punkte-System)
│   └── utils.ts
└── styles/
    └── globals.css
```

---

## Ligen (MVP Scope)
1. **Bundesliga** (`bundesliga`)
2. **Frauen-Bundesliga** (`frauen-bundesliga`)
3. **2. Bundesliga** (`2-bundesliga`)
4. **3. Liga** (`3-liga`)
5. **Regionalliga Nordost** (`regionalliga`)
6. **Oberliga NOFV Nord** (`oberliga`)
7. **Berlin-Liga** (`berlin-liga`)
8. **DFB-Pokal** (`dfb-pokal`) – im "•••" Dropdown

---

## Feature-Roadmap

### Phase 1: MVP ✅
- [x] Projekt-Setup (Next.js + Tailwind)
- [x] Design-System konfiguriert
- [x] Artikel-Datenmodell
- [x] Header (Dark, Athletic-Style)
- [x] Startseite: Hero + Sidebar Layout
- [x] Footer
- [x] Artikel-Detailseite
- [x] Reading Progress Bar
- [x] Gamification: Punkte-System + "Gelesen"-Button

### Phase 2: Content & Navigation
- [ ] Liga-Unterseiten (`/liga/bundesliga`)
- [ ] Liga-Subnavigation (Home, Ergebnisse, Tabelle, Spieltag)
- [ ] Vereins-Logos im Liga-Dropdown
- [ ] "Most Popular" Section
- [ ] Mobile Ansicht optimieren

### Phase 3: Engagement & User
- [ ] User-Login / Profile
- [ ] "Mein Verein" Personalisierung
- [ ] Leaderboard (Top-Leser)
- [ ] Streaks (Tägliches Lesen)
- [ ] Push-Notifications
- [ ] PWA (installierbar)

### Phase 4: Erweiterungen
- [ ] Short-Video Section
- [ ] Live-Ticker
- [ ] Tabellen & Ergebnisse
- [ ] Kommentar-System

---

## Gamification-System

### Punkte
- 10 Punkte pro gelesenem Artikel

### Level
| Level | Punkte | Name |
|-------|--------|------|
| 1 | 0-50 | Kreisliga-Fan |
| 2 | 51-150 | Bezirksliga-Kenner |
| 3 | 151-300 | Landesliga-Experte |
| 4 | 301-500 | Oberliga-Veteran |
| 5 | 501+ | Bundesliga-Legende |

### Speicherung
- Aktuell: localStorage
- Später: User-Account/Database
- Schema: `{ points: number, readArticles: string[], level: string }`

---

## Coding-Regeln

### Sprache
- **Code:** Englisch (Variablen, Funktionen)
- **Content/UI:** Deutsch (Texte, Labels)

### Komponenten
- Functional Components mit TypeScript
- Props immer typisieren
- Eine Komponente pro Datei
- Mobile-first entwickeln

### Styling
- Tailwind CSS Utility Classes
- Keine separaten CSS-Dateien außer globals.css
- Design-Tokens aus Tailwind Config nutzen

### Git
- Kleine, fokussierte Commits
- Commit-Messages auf Deutsch
- Format: `feat: Artikel-Liste hinzugefügt`

---

## Wichtige Design-Entscheidungen
1. **The Athletic als Maßstab** – Layout, Proportionen, Abstände
2. **Dark Header** – Schwarzer Header mit weißem Logo
3. **Hero + Sidebar Grid** – 2:1 Aufteilung, bündig abschließend
4. **Große Sidebar-Thumbnails** – 150x100px, prominent
5. **Reading Progress Bar** – Electric Orange, oben fixiert
6. **Gamification** – Punkte-System für Engagement

---

## Placeholder-Bilder (Unsplash)
```
https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800 (Stadion)
https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800 (Action)
https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800 (Spieler)
https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800 (Fans)
```

---

## Kontakt / Kontext
Bei Unklarheiten: Nachfragen! Lieber einmal mehr fragen als falsch bauen.
