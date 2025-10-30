import { useEffect, useState, useRef } from "react";
import { Campaign, Screens, Event, WorkerStatus } from "../../lib/types.ts";

export const useDataFetching = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [screens, setScreens] = useState<Screens[]>([]);
  const [loading, setLoading] = useState(true);
  const [workerPaused, setWorkerPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/campaigns");
      const data = (await res.json()) as Campaign[];
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchScreens = async () => {
    try {
      const res = await fetch("/api/screens");
      const data = (await res.json());
      const processedScreens = Array.isArray(data)
        ? data.map(item => ({
          id: item.id || item.screen_id || `screen-${Math.random().toString(36).substr(2, 9)}`, // Fallback if id/screen_id is missing
          play_count: item.play_count || 0,
        }))
        : [];
      setScreens(processedScreens);
    } catch (err) {
      console.error("Failed to fetch screens", err);
    }
  };

  const fetchWorkerStatus = async () => {
    try {
      const res = await fetch("/api/worker");
      const data = await res.json() as WorkerStatus;
      setWorkerPaused(Boolean(data.paused));
    } catch (err) {
      console.error("Failed to fetch worker status", err);
    }
  };

  const simulateEvent = async () => {
    const event: Event = {
      campaign_id: `cmp-${Math.floor(Math.random() * 10)}`,
      screen_id: `screen-${Math.floor(Math.random() * 10)}`,
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });
    } catch (err) {
      console.error("Failed to simulate event", err);
    }
  };

  const toggleWorker = async () => {
    const action = workerPaused ? "resume" : "pause";
    try {
      await fetch("/api/worker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      setWorkerPaused(action === "pause");
    } catch (err) {
      console.error("Failed to toggle worker", err);
    }
  };

  // Start/stop interval based on worker status
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!workerPaused) {
      intervalRef.current = setInterval(() => {
        fetchCampaigns();
        fetchScreens();
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [workerPaused]);

  useEffect(() => {
    fetchCampaigns();
    fetchScreens();
    fetchWorkerStatus();
  }, []);

  return { campaigns, screens, loading, workerPaused, simulateEvent, toggleWorker };
};
