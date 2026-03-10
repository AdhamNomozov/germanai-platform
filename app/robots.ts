import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/platform/admin", "/platform/teacher"],
      },
    ],
    sitemap: "https://germango.uz/sitemap.xml",
    host: "https://germango.uz",
  }
}
