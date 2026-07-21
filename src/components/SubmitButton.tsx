import { Loader2 } from "lucide-react";

// Botón de envío con estado de carga.
export default function SubmitButton({
  children,
  isSubmitting,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
}) {
  return (
    <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSubmitting}>
      {isSubmitting && (
        <Loader2 size={16} aria-hidden="true" className="animate-spin" />
      )}
      {isSubmitting ? "Enviando…" : children}
    </button>
  );
}
