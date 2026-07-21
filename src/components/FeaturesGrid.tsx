import { iconForFeature } from "@/components/FeatureIcon";

// Grilla de atributos/servicios con iconos lineales (componente de servidor).
export default function FeaturesGrid({
  items,
  columns = 3,
}: {
  items: string[];
  columns?: 2 | 3 | 4;
}) {
  const cols =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-5 ${cols}`}>
      {items.map((item) => {
        const Icon = iconForFeature(item);
        return (
          <li key={item} className="flex items-center gap-3 text-ink-soft">
            <Icon
              size={20}
              strokeWidth={1.5}
              aria-hidden="true"
              className="shrink-0 text-ink"
            />
            <span className="text-sm">{item}</span>
          </li>
        );
      })}
    </ul>
  );
}
