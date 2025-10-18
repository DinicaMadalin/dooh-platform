import { NextResponse } from "next/server";

//upTimeRobot requests for monitoring 
export async function GET() {
  return NextResponse.json({ status: "OK" }, { status: 200 });
}
