export default function manifest() {
  return {
    id: "/",
    name: "sitecf",
    short_name: "sitecf",
    description: "Sistema Integrado Territorial y de Control Fiscal",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2eb",
    theme_color: "#00e699",
    icons: [
      {
        src: "/icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
