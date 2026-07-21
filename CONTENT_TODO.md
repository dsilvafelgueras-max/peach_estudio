# Contenido pendiente — Peach Estudio

Lista de la información que todavía hay que completar. Los valores provisorios
aparecen en el sitio como `A confirmar` o entre corchetes (ej. `[EMAIL_PEACH_STUDIO]`).

## Datos de contacto
Editar en [`src/data/site.ts`](src/data/site.ts):

- [ ] Email de contacto — `[EMAIL_PEACH_STUDIO]`
- [ ] Teléfono — `[TELEFONO_PEACH_STUDIO]`
- [ ] WhatsApp (puede ser el mismo teléfono)
- [ ] Instagram — `[INSTAGRAM_PEACH_STUDIO]`
- [ ] Dirección o barrio / zona general — `[DIRECCION_PEACH_STUDIO]`
      (no publicar la dirección exacta hasta confirmar)
- [ ] Horarios de atención — `[HORARIOS_PEACH_STUDIO]`

## Datos de cada sala
Editar en [`src/data/rooms.ts`](src/data/rooms.ts) por cada sala:

- [ ] Precio por hora / etiqueta de precio (`priceLabel`, `pricePerHour`, `currency`)
- [ ] Cantidad mínima de horas (`minimumHours`)
- [ ] Capacidad (`capacity`)
- [ ] Superficie en m² (`sizeM2`)
- [ ] Servicios incluidos reales (`includedServices`)
- [ ] Equipamiento específico de la sala (`features`)
- [ ] Servicios adicionales y sus precios (`optionalServices`)
- [ ] Descripción larga definitiva (`fullDescription`)

## Condiciones (por sala, campo `conditions`)
- [ ] Política de cancelación
- [ ] Horario de ingreso y salida
- [ ] Cuidado del espacio y del equipamiento
- [ ] Uso del equipamiento
- [ ] Seña o forma de confirmación
- [ ] Formas de pago

## Legales
- [ ] Revisar / validar [Política de privacidad](src/app/privacidad/page.tsx)
- [ ] Revisar / validar [Términos y condiciones](src/app/terminos/page.tsx)

## Imágenes
Las fotos actuales están en [`public/images/`](public/images/). Para reemplazarlas,
mantené los mismos nombres de archivo (o actualizá las rutas en `rooms.ts` / `site.ts`).

- [ ] Fotografías finales de la Sala de Maquillaje (`public/images/rooms/makeup/`)
- [ ] Fotografías finales del Estudio Fotográfico (`public/images/rooms/photo/`)
- [ ] Fotografías finales del Estudio con Croma (`public/images/rooms/chroma/`)
- [ ] Foto de portada del hero (`public/images/home/hero-placeholder.jpg`)
- [ ] Imágenes de la sección "El estudio" (`public/images/home/`)

## Identidad
- [ ] Logo definitivo (hoy es un logo tipográfico "Peach Estudio")
- [ ] Favicon definitivo (hoy es un placeholder en `src/app/icon.svg`)
