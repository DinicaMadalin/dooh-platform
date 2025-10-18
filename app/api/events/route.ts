import { NextResponse, NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import type { Event } from "@/lib/types";

export async function POST(req: NextRequest) {
  const event: Event = await req.json();

  if (!event.campaign_id || !event.screen_id || !event.timestamp) {
    return NextResponse.json({ message: "Invalid event payload." }, { status: 400 });
  }

  await redis.lpush("events_queue", JSON.stringify(event));

  return NextResponse.json("Event queued successfully");
}
