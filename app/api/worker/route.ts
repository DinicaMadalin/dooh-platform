import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";


export async function POST(req: NextRequest) {
  const { action } = await req.json();

  if (action === "pause") {
    await redis.set("worker:paused", "true");
    return NextResponse.json({ status: "paused" });
  }
  else if (action === "resume") {
    await redis.set("worker:paused", "false");
    return NextResponse.json({ status: "running" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function GET() {
  const status = await redis.get("worker:paused");
  return NextResponse.json({
    paused: status === "true"
  });
}
