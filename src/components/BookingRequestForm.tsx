"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { bookingRequestSchema, type BookingRequestInput } from "@/lib/validation";
import { productionTypes } from "@/data/rooms";
import { TextField, TextAreaField, SelectField } from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";

// Fecha mínima seleccionable: hoy (YYYY-MM-DD local).
function todayISO(): string {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

// Formulario de solicitud de reserva, embebido en cada página de sala.
export default function BookingRequestForm({
  roomId,
  roomName,
}: {
  roomId: string;
  roomName: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingRequestInput>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: {
      roomId,
      roomName,
      privacyAccepted: false,
    },
  });

  const onSubmit = async (values: BookingRequestInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(
          data.error ?? "No pudimos enviar tu solicitud. Probá de nuevo.",
        );
        return;
      }
      router.push("/solicitud-enviada");
    } catch {
      setServerError("Ocurrió un error de conexión. Probá de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Sala precargada (solo lectura para el usuario). */}
      <input type="hidden" {...register("roomId")} />
      <input type="hidden" {...register("roomName")} />

      {/* Honeypot anti-spam: oculto y fuera del tab. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">No completar</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Nombre y apellido"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          label="Correo electrónico"
          type="email"
          required
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Teléfono"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextField
          label="Sala seleccionada"
          value={roomName}
          readOnly
          error={undefined}
          {...register("roomName")}
        />
        <TextField
          label="Fecha tentativa"
          type="date"
          required
          min={todayISO()}
          error={errors.requestedDate?.message}
          {...register("requestedDate")}
        />
        <TextField
          label="Cantidad estimada de personas"
          type="number"
          min={1}
          error={errors.estimatedPeople?.message as string | undefined}
          {...register("estimatedPeople")}
        />
        <TextField
          label="Hora de inicio tentativa"
          type="time"
          error={errors.startTime?.message}
          {...register("startTime")}
        />
        <TextField
          label="Hora de finalización tentativa"
          type="time"
          error={errors.endTime?.message}
          {...register("endTime")}
        />
      </div>

      <SelectField
        label="Tipo de producción"
        options={productionTypes}
        error={errors.productionType?.message}
        {...register("productionType")}
      />

      <TextAreaField
        label="Comentarios o detalles del proyecto"
        required
        hint="Contanos qué necesitás: día, horario, tipo de producción, equipo, etc."
        error={errors.message?.message}
        {...register("message")}
      />

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-line text-ink focus:ring-ink"
            {...register("privacyAccepted")}
          />
          <span>
            Acepto la{" "}
            <a href="/privacidad" className="link-underline text-ink" target="_blank">
              política de privacidad
            </a>
            .
          </span>
        </label>
        {errors.privacyAccepted && (
          <p role="alert" className="mt-1.5 text-xs text-red-700">
            {errors.privacyAccepted.message}
          </p>
        )}
      </div>

      <div aria-live="polite">
        {serverError && (
          <p role="alert" className="text-sm text-red-700">
            {serverError}
          </p>
        )}
      </div>

      <SubmitButton isSubmitting={isSubmitting}>Enviar solicitud</SubmitButton>
    </form>
  );
}
