import { StarBackground } from "@/components/ui/StarBackground";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Content Container */}
      <div className="z-10 flex flex-col items-center text-center p-4">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-300 to-gray-600 bg-clip-text text-transparent drop-shadow-lg">
          GALAXY BRAINER DEV
        </h1>
        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
          Train your brain with exciting mini-games designed to boost your memory and reflexes.
          Enjoy a sci-fi themed experience that challenges your cognitive skills.
        </p>
        <div className="flex gap-4">
          <Link
            href="/games"
            className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
          >
            Start training
          </Link>
        </div>
      </div>
    </main>
  );
}
