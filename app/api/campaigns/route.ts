import { NextResponse } from "next/server";
import { getCampaigns } from "@/lib/events";

export async function GET() {
  const campaigns = await getCampaigns();

  return NextResponse.json(campaigns);
}

