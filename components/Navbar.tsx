"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname.startsWith(path) ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">
              Aides<span className="text-blue-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/particuliers" className={`text-sm font-medium transition-colors ${isActive("/particuliers")}`}>
              Particuliers
            </Link>
            <Link href="/associations" className={`text-sm font-medium transition-colors ${isActive("/associations")}`}>
              Associations
            </Link>
            <Link href="/#comment-ca-marche" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Comment ça marche
            </Link>
            <Link href="/assistant" className={`text-sm font-medium transition-colors ${isActive("/assistant")}`}>
              🤖 Assistant
            </Link>
            <Link href="/#contact" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/assistant"
              className="px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
            >
              🤖 Assistant
            </Link>
            <Link
              href="/particuliers"
              className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              Trouver mes aides
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden pb-4 border-t border-slate-100 pt-3 space-y-1">
            <Link href="/particuliers" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>
              Particuliers
            </Link>
            <Link href="/associations" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>
              Associations
            </Link>
            <Link href="/#comment-ca-marche" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>
              Comment ça marche
            </Link>
            <Link href="/assistant" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>
              🤖 Assistant administratif
            </Link>
            <div className="pt-2 space-y-2">
              <Link href="/assistant" className="block px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl text-center" onClick={() => setMenuOpen(false)}>
                🤖 Assistant
              </Link>
              <Link href="/particuliers" className="block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl text-center" onClick={() => setMenuOpen(false)}>
                Trouver mes aides
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
