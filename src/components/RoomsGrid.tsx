import type { Room } from "@/data/rooms";
import RoomCard from "@/components/RoomCard";

// Grilla responsive de salas (componente de servidor).
export default function RoomsGrid({
  rooms,
  priorityFirst = false,
}: {
  rooms: Room[];
  priorityFirst?: boolean;
}) {
  if (rooms.length === 0) {
    return (
      <p className="py-12 text-center text-ink-muted">
        No hay espacios para el filtro seleccionado.
      </p>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room, i) => (
        <RoomCard
          key={room.id}
          room={room}
          priority={priorityFirst && i === 0}
        />
      ))}
    </div>
  );
}
