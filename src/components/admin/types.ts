// Forma de una fila de booking_requests tal como la usa el panel admin.
export type BookingStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "rejected"
  | "cancelled";

export type BookingRow = {
  id: string;
  created_at: string;
  room_id: string | null;
  room_name: string;
  full_name: string;
  email: string;
  phone: string;
  requested_date: string | null;
  start_time: string | null;
  end_time: string | null;
  estimated_people: number | null;
  production_type: string | null;
  message: string;
  status: BookingStatus;
  source: string | null;
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  new: "Nueva",
  contacted: "Contactada",
  confirmed: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
};

export const STATUS_ORDER: BookingStatus[] = [
  "new",
  "contacted",
  "confirmed",
  "rejected",
  "cancelled",
];
