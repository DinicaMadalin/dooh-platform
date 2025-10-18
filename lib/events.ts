import pool from "./db.js"
import type { Event, Campaign } from "./types.ts"


export async function addEvent(event: Event): Promise<void> {
  const client = await pool.connect();
  console.log("Inserting event into DB:", event)
  try {

    await client.query(
      `INSERT INTO events(screen_id, campaign_id, timestamp) VALUES($1, $2, $3)`,
      [event.screen_id, event.campaign_id, event.timestamp]
    );
    await client.query(`INSERT INTO campaigns(id, play_count) VALUES($1, 1) ON CONFLICT(id) DO UPDATE SET play_count = campaigns.play_count + 1`,
      [event.campaign_id]);

    await client.query(`INSERT INTO screens (id) VALUES ($1) ON CONFLICT(id) DO NOTHING`,
      [event.screen_id]);
  } finally {
    client.release();
  }

}

export async function getCampaigns(): Promise<Campaign[]> {
  const result = await pool.query(`SELECT * FROM campaigns ORDER BY play_count DESC`);
  return result.rows;
}
