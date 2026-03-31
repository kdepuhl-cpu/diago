"use client";

import Link from "next/link";

// Söhne font family (Klim Type Foundry)
// Söhne → Body/UI
// Söhne Mono → Data/Code
// Söhne Schmal → Headlines

const COLORS = {
  neonGreen: "#28D200",
  darkGreen: "#144B23",
  forestOld: "#044110",
  orangeOld: "#FC401D",
  black: "#000000",
  white: "#FFFFFF",
  offWhite: "#FAFAFA",
  gray100: "#F3F4F6",
  gray300: "#D1D5DB",
  gray500: "#6B7280",
  gray700: "#374151",
  gray900: "#111827",
};

const LIGA_TAGS = [
  "Regionalliga",
  "Berlin-Liga",
  "Frauen",
  "Berliner Fussball",
  "Oberliga",
  "Jugend",
];

const MOCK_ARTICLES = [
  {
    tag: "Berlin-Liga",
    title: "Stern 1900 empfängt Empor Berlin zum Spitzenspiel",
    subtitle: "Aufstiegsrennen spitzt sich zu — Stern braucht drei Punkte",
    author: "Max Mustermann",
    date: "11. März 2026",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop",
  },
  {
    tag: "Frauen",
    title: "Viktoria Berlin jetzt allein davon. Der Negativlauf des 1. FC Union Berlin",
    subtitle: "Drei Niederlagen in Folge — was ist los bei Union?",
    author: "Lisa Schmidt",
    date: "10. März 2026",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
  },
  {
    tag: "Regionalliga",
    title: "Berliner AK präsentiert Jeffrey Seitz als neuen Cheftrainer",
    subtitle: "Dramatische Lage in Britz — der BAK sucht den Neuanfang",
    author: "Tino Loest",
    date: "9. März 2026",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=600&h=400&fit=crop",
  },
];

