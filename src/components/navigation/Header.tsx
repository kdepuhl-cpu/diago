"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import SearchOverlay from "@/components/ui/SearchOverlay";

const ligen = [
  { name: "Bundesliga", slug: "bundesliga", short: "Bundesliga" },
  { name: "Frauen-BL", slug: "frauen-bundesliga", short: "Frauen-BL" },
  { name: "2. BL", slug: "2-bundesliga", short: "2. BL" },
  { name: "3. Liga", slug: "3-liga", short: "3. Liga" },
  { name: "Regionalliga", slug: "regionalliga", short: "Regionalliga" },
  { name: "Oberliga", slug: "oberliga", short: "Oberliga" },
  { name: "Berlin", slug: "berlin-liga", short: "Berlin" },
];

const moreLigen = [
  { name: "DFB-Pokal", slug: "dfb-pokal" },
  { name: "DFB-Pokal Frauen", slug: "dfb-pokal-frauen" },
];

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hoveredLiga, setHoveredLiga] = useState<string | null>(null);
  const { theme, toggleTheme, mounted } = useTheme();

  // Keyboard shortcut for search (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="bg-off-black dark:bg-gray-950 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12">
            {/* Burger Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="-ml-2 p-2 hover:bg-white/10 rounded transition-colors mr-2"
              aria-label="Menu öffnen"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo - Word Mark like The Athletic */}
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/diago_logo_rgb_white.svg"
                alt="DIAGO"
                width={100}
                height={28}
                className="h-7 w-auto"
              />
            </Link>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-600 mx-5 hidden md:block" />

            {/* Liga Navigation */}
            <nav className="hidden md:flex items-stretch gap-1 flex-1">
              {ligen.map((liga) => (
                <Link
                  key={liga.slug}
                  href={`/liga/${liga.slug}`}
                  className={`px-3 flex items-center text-sm font-medium transition-colors relative
                    ${hoveredLiga === liga.slug
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  onMouseEnter={() => setHoveredLiga(liga.slug)}
                  onMouseLeave={() => setHoveredLiga(null)}
                >
                  {liga.short}
                  {hoveredLiga === liga.slug && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                  )}
                </Link>
              ))}

              {/* More Button */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`px-3 flex items-center text-sm transition-colors h-full
                    ${moreOpen ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}
                >
                  •••
                </button>

                {moreOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-off-black border border-gray-700 rounded-md shadow-lg py-2 min-w-[160px] z-50">
                    {moreLigen.map((liga) => (
                      <Link
                        key={liga.slug}
                        href={`/liga/${liga.slug}`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                        onClick={() => setMoreOpen(false)}
                      >
                        {liga.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Suchen"
                title="Suchen (⌘K)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark Mode Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 hover:bg-white/10 rounded transition-colors"
                  aria-label={theme === "dark" ? "Light Mode" : "Dark Mode"}
                >
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-off-black shadow-2xl transform transition-transform duration-300 ease-out ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <Image
                src="/icons/diago_logo_rgb_white.svg"
                alt="DIAGO"
                width={80}
                height={24}
                className="h-6 w-auto"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Menu schließen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">
                Ligen
              </p>
              <nav className="space-y-1">
                {[...ligen, ...moreLigen].map((liga) => (
                  <Link
                    key={liga.slug}
                    href={`/liga/${liga.slug}`}
                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="w-2 h-2 bg-electric-orange rounded-full" />
                    {liga.name}
                  </Link>
                ))}
              </nav>

              <div className="my-6 border-t border-gray-800" />

              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">
                Mehr
              </p>
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Startseite
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors w-full"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Suchen
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
