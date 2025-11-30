import Link from "next/link";
import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-4 font-sans">
      {children}
    </div>
  );
}