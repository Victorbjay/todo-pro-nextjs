import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link href="/" className="text-indigo-600 underline">
        Go Home
      </Link>
    </div>
  );
}
