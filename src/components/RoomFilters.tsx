"use client";

import { useMemo, useState } from "react";
import { roomFilters, type Room, type RoomCategory } from "@/data/rooms";
import RoomsGrid from "@/components/RoomsGrid";

// Filtro por categoría del lado del cliente (sin recargar la página).
export default function RoomFilters({ rooms }: { rooms: Room[] }) {
  const [active, setActive] = useState<"all" | RoomCategory>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? rooms
        : rooms.filter((room) => room.categoryKey === active),
    [active, rooms],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar espacios por categoría"
        >
          {roomFilters.map((filter) => {
            const isActive = active === filter.key;
            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-cream"
                    : "border-line text-ink-soft hover:border-ink"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-ink-muted" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1 ? "espacio encontrado" : "espacios encontrados"}
        </p>
      </div>

      <div className="mt-12">
        <RoomsGrid rooms={filtered} />
      </div>
    </div>
  );
}
