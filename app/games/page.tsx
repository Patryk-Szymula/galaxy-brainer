import Link from "next/link";
import type { Metadata } from 'next'
import { GAME_REGISTRY } from "@/lib/gameRegistry";

export const metadata: Metadata = {
  title: 'All Brain Games - Logic, Memory & Reflex Puzzles | Galaxy Brainer',
  description: 'Explore our collection of mind games. From reflex tests to mental math, choose your challenge and track your cognitive progress.',
  openGraph: {
    title: 'All Brain Games - Logic, Memory & Reflex Puzzles',
    description: 'Explore our collection of mind games. Choose your challenge and track your cognitive progress.',
    url: 'https://galaxybrainer.com/games',
    siteName: 'Galaxy Brainer',
    // images: [
    //   {
    //     url: 'https://galaxybrainer.com/og-image-games.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Galaxy Brainer Games Collection',
    //   },
    // ],
    type: 'website',
  },
};

export default function GameListPage({ children }: { children: React.ReactNode }) {
  const gameList = Object.entries(GAME_REGISTRY);

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Choose Your Game
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Dive into a selection of brain-teasing games designed to challenge your mind and boost your cognitive skills. Pick a game below to get started!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-4">
        {gameList.map(([slug, game]) => (
          <Link
            key={slug}
            href={`/games/${slug}`} // Chosen game link
            className="group relative flex flex-col h-full p-6 border border-gray-800 rounded-xl bg-gray-900/50 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/20"
          >
            {/* Game */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {game.title}
              </h2>
              <p className="text-gray-400 text-sm text-center flex-grow">
                {game.shortDescription}
              </p>
              <span className="mt-4 inline-block px-4 py-2 text-sm font-medium text-purple-300 bg-purple-900/20 rounded-full border border-purple-700/50 group-hover:bg-purple-800/30 transition-colors">
                Play Now &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}