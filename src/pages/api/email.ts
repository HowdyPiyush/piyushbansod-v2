import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ email: "howdypiyush@gmail.com" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};