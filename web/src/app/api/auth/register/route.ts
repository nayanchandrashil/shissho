import { NextRequest, NextResponse } from "next/server";
import type { AuthResponse, RegisterCredentials, StrapiErrorResponse, SessionResponse } from "@/lib/types/auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const COOKIE_NAME = "jwt";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  if (!STRAPI_URL) {
    return NextResponse.json({ message: "Server misconfigured: STRAPI_API_URL missing" }, { status: 500 });
  }

  let body: RegisterCredentials;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.username || !body.email || !body.password) {
    return NextResponse.json({ message: "username, email and password are required" }, { status: 400 });
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: body.username,
      email: body.email,
      password: body.password,
    }),
    cache: "no-store",
  });

  if (!strapiRes.ok) {
    const errData = (await strapiRes.json().catch(() => null)) as StrapiErrorResponse | null;
    return NextResponse.json(
      { message: errData?.error?.message ?? "Registration failed" },
      { status: strapiRes.status },
    );
  }

  const data = (await strapiRes.json()) as AuthResponse;

  const response = NextResponse.json<SessionResponse>({ user: data.user }, { status: 201 });

  response.cookies.set(COOKIE_NAME, data.jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  return response;
}
