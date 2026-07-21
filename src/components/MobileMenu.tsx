"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { navLinks } from "@/data/site";

// Menú mobile de pantalla completa. Se cierra con Escape, al tocar un enlace
// o el botón de cerrar. Bloquea el scroll del fondo mientras está abierto.
// Usa altura de viewport dinámica (dvh) y safe-areas para verse bien en iPhone.
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
      className="fixed inset-0 z-[60] h-dvh w-full overflow-y-auto bg-cream md:hidden animate-fade-in safe-pt safe-pb"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="flex min-h-dvh flex-col">
        <div className="safe-px flex h-16 shrink-0 items-center justify-between">
          <span className="font-serif text-xl text-ink">Peach Estudio</span>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink"
            aria-label="Cerrar menú"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav
          className="safe-px flex flex-1 flex-col justify-center gap-5 py-8"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-serif text-[2rem] leading-none text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={onClose}
            className="btn-primary mt-6 w-full"
          >
            Consultar disponibilidad
          </Link>
        </nav>
      </div>
    </div>
  );
}
