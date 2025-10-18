import { Campaign, Screens } from "../../lib/types.ts";

interface TableProps {
  view: 'campaigns' | 'screens';
  data: Campaign[] | Screens[];
}

export default function Table({ view, data }: TableProps) {
  console.log("Table data for view", view, ":", data); // Debug log

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <h2 className="mb-3 text-lg font-medium text-gray-800">{view === 'campaigns' ? 'Campaign' : 'Screen'} Details</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b-2 border-gray-300 p-2 text-left font-semibold text-gray-700">{view === 'campaigns' ? 'Campaign ID' : 'Screen ID'}</th>
            <th className="border-b-2 border-gray-300 p-2 text-left font-semibold text-gray-700">Play Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || `row-${index}`}><td className="border-b border-gray-200 p-2 text-gray-800">{item.id}</td><td className="border-b border-gray-200 p-2 text-gray-800">{item.play_count}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
