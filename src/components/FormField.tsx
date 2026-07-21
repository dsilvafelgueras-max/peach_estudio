// Campos de formulario reutilizables con label visible y mensaje de error.
// Se usan con register() de React Hook Form.

import { forwardRef } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
};

function FieldWrapper({
  label,
  name,
  error,
  required,
  hint,
  children,
}: BaseProps & { children: React.ReactNode }) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-ink-muted"> *</span>}
      </label>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses =
  "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

export const TextField = forwardRef<
  HTMLInputElement,
  BaseProps & React.InputHTMLAttributes<HTMLInputElement>
>(function TextField({ label, name, error, required, hint, ...rest }, ref) {
  return (
    <FieldWrapper label={label} name={name} error={error} required={required} hint={hint}>
      <input
        id={name}
        name={name}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClasses}
        {...rest}
      />
    </FieldWrapper>
  );
});

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextAreaField({ label, name, error, required, hint, ...rest }, ref) {
  return (
    <FieldWrapper label={label} name={name} error={error} required={required} hint={hint}>
      <textarea
        id={name}
        name={name}
        ref={ref}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClasses}
        {...rest}
      />
    </FieldWrapper>
  );
});

export const SelectField = forwardRef<
  HTMLSelectElement,
  BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }
>(function SelectField(
  { label, name, error, required, hint, options, ...rest },
  ref,
) {
  return (
    <FieldWrapper label={label} name={name} error={error} required={required} hint={hint}>
      <select
        id={name}
        name={name}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClasses}
        {...rest}
      >
        <option value="">Seleccioná una opción</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
});
