"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import MobileMenu from "@/components/MobileMenu";

// Header horizontal. Transparente sobre el hero del inicio y con fondo blanco
// al hacer scroll o en el resto de las páginas.
export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fondo sólido salvo en el hero del inicio sin scroll.
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-cream/95 backdrop-blur border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className={`font-serif text-xl tracking-tight md:text-2xl ${
            solid ? "text-ink" : "text-white"
          }`}
          aria-label="Peach Estudio — Inicio"
        >
          Peach Estudio
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-underline text-sm ${
                solid ? "text-ink-soft hover:text-ink" : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className={
              solid
                ? "btn-primary text-sm"
                : "btn text-sm bg-white text-ink hover:bg-white/90"
            }
          >
            Consultar disponibilidad
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={`inline-flex h-10 w-10 items-center justify-center md:hidden ${
            solid ? "text-ink" : "text-white"
          }`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Abrir menú</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
