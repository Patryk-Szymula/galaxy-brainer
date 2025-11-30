import Link from "next/link";
import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="text-gray-400 hover:text-white transition-colors text-sm border border-gray-700 px-4 py-2 rounded-full hover:border-white"
        >
          &larr; Wyjdź do menu
        </Link>
      </div>
      {children}
    </div>
  );
}