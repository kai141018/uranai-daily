import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "占いデイリー",
    short_name: "占いデイリー",
    description: "12星座の今日の運勢を毎日更新",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#6B46C1",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
