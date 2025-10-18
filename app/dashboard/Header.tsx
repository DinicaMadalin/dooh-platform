interface HeaderProps {
  workerPaused: boolean;
}

export default function Header({ workerPaused }: HeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
      <h1 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h1>
      <div className="flex items-center gap-2 text-sm">
        <span className={`${workerPaused ? 'bg-red-500' : 'bg-green-500'} h-2.5 w-2.5 rounded-full`}></span>
        <span className="font-medium text-gray-600">Status: {workerPaused ? 'Paused' : 'Active'}</span>
      </div>
    </div>
  );
}
