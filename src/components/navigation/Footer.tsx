"use client";

import Link from "next/link";
import Image from "next/image";

const mainLinks = [
  { name: "Abo", href: "/abo" },
  { name: "Abokündigen", href: "/abo" },
  { name: "Shop", href: "/shop" },
  { name: "Heft-Archiv", href: "/archiv" },
  { name: "Spenden", href: "/unterstuetzen" },
  { name: "Jobs", href: "/jobs" },
];

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
  { name: "Barrierefreiheit", href: "/barrierefreiheit" },
  { name: "Nutzungsbedingungen", href: "/nutzungsbedingungen" },
  { name: "Cookies und Tracking", href: "/cookies" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-green text-white mt-12">
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Logo Row */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/">
              <Image
                src="/icons/fuwo_white.svg"
                alt="FuWo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <Image
              src="/icons/fussball-woche_white.svg"
              alt="Fußball-Woche"
              width={180}
              height={30}
              className="h-7 w-auto opacity-80"
            />
          </div>

          {/* Links Row */}
          <div className="flex items-center justify-between border-t border-white/20 pt-5">
            <nav className="flex items-center gap-5">
              {mainLinks.map((link) => (
                <Link
                  key={link.href + link.name}
                  href={link.href}
                  className="text-sm font-mono text-neon-green hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <nav className="flex items-center gap-5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href + link.name}
                  href={link.href}
                  className="text-xs text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden">
        <div className="px-4 py-8">
          {/* Logo Row */}
          <div className="flex items-start justify-between mb-6">
            <Link href="/">
              <Image
                src="/icons/fuwo_white.svg"
                alt="FuWo"
                width={80}
                height={30}
                className="h-8 w-auto"
              />
            </Link>
            <Image
              src="/icons/fussball-woche_white.svg"
              alt="Fußball-Woche"
              width={120}
              height={20}
              className="h-5 w-auto opacity-80"
            />
          </div>

          {/* Links — Two Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 border-t border-white/20 pt-5">
            <nav className="space-y-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href + link.name}
                  href={link.href}
                  className="block text-sm font-mono text-neon-green hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <nav className="space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href + link.name}
                  href={link.href}
                  className="block text-xs text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
