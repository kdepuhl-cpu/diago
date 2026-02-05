# CLAUDE.md – DIAGO

## Projektübersicht
DIAGO ist eine News-PWA für Berliner Amateurfußball-Fans. Inspiriert von der "Fußball-Woche", einer Berliner Print-Institution die 2024 eingestellt wurde.

**Ziel:** Lokale Fußball-News aus verschiedenen Ligen an einem Ort – von Bundesliga bis Kreisliga.

**Design-Vorbild:** The Athletic

---

## Tech-Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript
- **PWA:** Manifest + Install Prompt
- **Deployment:** Netlify (Static Export)

---

## Deployment
- **GitHub:** `kdepuhl-cpu/diago`
- **Live:** https://diagonista.netlify.app/
- **Branch `main`:** Auto-Deploy bei Push
- **Branch `feature/liga-navigation`:** Neue Features (nicht live)

---

## Design-System

### Farben
| Name | Hex | Verwendung |
|------|-----|------------|
| Forest Green | `#044110` | Primary, aktive Tabs, Buttons |
| Electric Orange | `#FC401D` | Akzente, Dachzeilen, CTAs, Progress Bar |
| Mint Green | `#D0FDDA` | Subtle Backgrounds, Hover |
| Off White | `#FAFAFA` | Page Background (Light Mode) |
| Off Black | `#1F1F1F` | Header, Text, Footer |

### Dark Mode
- Aktiviert via `darkMode: "class"` in Tailwind
- Toggle im Header (Sonne/Mond Icon)
- Speicherung in localStorage + System-Präferenz

### Typografie
| Verwendung | Font | Quelle |
|------------|------|--------|
| Headlines | Manuka Bold | `public/fonts/manuka-bold.woff2` |
| Subheadings | Manrope Bold | Google Fonts |
| Body | Manrope Regular | Google Fonts |

### Assets
```
public/
├── fonts/
│   ├── Manuka-Bold.otf
│   └── manuka-bold.woff2
├── icons/
│   ├── diago_logo_rgb_white.svg (Header)
│   ├── diago_logo_rgb_forest-green.svg
│   ├── diago_logo_rgb_forest-green_icon.svg
│   └── ...
└── manifest.json (PWA)
```

---

## Projektstruktur
```
src/
├── app/
│   ├── layout.tsx (ToastProvider, PWAInstallPrompt)
│   ├── page.tsx (Startseite mit LiveTicker, VideoReels)
│   ├── liga/[slug]/page.tsx (Liga-Seiten mit Tabelle)
│   ├── artikel/[slug]/page.tsx (Artikel-Detail)
│   ├── gespeichert/page.tsx (Bookmarks)
│   ├── offline/page.tsx (PWA Offline)
│   └── tag/[slug]/page.tsx (Tag-Seiten)
├── components/
│   ├── navigation/
│   │   ├── Header.tsx (Herren|Frauen|Pokal Dropdowns)
│   │   └── Footer.tsx (Kurzpass Newsletter)
│   ├── artikel/
│   │   ├── HeroSection.tsx (Hero + Sidebar Grid)
│   │   ├── MostPopular.tsx (Meistgelesen)
│   │   ├── ReadingProgressBar.tsx
│   │   └── MarkAsReadButton.tsx
│   ├── LiveTicker.tsx (Ergebnis-Widget)
│   ├── LeagueResults.tsx (Spieltag-Ansicht)
│   ├── VideoReels.tsx (Video-Karussell)
│   ├── VideoModal.tsx (Video-Player Modal)
│   └── ui/
│       ├── Toast.tsx (ToastProvider)
│       ├── SearchOverlay.tsx (Cmd+K)
│       ├── BookmarkButton.tsx
│       ├── ShareButton.tsx
│       ├── NewBadge.tsx ("Neu" für <24h)
│       ├── PWAInstallPrompt.tsx
│       ├── ScrollToTop.tsx
│       ├── ReadingStats.tsx
│       ├── CategoryFilter.tsx
│       └── Skeleton.tsx
├── hooks/
│   ├── useReadArticles.ts (localStorage)
│   ├── useBookmarks.ts (localStorage)
│   ├── useTheme.ts (Dark Mode)
│   └── useKeyboardNavigation.ts (j/k)
├── lib/
│   ├── types.ts (Artikel, Liga, etc.)
│   ├── data.ts (Artikel-Daten)
│   ├── leagues.ts (25+ Ligen mit Staffeln)
│   ├── gamification.ts (Punkte-System)
│   └── mock/
│       ├── matches.ts (Ergebnis-Daten)
│       └── videos.ts (Video-Daten)
└── styles/
    └── globals.css
```

