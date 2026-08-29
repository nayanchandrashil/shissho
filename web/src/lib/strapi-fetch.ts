import { cookies } from "next/headers";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function strapiFetch(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(`${STRAPI_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
