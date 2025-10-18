import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`SELECT screen_id, COUNT(*) as play_count FROM events GROUP BY screen_id ORDER BY play_count DESC`);

    return NextResponse.json(result.rows);
  } catch (err) {
    console.log(
      "Error fetching screens", err
    )
    return NextResponse.json([], { status: 200 })
  }
}
