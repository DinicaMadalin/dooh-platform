"use client";
import { useState } from "react";
import Header from "./Header";
import Controls from "./Controls";
import Chart from "./Chart";
import Table from "./Table";
import { useDataFetching } from "./useDataFetching";
import { Campaign, Screens } from "../../lib/types.ts";

export default function DashboardPage() {
  const [view, setView] = useState<'campaigns' | 'screens'>('campaigns');
  const { campaigns, screens, loading, workerPaused, simulateEvent, toggleWorker } = useDataFetching();

  const chartData: { name: string; plays: number }[] = view === 'campaigns'
    ? campaigns.map((c: Campaign) => ({ name: c.id, plays: c.play_count }))
    : screens.map((s: Screens) => ({ name: s.id, plays: s.play_count }));

  return (
    <main className="min-h-screen bg-gray-50 p-6 shadow-md">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-lg">
        <Header workerPaused={workerPaused} />
        <Controls
          view={view}
          setView={setView}
          simulateEvent={simulateEvent}
          toggleWorker={toggleWorker}
          workerPaused={workerPaused}
        />
        <Chart loading={loading} chartData={chartData} view={view} />
        <Table view={view} data={view === 'campaigns' ? campaigns : screens} />
      </div>
    </main>
  );
}