function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-20 h-20 rounded-xl shadow-md border border-black/10"
        style={{ backgroundColor: color }}
      />
      <span style={{ fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace", fontSize: "0.7rem", color: COLORS.gray500 }}>
        {hex}
      </span>
      <span style={{ fontFamily: "'Soehne', 'Inter', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
        {name}
      </span>
    </div>
  );
}

function LigaTag({ label, variant = "light" }: { label: string; variant?: "light" | "dark" }) {
  const isLight = variant === "light";
  return (
    <span
      style={{
        fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        background: isLight ? COLORS.darkGreen : COLORS.neonGreen,
        color: isLight ? COLORS.white : COLORS.black,
        padding: "3px 8px",
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

function ArticleCard({ article, variant = "light" }: { article: typeof MOCK_ARTICLES[0]; variant?: "light" | "dark" }) {
  const isLight = variant === "light";
  return (
    <div style={{ fontFamily: "'Soehne', 'Inter', sans-serif" }}>
      <div className="relative overflow-hidden rounded-sm mb-3" style={{ aspectRatio: "3/2" }}>
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mb-2">
        <LigaTag label={article.tag} variant={variant} />
      </div>
      <h3
        style={{
          fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "1.4rem",
          lineHeight: 1.15,
          color: isLight ? COLORS.black : COLORS.white,
          marginBottom: "0.4rem",
        }}
      >
        {article.title}
      </h3>
      <p style={{ fontSize: "0.9rem", color: isLight ? COLORS.gray500 : "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: "0.5rem" }}>
        {article.subtitle}
      </p>
      <span
        style={{
          fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
          fontSize: "0.7rem",
          color: isLight ? COLORS.gray500 : "rgba(255,255,255,0.4)",
        }}
      >
        {article.author} — {article.date}
      </span>
    </div>
  );
}

function SonderausgabeCard({ article }: { article: typeof MOCK_ARTICLES[0] }) {
  return (
    <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
        }}
      />
      {/* Masthead */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/fuwo_white.svg" alt="FuWo" style={{ height: 24 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/fussball-woche_white.svg" alt="Fußball-Woche" style={{ height: 12 }} />
      </div>
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span
          style={{
            fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: COLORS.gray300,
            letterSpacing: "0.02em",
          }}
        >
          {article.tag}
        </span>
        <h3
          style={{
            fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "1.6rem",
            lineHeight: 1.1,
            color: COLORS.white,
            marginTop: "0.25rem",
          }}
        >
          {article.title}
        </h3>
        {/* Liga tags bar */}
        <div className="flex gap-2 mt-3">
          {LIGA_TAGS.slice(0, 4).map((tag) => (
            <LigaTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignPreview() {
  return (
    <>
      {/* Google Fonts for proxy */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={{ fontFamily: "'Soehne', 'Inter', sans-serif", background: COLORS.offWhite, minHeight: "100vh" }}>
        {/* Navigation bar */}
        <Link
          href="/"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 100,
            fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            background: COLORS.gray900,
            color: COLORS.gray300,
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Zurueck zur App
        </Link>

        {/* Header Preview */}
        <header
          style={{
            background: COLORS.darkGreen,
            color: COLORS.white,
            padding: "0 1.5rem",
            height: "48px",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Burger */}
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/fuwo_white.svg" alt="FuWo" style={{ height: 20 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/fussball-woche_white.svg"
            alt="Fußball-Woche"
            style={{ height: 16, opacity: 0.6, display: "none" }}
            className="sm:inline"
          />

          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.2)", margin: "0 0.5rem" }} />

          {/* Nav items */}
          {["Herren", "Frauen", "Jugend", "Pokal"].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Soehne', 'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                display: "none",
              }}
              className="md:inline"
            >
              {item}
            </span>
          ))}

          <div style={{ flex: 1 }} />

          {/* Search + User */}
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </header>

        {/* Section: Intro */}
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.darkGreen,
              }}
            >
              Design Preview
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 0.95,
              color: COLORS.black,
              marginBottom: "1rem",
            }}
          >
            FuWo Redesign
          </h1>
          <p style={{ fontSize: "1.1rem", color: COLORS.gray500, maxWidth: 640, lineHeight: 1.6 }}>
            Design-System Preview basierend auf Peer Hempels Redesign-Deck.
            Proxy-Fonts: Inter (Söhne), JetBrains Mono (Söhne Mono), Barlow Condensed (Söhne Schmal).
          </p>
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem 1.25rem",
              background: "#FEF3C7",
              borderLeft: `3px solid #F59E0B`,
              borderRadius: "4px",
              fontSize: "0.85rem",
              color: COLORS.gray700,
              lineHeight: 1.6,
            }}
          >
            <strong>Konzept:</strong> Light Mode nutzt dunkleres Grün als Primary — kein Neon, um Abstand zu fussball.de zu halten.
            Dark Mode nutzt Neon-Grün als Akzent auf dunklem Hintergrund.
          </div>
        </div>

        {/* Section: Farbpalette */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "1.8rem",
              color: COLORS.black,
              marginBottom: "0.5rem",
            }}
          >
            Farbpalette
          </h2>

          <p
            style={{
              fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COLORS.darkGreen,
              marginBottom: "0.75rem",
              marginTop: "1.5rem",
            }}
          >
            Light Mode — Primary Colors
          </p>
          <div className="flex flex-wrap gap-6 mb-8">
            <ColorSwatch color={COLORS.darkGreen} name="Primary Green" hex="#144B23" />
            <ColorSwatch color={COLORS.black} name="Text" hex="#000000" />
            <ColorSwatch color={COLORS.offWhite} name="Background" hex="#FAFAFA" />
            <ColorSwatch color={COLORS.white} name="Cards" hex="#FFFFFF" />
          </div>

          <p
            style={{
              fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COLORS.neonGreen,
              marginBottom: "0.75rem",
            }}
          >
            Dark Mode — Accent Colors
          </p>
          <div className="flex flex-wrap gap-6 mb-8">
            <ColorSwatch color={COLORS.neonGreen} name="Accent Neon" hex="#28D200" />
            <ColorSwatch color={COLORS.darkGreen} name="Background" hex="#144B23" />
            <ColorSwatch color={COLORS.gray900} name="Deep BG" hex="#111827" />
            <ColorSwatch color={COLORS.white} name="Text" hex="#FFFFFF" />
          </div>

          <p
            style={{
              fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COLORS.gray500,
              marginBottom: "0.75rem",
            }}
          >
            Alt (aktuell in der App)
          </p>
          <div className="flex flex-wrap gap-6 mb-4">
            <ColorSwatch color={COLORS.forestOld} name="Forest Green" hex="#044110" />
            <ColorSwatch color={COLORS.orangeOld} name="Electric Orange" hex="#FC401D" />
            <ColorSwatch color="#D0FDDA" name="Mint" hex="#D0FDDA" />
            <ColorSwatch color={COLORS.offWhite} name="Off-White" hex="#FAFAFA" />
          </div>
        </section>

        <hr style={{ maxWidth: 960, margin: "0 auto", border: "none", borderTop: `1px solid ${COLORS.gray300}` }} />

        {/* Section: Typografie */}
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "1.8rem",
              color: COLORS.black,
              marginBottom: "1.5rem",
            }}
          >
            Typografie
          </h2>

          <div className="mb-8">
            <p
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.darkGreen,
                marginBottom: "0.5rem",
              }}
            >
              Söhne Schmal → Barlow Condensed (Proxy)
            </p>
            <p
              style={{
                fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontStyle: "italic",
                fontSize: "3.5rem",
                lineHeight: 0.95,
                color: COLORS.black,
              }}
            >
              Der pure Wahnsinn<br />Eiskalt vor dem Tor
            </p>
          </div>

          <div className="mb-8">
            <p
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.darkGreen,
                marginBottom: "0.5rem",
              }}
            >
              Söhne → Inter (Proxy)
            </p>
            <p style={{ fontFamily: "'Soehne', 'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: COLORS.gray700, maxWidth: 600 }}>
              Seit über 103 Jahren begleitet die Fussball-Woche den Berliner Amateurfußball.
              Kaum ein anderes Medium ist so eng mit der lokalen Fußballkultur verbunden.
              Generationen von Spielerinnen, Spielern, Trainern und Fans sind mit ihr aufgewachsen.
            </p>
          </div>

          <div className="mb-4">
            <p
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COLORS.darkGreen,
                marginBottom: "0.5rem",
              }}
            >
              Söhne Mono → JetBrains Mono (Proxy)
            </p>
            <p style={{ fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace", fontSize: "0.85rem", color: COLORS.gray700 }}>
              Montag, 13. Oktober 26 — 103. Jahrgang — Nr. 1 — 2,50 EUR
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* LIGHT MODE — Full Component Preview                        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section style={{ background: COLORS.offWhite, padding: "3rem 0", marginTop: "2rem" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.darkGreen }} />
              <h2
                style={{
                  fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "2rem",
                  color: COLORS.black,
                }}
              >
                Light Mode
              </h2>
              <span style={{ fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace", fontSize: "0.7rem", color: COLORS.gray500 }}>
                Primary: Dark Green #144B23 · Kein Neon
              </span>
            </div>

            {/* Light Mode: Header */}
            <div
              style={{
                background: COLORS.white,
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <header
                style={{
                  background: COLORS.darkGreen,
                  color: COLORS.white,
                  padding: "0 1.25rem",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/fuwo_white.svg" alt="FuWo" style={{ height: 20 }} />
                <div style={{ flex: 1 }} />
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </header>

              {/* Light Mode: Content area */}
              <div style={{ padding: "1.5rem" }}>
                {/* Liga Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {LIGA_TAGS.map((tag) => (
                    <LigaTag key={tag} label={tag} variant="light" />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      background: COLORS.darkGreen,
                      color: COLORS.white,
                      border: "none",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Jetzt lesen
                  </button>
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      background: "transparent",
                      color: COLORS.darkGreen,
                      border: `2px solid ${COLORS.darkGreen}`,
                      padding: "0.5rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Mehr erfahren
                  </button>
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      background: COLORS.black,
                      color: COLORS.white,
                      border: "none",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Abonnieren
                  </button>
                </div>

                {/* Article Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_ARTICLES.map((article, i) => (
                    <ArticleCard key={i} article={article} variant="light" />
                  ))}
                </div>
              </div>
            </div>

            {/* Light Mode: Sonderausgabe */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ maxWidth: 720 }}>
              {MOCK_ARTICLES.map((article, i) => (
                <SonderausgabeCard key={i} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* DARK MODE — Full Component Preview                         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <section style={{ background: COLORS.gray900, padding: "3rem 0" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: COLORS.neonGreen, boxShadow: `0 0 8px ${COLORS.neonGreen}` }} />
              <h2
                style={{
                  fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "2rem",
                  color: COLORS.white,
                }}
              >
                Dark Mode
              </h2>
              <span style={{ fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>
                Accent: Neon Green #28D200
              </span>
            </div>

            {/* Dark Mode: Header */}
            <div
              style={{
                background: COLORS.darkGreen,
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "2rem",
              }}
            >
              <header
                style={{
                  background: "rgba(0,0,0,0.3)",
                  color: COLORS.white,
                  padding: "0 1.25rem",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/fuwo_white.svg" alt="FuWo" style={{ height: 20 }} />
                <div style={{ flex: 1 }} />
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </header>

              {/* Dark Mode: Content area */}
              <div style={{ padding: "1.5rem" }}>
                {/* Liga Tags — Neon! */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {LIGA_TAGS.map((tag) => (
                    <LigaTag key={tag} label={tag} variant="dark" />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      background: COLORS.neonGreen,
                      color: COLORS.darkGreen,
                      border: "none",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Jetzt lesen
                  </button>
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      background: "transparent",
                      color: COLORS.neonGreen,
                      border: `2px solid ${COLORS.neonGreen}`,
                      padding: "0.5rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Mehr erfahren
                  </button>
                  <button
                    style={{
                      fontFamily: "'Soehne', 'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      background: "rgba(255,255,255,0.1)",
                      color: COLORS.white,
                      border: "none",
                      padding: "0.6rem 1.25rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Abonnieren
                  </button>
                </div>

                {/* Article Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_ARTICLES.map((article, i) => (
                    <ArticleCard key={i} article={article} variant="dark" />
                  ))}
                </div>
              </div>
            </div>

            {/* Dark Mode: Typo Sample */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                style={{
                  fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: COLORS.neonGreen,
                  marginBottom: "0.5rem",
                }}
              >
                Headline im Dark Mode
              </p>
              <p
                style={{
                  fontFamily: "'Soehne Schmal', 'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: "3rem",
                  lineHeight: 0.95,
                  color: COLORS.white,
                  marginBottom: "1rem",
                }}
              >
                Aufstieg! Empor Berlin<br />schreibt Geschichte
              </p>
              <p style={{ fontFamily: "'Soehne', 'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: 560 }}>
                Mit einem emotionalen 2:1-Sieg gegen den Tabellenführer sichert sich Empor Berlin
                den langersehnten Aufstieg in die Berlin-Liga. Die Fans stürmen den Platz.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Full Masthead Preview */}
        <section style={{ background: COLORS.black, padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/fuwo.svg"
              alt="FuWo"
              style={{
                height: "clamp(60px, 12vw, 120px)",
                margin: "0 auto",
                filter: "brightness(0) saturate(100%) invert(67%) sepia(95%) saturate(1000%) hue-rotate(85deg) brightness(105%) contrast(105%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/fussball-woche.svg"
              alt="Fußball-Woche"
              style={{
                height: "clamp(20px, 3vw, 32px)",
                margin: "1rem auto 0",
                filter: "brightness(0) saturate(100%) invert(100%) opacity(0.35)",
              }}
            />
            <p
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.3)",
                marginTop: "2rem",
              }}
            >
              traditionell — modern · bodenständig — selbstbewusst · nahbar — prägnant
            </p>
            <p
              style={{
                fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.15)",
                marginTop: "1rem",
              }}
            >
              SVG-Logos noch aus der alten Version — finale Logos kommen von Peer
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "2rem 1.5rem", background: COLORS.offWhite }}>
          <p
            style={{
              fontFamily: "'Soehne Mono', 'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: COLORS.gray500,
            }}
          >
            Design Preview — Proxy-Fonts (nicht final) — Nur interne Ansicht
          </p>
        </footer>
      </div>
    </>
  );
}
