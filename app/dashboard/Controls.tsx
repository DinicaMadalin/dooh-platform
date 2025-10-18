interface ControlsProps {
  view: 'campaigns' | 'screens';
  setView: (view: 'campaigns' | 'screens') => void;
  simulateEvent: () => void;
  toggleWorker: () => void;
  workerPaused: boolean;
}

export default function Controls({ view, setView, simulateEvent, toggleWorker, workerPaused }: ControlsProps) {
  return (
    <div className="mb-6 flex justify-between">
      <div className="flex gap-3">
        <button
          onClick={simulateEvent}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition duration-200 hover:bg-blue-700"
        >
          Generate Event
        </button>
        <button
          onClick={toggleWorker}
          className="rounded bg-gray-200 px-4 py-2 text-sm text-red-600 transition duration-200 hover:bg-gray-300"
        >
          {workerPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setView('campaigns')}
          className={`${view === 'campaigns' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'} rounded px-4 py-2 text-sm text-gray-800 transition duration-200`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setView('screens')}
          className={`${view === 'screens' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'} rounded px-4 py-2 text-sm text-gray-800 transition duration-200`}
        >
          Screens
        </button>
      </div>
    </div>
  );
}
