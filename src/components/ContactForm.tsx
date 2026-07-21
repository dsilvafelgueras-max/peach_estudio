"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/validation";
import { rooms } from "@/data/rooms";
import { TextField, TextAreaField, SelectField } from "@/components/FormField";
import SubmitButton from "@/components/SubmitButton";

// Formulario general de contacto (/contacto).
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyAccepted: false },
  });

  const onSubmit = async (values: ContactInput) => {
    setServerError(null);
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setServerError(data.error ?? "No pudimos enviar tu consulta. Probá de nuevo.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError("Ocurrió un error de conexión. Probá de nuevo.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-line bg-peach-50 p-6"
      >
        <p className="font-serif text-xl text-ink">Recibimos tu consulta</p>
        <p className="mt-2 text-sm text-ink-soft">
          Gracias por escribirnos. Nos vamos a comunicar con vos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot anti-spam. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-contact">No completar</label>
        <input
          id="company-contact"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
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
        <SelectField
          label="Sala de interés"
          options={rooms.map((r) => r.name)}
          error={errors.roomName?.message}
          {...register("roomName")}
        />
      </div>

      <TextAreaField
        label="Mensaje"
        required
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

      <SubmitButton isSubmitting={isSubmitting}>Enviar consulta</SubmitButton>
    </form>
  );
}
