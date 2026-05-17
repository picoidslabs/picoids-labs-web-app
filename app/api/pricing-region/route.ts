import { NextResponse } from "next/server";
import {
  PRICING_REGION_COOKIE,
  PRICING_REGION_OVERRIDE_COOKIE,
  REGIONS,
  type PriceRegionId,
} from "@/lib/currency";

export async function POST(request: Request) {
  const body = (await request.json()) as { region?: string };
  const regionId = body.region?.toUpperCase() as PriceRegionId | undefined;

  if (!regionId || !(regionId in REGIONS)) {
    return NextResponse.json({ error: "Invalid region" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, region: regionId });
  response.cookies.set(PRICING_REGION_OVERRIDE_COOKIE, regionId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  response.cookies.delete(PRICING_REGION_COOKIE);
  return response;
}
