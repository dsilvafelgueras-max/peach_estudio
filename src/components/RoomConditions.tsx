"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Acordeón de condiciones. Los textos son provisorios (pendientes de validación).
export default function RoomConditions({ conditions }: { conditions: string[] }) {
  const [open, setOpen] = useState(false);

  if (conditions.length === 0) return null;

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-serif text-xl text-ink">Condiciones</span>
        <ChevronDown
          size={20}
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-6">
          <p className="mb-3 text-xs uppercase tracking-wide text-ink-muted">
            Información provisoria, pendiente de confirmación.
          </p>
          <ul className="space-y-2 text-sm text-ink-soft">
            {conditions.map((c) => (
              <li key={c} className="flex gap-2">
                <span aria-hidden="true" className="text-ink-muted">
                  —
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
