// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AuthUser } from "@/lib/types/auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function GET() {
  if (!STRAPI_URL) {
    return NextResponse.json({ message: "Server misconfigured: STRAPI_API_URL missing" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!strapiRes.ok) {
    const errBody = await strapiRes.text();
    console.error("Strapi /api/users/me failed:", strapiRes.status, errBody);
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = (await strapiRes.json()) as AuthUser;

  return NextResponse.json({ user });
}
