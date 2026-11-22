"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/conseil", label: "Clara ✦" },
  { href: "/particuliers", label: "Particuliers" },
  { href: "/associations", label: "Associations" },
  { href: "/assistant", label: "Assistant" },
  { href: "/proximite", label: "Proximité" },
  { href: "/plan-action", label: "Échéances" },
  { href: "/methodologie", label: "Méthodologie" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/")
      ? "text-[#30243C] font-semibold"
      : "text-slate-600 hover:text-slate-900";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FBF7EF]/85 backdrop-blur-xl border-b border-[#30243C]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#30243C] to-[#61436F] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <span className="font-bold text-slate-800 text-base tracking-tight">
              Aides<span className="text-[#B58A45]">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isActive(link.href)}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden xl:flex items-center">
            <Link
              href="/conseil?mode=live"
              className="px-4 py-2 bg-[#30243C] text-white text-sm font-semibold rounded-xl hover:bg-[#61436F] transition-colors shadow-sm"
            >
              Parler à Clara
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden pb-4 border-t border-slate-100 pt-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#f1ebf5] hover:text-[#61436f] rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-1">
              <Link
                href="/conseil?mode=live"
                className="block px-4 py-3 bg-[#30243C] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#61436F] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Parler à Clara
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
