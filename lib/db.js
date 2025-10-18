import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

async function initDb() {
  const client = await pool.connect();

  try {
    await client.query(`CREATE TABLE IF NOT EXISTS events (id SERIAL PRIMARY KEY, screen_id TEXT NOT NULL, campaign_id TEXT NOT NULL, timestamp TEXT NOT NULL)`);

    await client.query(`CREATE TABLE IF NOT EXISTS campaigns (id TEXT PRIMARY KEY, play_count INTEGER DEFAULT 0)`);

    await client.query(`CREATE TABLE IF NOT EXISTS screens (id TEXT PRIMARY KEY)`)

    console.log("DB tables initalized");
  } catch (err) {
    console.log("Erorr initializing db:", err);
  }
  finally {
    client.release();
  }
}

initDb();

export default pool;
