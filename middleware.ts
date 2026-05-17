import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  PICOIDS_COUNTRY_HEADER,
  PRICING_REGION_COOKIE,
  PRICING_REGION_OVERRIDE_COOKIE,
  REGIONS,
  detectCountryFromRequestHeaders,
} from "@/lib/currency";

export function middleware(request: NextRequest) {
  const country = detectCountryFromRequestHeaders(request.headers);

  const requestHeaders = new Headers(request.headers);
  if (country) {
    requestHeaders.set(PICOIDS_COUNTRY_HEADER, country);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Geo drives pricing on each request; drop legacy auto cookie so location is not stuck on US.
  response.cookies.delete(PRICING_REGION_COOKIE);

  const queryRegion = request.nextUrl.searchParams.get("region")?.toUpperCase();
  if (queryRegion && queryRegion in REGIONS) {
    response.cookies.set(PRICING_REGION_OVERRIDE_COOKIE, queryRegion, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
