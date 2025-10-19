
import dotenv from "dotenv";
import { redis } from "../lib/redis.ts";
import { addEvent } from "../lib/events.ts";

dotenv.config();

async function processQueue() {
  while (true) {
    try {
      const pauseStatus = await redis.get("worker:paused");
      const isPaused = !!pauseStatus && pauseStatus !== "false";

      if (isPaused) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      const data = await redis.lpop("events_queue");

      if (!data) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
      const event = typeof data === "string" ? JSON.parse(data) : data;

      await addEvent(event);
    } catch (err) {
      console.error("Error processing event: ", err);
    }
  }
}

processQueue();

