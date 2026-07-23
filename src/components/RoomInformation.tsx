import type { Room } from "@/data/rooms";
import { site } from "@/data/site";

// Bloque de datos principales de la sala (componente de servidor).
// Muestra "A confirmar" cuando un dato no está definido.
export default function RoomInformation({ room }: { room: Room }) {
  const capacityValue = room.capacityLabel
    ? room.capacityLabel
    : room.capacity
      ? `${room.capacity} ${room.capacity === 1 ? "persona" : "personas"}`
      : "A confirmar";

  const sizeValue = room.sizeLabel
    ? room.sizeLabel
    : room.sizeM2
      ? `${room.sizeM2} m²`
      : "A confirmar";

  const rows: [string, string][] = [
    ["Tipo de sala", room.category],
    ["Capacidad", capacityValue],
    ["Superficie", sizeValue],
    ["Precio", room.priceLabel],
    [
      "Mínimo de horas",
      room.minimumHours ? `${room.minimumHours} horas` : "A confirmar",
    ],
    // No mostrar dirección exacta hasta confirmar.
    ["Ubicación", site.contact.address],
  ];

  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-baseline justify-between gap-4 py-3.5"
        >
          <dt className="text-sm text-ink-muted">{label}</dt>
          <dd className="text-right text-sm font-medium text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
