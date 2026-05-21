import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        
        <div className="flex justify-center mb-6">
          <AlertTriangle size={70} className="text-red-500" />
        </div>

        <h1 className="text-7xl font-bold text-gray-900">404</h1>

        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-3">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}