---

## Ligen-System (`lib/leagues.ts`)

### Kategorien
- **Herren:** Bundesliga → 2. BL → 3. Liga → RL Nordost → OL Nord/Süd → Berlin-Liga → Landesliga → Bezirksliga → Kreisliga A/B/C
- **Frauen:** Frauen-BL → 2. F-BL → F-RL Nordost → F-Berlin-Liga → F-Landesliga → F-Bezirksliga
- **Pokal:** DFB-Pokal, DFB-Pokal Frauen, Berliner Pilsner-Pokal, Polytan-Pokal

### Staffeln
Ligen mit mehreren Staffeln (Landesliga, Bezirksliga, Kreisliga) haben Tabs zur Auswahl.

### Helper-Funktionen
- `getLeaguesByCategory(category)` – Ligen nach Kategorie
- `getLeagueBySlug(slug)` – Liga per Slug finden
- `getStaffelBySlug(slug)` – Staffel per Slug finden
- `getAllLeagueSlugs()` – Alle Slugs für Static Params

---

## Features

### Implementiert ✅

**Core:**
- [x] Startseite mit Hero + Sidebar Layout
- [x] Artikel-Detailseite (Athletic-Style)
- [x] Reading Progress Bar
- [x] Liga-Seiten mit Tabelle & Spielplan
- [x] Liga-Navigation (Herren|Frauen|Pokal Dropdowns)

**Engagement:**
- [x] Gelesen-Tracking (localStorage)
- [x] Gelesen-Badge (Haken nach Titel)
- [x] Gamification (Punkte & Level)
- [x] Meistgelesen-Sektion
- [x] Neu-Badge (<24h Artikel)

**User Features:**
- [x] Dark Mode (Toggle + System-Präferenz)
- [x] Bookmarks (Speichern + /gespeichert Seite)
- [x] Suche (Cmd+K Overlay)
- [x] Share Button (Native + Clipboard Fallback)
- [x] Keyboard Navigation (j/k für Artikel)

**Media:**
- [x] Live-Ticker (horizontal scrollbar)
- [x] Video-Reels Karussell (9:16)
- [x] Video-Modal mit Keyboard-Nav

**PWA:**
- [x] Manifest.json
- [x] Install Prompt
- [x] Offline-Seite

**UI:**
- [x] Toast-Benachrichtigungen
- [x] Scroll-to-Top Button
- [x] Skeleton Loading States
- [x] Mobile Menu (Accordion)

### Geplant 📋

**Phase 3: User & Personalisierung**
- [ ] User-Login / Profile
- [ ] "Mein Verein" Personalisierung
- [ ] Leaderboard (Top-Leser)
- [ ] Streaks (Tägliches Lesen)
- [ ] Push-Notifications

**Phase 4: Live-Daten**
- [ ] Echte Tabellen-API
- [ ] Echte Ergebnis-API
- [ ] Live-Ticker mit WebSocket
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
- localStorage: `diago-user-progress`, `diago-read-articles`, `diago-bookmarks`

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
- Dark Mode: immer `dark:` Varianten hinzufügen
- Keine separaten CSS-Dateien außer globals.css

### Git
- Kleine, fokussierte Commits
- Commit-Messages auf Deutsch
- Format: `feat:`, `fix:`, `chore:`
- Feature-Branches für größere Changes

---

## Mock-Daten

### Berliner Vereine (`lib/mock/matches.ts`)
BAK, Tennis Borussia, Türkiyemspor, VSG Altglienicke, BFC Dynamo, Hertha Zehlendorf, Viktoria Berlin, Croatia Berlin, SC Staaken, Füchse Berlin Reinickendorf, Sparta Lichtenberg, Stern 1900

### Video-Plattformen (`lib/mock/videos.ts`)
Instagram Reels, TikTok, YouTube Shorts

---

## Bekannte Issues
- [ ] PWA braucht noch PNG Icons (192x192, 512x512)
- [ ] Dark Mode Kontrast teilweise noch nicht optimal
- [ ] Nur SVG Icons vorhanden

---

## Kontakt / Kontext
Bei Unklarheiten: Nachfragen! Lieber einmal mehr fragen als falsch bauen.
