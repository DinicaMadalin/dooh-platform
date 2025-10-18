import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
  loading: boolean;
  chartData: { name: string; plays: number }[];
  view: 'campaigns' | 'screens';
}

export default function Chart({ loading, chartData, view }: ChartProps) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
      <h2 className="mb-3 text-lg font-medium text-gray-800">{view === 'campaigns' ? 'Campaign' : 'Screen'} Performance</h2>
      {loading ? (
        <div className="flex h-40 items-center justify-center text-gray-500">Loading data...</div>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }} />
            <Legend wrapperStyle={{ fontSize: '14px', color: '#374151' }} />
            <Bar dataKey="plays" fill="#3b82f6" name="Play Count" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-40 items-center justify-center text-gray-500">No data available</div>
      )}
    </div>
  );
}
