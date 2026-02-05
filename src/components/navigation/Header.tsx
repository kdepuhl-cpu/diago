"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [hoveredLiga, setHoveredLiga] = useState<string | null>(null);

  return (
    <header className="bg-off-black text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-12">
          {/* Burger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="-ml-2 p-2 hover:bg-white/10 rounded transition-colors mr-2"
            aria-label="Menu"
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
                {/* Active indicator */}
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

              {/* Dropdown */}
              {moreOpen && (
                <div className="absolute top-full right-0 mt-1 bg-off-black border border-gray-700 rounded-md shadow-lg py-2 min-w-[160px]">
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
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-off-black p-4">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mt-12">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Ligen</p>
              <nav className="space-y-1">
                {[...ligen, ...moreLigen].map((liga) => (
                  <Link
                    key={liga.slug}
                    href={`/liga/${liga.slug}`}
                    className="block px-3 py-2 text-gray-300 hover:bg-white/10 hover:text-white rounded transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {liga.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
