import {
  Wifi,
  Sun,
  LayoutGrid,
  Camera,
  Bath,
  Sparkles,
  DoorOpen,
  Thermometer,
  Table,
  Shirt,
  Plug,
  HandHelping,
  Monitor,
  Video,
  Palette,
  Check,
  type LucideIcon,
} from "lucide-react";

// Mapea palabras clave de un texto de feature/servicio a un icono lineal.
// Si no hay coincidencia, usa un check genérico.
const rules: { test: RegExp; icon: LucideIcon }[] = [
  { test: /wi-?fi/i, icon: Wifi },
  { test: /ilumin|luz|luminos/i, icon: Sun },
  { test: /climatiz|calef|aire/i, icon: Thermometer },
  { test: /vers|espacio|flexib/i, icon: LayoutGrid },
  { test: /croma|pantalla verde|video/i, icon: Video },
  { test: /fondo|color/i, icon: Palette },
  { test: /monitor|pantalla|tv/i, icon: Monitor },
  { test: /c[aá]mara|foto|estudio/i, icon: Camera },
  { test: /ba[ñn]o/i, icon: Bath },
  { test: /maquill|prepar|espejo|camar[ií]n/i, icon: Sparkles },
  { test: /acceso|ingreso/i, icon: DoorOpen },
  { test: /mesa|auxiliar/i, icon: Table },
  { test: /perchero|ropa/i, icon: Shirt },
  { test: /toma|el[eé]ctric|enchufe/i, icon: Plug },
  { test: /asisten/i, icon: HandHelping },
];

export function iconForFeature(label: string): LucideIcon {
  const match = rules.find((rule) => rule.test.test(label));
  return match ? match.icon : Check;
}
