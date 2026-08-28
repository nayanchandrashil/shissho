import { NextRequest, NextResponse } from "next/server";
import type { AuthResponse, LoginCredentials, StrapiErrorResponse, SessionResponse } from "@/lib/types/auth";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const COOKIE_NAME = "jwt";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export async function POST(request: NextRequest) {
  if (!STRAPI_URL) {
    return NextResponse.json({ message: "Server misconfigured: STRAPI_API_URL missing" }, { status: 500 });
  }

  let body: LoginCredentials;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.identifier || !body.password) {
    return NextResponse.json({ message: "email/username and password are required" }, { status: 400 });
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: body.identifier,
      password: body.password,
    }),
    cache: "no-store",
  });

  if (!strapiRes.ok) {
    const errData = (await strapiRes.json().catch(() => null)) as StrapiErrorResponse | null;
    return NextResponse.json(
      { message: errData?.error?.message ?? "Invalid credentials" },
      { status: strapiRes.status },
    );
  }

  const data = (await strapiRes.json()) as AuthResponse;

  const response = NextResponse.json<SessionResponse>({ user: data.user });

  response.cookies.set(COOKIE_NAME, data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}
