import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

const site =
  process.env.SITE_URL || process.env.PUBLIC_SITE_URL || "https://piyushbansod.com";

export default defineConfig({
  site,
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [mdx(), tina()],
  vite: {
    plugins: [tailwindcss(), tinaAdminDevRedirect()],
    ssr: { noExternal: ["@tinacms/astro", "@tinacms/bridge"] },
  },
});