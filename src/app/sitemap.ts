import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/el-estudio",
    "/salas",
    "/contacto",
    "/privacidad",
    "/terminos",
  ].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
    }),
  );

  const roomRoutes = rooms.map((room) => ({
    url: `${site.url}/salas/${room.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...roomRoutes];
}
