"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { rooms, productionTypes } from "@/data/rooms";

// Formulario que arma un mensaje de WhatsApp con los datos de la reserva y abre
// el chat con el estudio. No usa backend: todo se construye en el navegador.
//
// - En una página de espacio: se pasa `roomName` y el campo queda fijo.
// - En /contacto: sin `roomName`, aparece un selector de espacio.
export default function WhatsAppForm({ roomName }: { roomName?: string }) {
  const fixedRoom = Boolean(roomName);

  const [form, setForm] = useState({
    name: "",
    room: roomName ?? "",
    people: "",
    activity: "",
    date: "",
    startTime: "",
    endTime: "",
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Fecha mínima: hoy.
  const todayISO = (() => {
    const d = new Date();
    const off = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - off).toISOString().slice(0, 10);
  })();

  const buildMessage = () => {
    const lines = ["¡Hola Peach Estudio! Quiero consultar disponibilidad."];
    if (form.name) lines.push(`Nombre: ${form.name}`);
    if (form.room) lines.push(`Espacio: ${form.room}`);
    if (form.activity) lines.push(`Qué queremos hacer: ${form.activity}`);
    if (form.people) lines.push(`Cantidad de personas: ${form.people}`);
    if (form.date) {
      let when = `Fecha tentativa: ${form.date}`;
      if (form.startTime && form.endTime) when += ` (${form.startTime} a ${form.endTime})`;
      else if (form.startTime) when += ` (desde ${form.startTime})`;
      lines.push(when);
    }
    if (form.comment) lines.push(`Comentario: ${form.comment}`);
    return lines.join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones mínimas.
    if (!form.name.trim()) return setError("Ingresá tu nombre.");
    if (!form.room) return setError("Elegí un espacio.");
    if (!form.activity) return setError("Contanos qué querés hacer.");
    if (form.startTime && form.endTime && form.endTime <= form.startTime) {
      return setError("La hora de fin debe ser posterior a la de inicio.");
    }

    const link = whatsappLink(buildMessage());
    if (!link) {
      return setError("El WhatsApp del estudio todavía no está configurado.");
    }
    // Abre WhatsApp con el mensaje armado.
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="waf-name" className="block text-sm font-medium text-ink">
            Nombre <span className="text-ink-muted">*</span>
          </label>
          <input
            id="waf-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        {fixedRoom ? (
          <div>
            <label htmlFor="waf-room" className="block text-sm font-medium text-ink">
              Espacio
            </label>
            <input
              id="waf-room"
              type="text"
              value={form.room}
              readOnly
              className={`mt-1.5 ${inputClass} bg-peach-50`}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="waf-room" className="block text-sm font-medium text-ink">
              Espacio <span className="text-ink-muted">*</span>
            </label>
            <select
              id="waf-room"
              value={form.room}
              onChange={set("room")}
              className={`mt-1.5 ${inputClass}`}
            >
              <option value="">Elegí un espacio</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.name}>
                  {r.name}
                </option>
              ))}
              <option value="Todo el estudio (beautys + estudio fotográfico)">
                Todo el estudio (beautys + estudio fotográfico)
              </option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="waf-activity" className="block text-sm font-medium text-ink">
            ¿Qué querés hacer? <span className="text-ink-muted">*</span>
          </label>
          <select
            id="waf-activity"
            value={form.activity}
            onChange={set("activity")}
            className={`mt-1.5 ${inputClass}`}
          >
            <option value="">Elegí una opción</option>
            {productionTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="waf-people" className="block text-sm font-medium text-ink">
            Cantidad de personas
          </label>
          <input
            id="waf-people"
            type="number"
            min={1}
            max={50}
            value={form.people}
            onChange={set("people")}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div>
          <label htmlFor="waf-date" className="block text-sm font-medium text-ink">
            Fecha tentativa
          </label>
          <input
            id="waf-date"
            type="date"
            min={todayISO}
            value={form.date}
            onChange={set("date")}
            className={`mt-1.5 ${inputClass}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="waf-start" className="block text-sm font-medium text-ink">
              Desde
            </label>
            <input
              id="waf-start"
              type="time"
              value={form.startTime}
              onChange={set("startTime")}
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
          <div>
            <label htmlFor="waf-end" className="block text-sm font-medium text-ink">
              Hasta
            </label>
            <input
              id="waf-end"
              type="time"
              value={form.endTime}
              onChange={set("endTime")}
              className={`mt-1.5 ${inputClass}`}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="waf-comment" className="block text-sm font-medium text-ink">
          Comentario (opcional)
        </label>
        <textarea
          id="waf-comment"
          rows={3}
          value={form.comment}
          onChange={set("comment")}
          placeholder="Contanos más sobre tu producción."
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto">
        <MessageCircle size={16} aria-hidden="true" />
        Enviar por WhatsApp
      </button>
      <p className="text-xs text-ink-muted">
        Al enviar se abre WhatsApp con tus datos ya cargados para coordinar la reserva.
      </p>
    </form>
  );
}
