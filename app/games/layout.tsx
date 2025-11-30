import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full text-white flex flex-1 flex-col items-center justify-center p-4 font-sans">
      {children}
    </div>
  );
}