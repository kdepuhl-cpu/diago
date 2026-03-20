"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import SearchOverlay from "@/components/ui/SearchOverlay";
import { useUser } from "@/lib/user/auth";
import {
  getLeaguesByCategory,
  hasStaffeln,
  LeagueCategory,
  League,
} from "@/lib/leagues";

const navItems = [
  { label: "News", href: "/" },
  { label: "Ligen", href: "#", isDropdown: true },
  { label: "Vereine", href: "/vereine" },
  { label: "Stories", href: "/epaper" },
  { label: "Unterstützen", href: "/unterstuetzen" },
  { label: "Frauen", href: "/liga/frauen-berlin-liga", accent: true },
];

const categories: { id: LeagueCategory; label: string }[] = [
  { id: "herren", label: "Herren" },
  { id: "frauen", label: "Frauen" },
  { id: "jugend", label: "Jugend" },
  { id: "pokal", label: "Pokal" },
];

function ChevronIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ligenOpen, setLigenOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<LeagueCategory | null>(null);
  const [expandedLeague, setExpandedLeague] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<LeagueCategory | null>(null);
  const [mobileExpandedLeague, setMobileExpandedLeague] = useState<string | null>(null);
  const { theme, toggleTheme, mounted } = useTheme();
  const { user, loading: authLoading, signOut } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const ligenRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ligenRef.current && !ligenRef.current.contains(e.target as Node)) {
        setLigenOpen(false);
        setExpandedCategory(null);
        setExpandedLeague(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLigenEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLigenOpen(true);
  };

  const handleLigenLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLigenOpen(false);
      setExpandedCategory(null);
      setExpandedLeague(null);
    }, 200);
  };

  const renderLeagueItem = (league: League, onClose: () => void) => {
    const hasSubs = hasStaffeln(league);
    if (hasSubs) {
      return (
        <div
          key={league.id}
          className="relative"
          onMouseEnter={() => setExpandedLeague(league.id)}
          onMouseLeave={() => setExpandedLeague(null)}
        >
          <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer">
            <span>{league.name}</span>
            <ChevronIcon className="w-3 h-3 text-gray-500" />
          </div>
          {expandedLeague === league.id && league.staffeln && (
            <div className="absolute left-full top-0 ml-1 bg-forest-green border border-white/10 shadow-lg py-2 min-w-[180px] z-50">
              <Link href={`/liga/${league.slug}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white border-b border-white/10 mb-1" onClick={onClose}>
                Übersicht
              </Link>
              {league.staffeln.map((s) => (
                <Link key={s.id} href={`/liga/${s.slug}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white" onClick={onClose}>
                  {s.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    return (
      <Link key={league.id} href={`/liga/${league.slug}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white" onClick={onClose}>
        {league.name}
      </Link>
    );
  };

  return (
    <>
      <header className={`bg-forest-green text-white transition-shadow duration-200 ${scrolled ? "header-scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-12">
            {/* Logo */}
            <Link href="/" className="flex items-center mr-6">
              <Image
                src="/icons/fuwo_white.svg"
                alt="FuWo"
                width={70}
                height={24}
                className="h-6 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 flex-1">
              {navItems.map((item) =>
                item.isDropdown ? (
                  <div
                    key={item.label}
                    ref={ligenRef}
                    className="relative"
                    onMouseEnter={handleLigenEnter}
                    onMouseLeave={handleLigenLeave}
                  >
                    <button className="px-3 py-3 text-sm font-mono text-white/80 hover:text-white transition-colors flex items-center gap-1">
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform ${ligenOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {ligenOpen && (
                      <div
                        className="absolute top-full left-0 mt-0 bg-forest-green border border-white/10 shadow-xl min-w-[220px] z-50"
                        onMouseEnter={handleLigenEnter}
                        onMouseLeave={handleLigenLeave}
                      >
                        {/* Category tabs */}
                        <div className="flex border-b border-white/10">
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              className={`flex-1 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                                expandedCategory === cat.id
                                  ? "text-neon-green bg-white/5"
                                  : "text-white/60 hover:text-white"
                              }`}
                              onMouseEnter={() => setExpandedCategory(cat.id)}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                        {/* League list */}
                        <div className="py-1 max-h-[400px] overflow-y-auto">
                          {expandedCategory ? (
                            getLeaguesByCategory(expandedCategory).map((league) =>
                              renderLeagueItem(league, () => { setLigenOpen(false); setExpandedCategory(null); setExpandedLeague(null); })
                            )
                          ) : (
                            <p className="px-4 py-3 text-xs text-white/40">Kategorie wählen</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-3 text-sm font-mono transition-colors ${
                      item.accent
                        ? "text-neon-green hover:text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1 ml-auto">
              {/* CTA Desktop */}
              <Link
                href="/unterstuetzen"
                className="hidden md:inline-flex px-4 py-1.5 bg-neon-green text-forest-green text-sm font-semibold rounded-full hover:bg-neon-green/90 transition-colors"
              >
                Jetzt unterstützen
              </Link>

              {/* CTA Mobile */}
              <Link
                href="/unterstuetzen"
                className="md:hidden px-3 py-1 bg-neon-green text-forest-green text-xs font-semibold rounded-full"
              >
                Jetzt unterstützen
              </Link>

              {/* Search */}
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

              {/* Burger — always visible */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className={`absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-forest-green shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Image src="/icons/fuwo_white.svg" alt="FuWo" width={70} height={24} className="h-6 w-auto" />
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Menu schließen">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
              {/* Nav Links */}
              <nav className="space-y-1 mb-6">
                {[
                  { name: "Startseite", href: "/" },
                  { name: "News", href: "/" },
                  { name: "Vereine", href: "/vereine" },
                  { name: "Stories", href: "/epaper" },
                  { name: "Unterstützen", href: "/unterstuetzen" },
                  { name: "Jobs", href: "/jobs" },
                  { name: "Tippspiel", href: "/tippspiel" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 text-sm font-mono text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-white/10 my-4" />

              {/* Ligen Accordions */}
              <p className="text-xs text-white/40 font-mono uppercase tracking-wider mb-3 px-4">Ligen</p>
              {categories.map((cat) => (
                <div key={cat.id} className="mb-3">
                  <button
                    onClick={() => setMobileExpandedCategory(mobileExpandedCategory === cat.id ? null : cat.id)}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-mono text-white/80 hover:text-white"
                  >
                    {cat.label}
                    <svg className={`w-4 h-4 transition-transform ${mobileExpandedCategory === cat.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpandedCategory === cat.id && (
                    <nav className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-4">
                      {getLeaguesByCategory(cat.id).map((league) => {
                        const hasSubs = hasStaffeln(league);
                        if (hasSubs) {
                          return (
                            <div key={league.id}>
                              <button
                                onClick={() => setMobileExpandedLeague(mobileExpandedLeague === league.id ? null : league.id)}
                                className="flex items-center justify-between w-full py-2 text-sm text-white/60 hover:text-white"
                              >
                                {league.name}
                                <ChevronIcon className={`w-3 h-3 transition-transform ${mobileExpandedLeague === league.id ? "rotate-90" : ""}`} />
                              </button>
                              {mobileExpandedLeague === league.id && league.staffeln && (
                                <div className="ml-4 border-l border-white/10 pl-3 space-y-1">
                                  <Link href={`/liga/${league.slug}`} className="block py-1.5 text-xs text-white/50 hover:text-white" onClick={() => setMenuOpen(false)}>Übersicht</Link>
                                  {league.staffeln.map((s) => (
                                    <Link key={s.id} href={`/liga/${s.slug}`} className="block py-1.5 text-xs text-white/50 hover:text-white" onClick={() => setMenuOpen(false)}>{s.name}</Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }
                        return (
                          <Link key={league.id} href={`/liga/${league.slug}`} className="block py-2 text-sm text-white/60 hover:text-white" onClick={() => setMenuOpen(false)}>
                            {league.name}
                          </Link>
                        );
                      })}
                    </nav>
                  )}
                </div>
              ))}

              <div className="border-t border-white/10 my-4" />

              {/* Auth */}
              {!authLoading && (
                user ? (
                  <div className="space-y-1">
                    <div className="px-4 py-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neon-green flex items-center justify-center text-forest-green text-xs font-bold">
                        {((user.user_metadata?.display_name as string) ?? user.email ?? "?")[0].toUpperCase()}
                      </div>
                      <span className="text-sm text-white/80 truncate">
                        {(user.user_metadata?.display_name as string) ?? user.email}
                      </span>
                    </div>
                    <Link href="/profil" className="block px-4 py-3 text-sm font-mono text-white/80 hover:bg-white/10 rounded-lg" onClick={() => setMenuOpen(false)}>Mein Profil</Link>
                    <button onClick={async () => { setMenuOpen(false); await signOut(); }} className="block w-full text-left px-4 py-3 text-sm font-mono text-white/80 hover:bg-white/10 rounded-lg">Abmelden</button>
                  </div>
                ) : (
                  <Link href="/login" className="block px-4 py-3 text-sm font-mono text-white/80 hover:bg-white/10 rounded-lg" onClick={() => setMenuOpen(false)}>Anmelden</Link>
                )
              )}

              {/* Dark Mode */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="mt-4 flex items-center gap-3 px-4 py-3 text-sm font-mono text-white/60 hover:text-white rounded-lg w-full"
                >
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
