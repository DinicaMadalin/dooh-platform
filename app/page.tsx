import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-800">

          Hope NOT!
        </h1>
        <img
          src="https://i.imgflip.com/a9hopp.jpg"
          alt="Meme image"
          width={800}
          height={800}
          className="mx-auto rounded-lg shadow-md"
        />
      </div>

      <div className="mt-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Click Below
        </h2>
        <Link href="/dashboard">
          <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
