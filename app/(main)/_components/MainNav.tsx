'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react'

const MainNav = () => {
  const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-blue-900/8"
            : "bg-white/80 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
              <span className="text-white text-xs font-black">MA</span>
            </div>
            <span className="text-blue-900 font-black text-xl tracking-tight">
              Mr.<span className="text-blue-500">Aircon</span>
            </span>
          </Link>
 
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {["products", "why", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-sm font-medium text-slate-600 hover:text-blue-700 capitalize transition-colors"
              >
                {s === "why" ? "Why Us" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </nav>
 
          <div className="flex items-center gap-3">
            <a
              href="https://www.mraircon.ph"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:-translate-y-px shadow-md shadow-blue-700/30"
            >
              Get a Quote
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-blue-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {menuOpen
                  ? <path d="M6 18L18 6M6 6l12 12" />
                  : <path d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
 
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100 px-5 py-4 flex flex-col gap-3">
            {["products", "why", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left py-2 text-sm font-medium text-slate-700 hover:text-blue-700 capitalize transition-colors"
              >
                {s === "why" ? "Why Us" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
            <a
              href="https://www.mraircon.ph"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex justify-center items-center gap-1.5 bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all"
            >
              Get a Quote
            </a>
          </div>
        )}
      </header>
  )
}

export default MainNav