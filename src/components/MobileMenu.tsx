"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { navLinks } from "@/data/site";

// Menú mobile de pantalla completa. Se cierra con Escape, al tocar un enlace
// o el botón de cerrar. Bloquea el scroll del fondo mientras está abierto.
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-cream md:hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="container-page flex h-16 items-center justify-between">
        <span className="font-serif text-xl text-ink">Peach Estudio</span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center text-ink"
          aria-label="Cerrar menú"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      <nav
        className="container-page flex flex-1 flex-col justify-center gap-6"
        aria-label="Navegación principal"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-serif text-3xl text-ink"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contacto"
          onClick={onClose}
          className="btn-primary mt-4 w-full"
        >
          Consultar disponibilidad
        </Link>
      </nav>
    </div>
  );
}
