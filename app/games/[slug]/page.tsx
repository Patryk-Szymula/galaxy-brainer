import { notFound } from "next/navigation";
import { GAME_REGISTRY, GameSlug } from "@/lib/gameRegistry";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: Props) {
  // Extract slug and find corresponding game
  const { slug } = await params;
  const gameSlug = slug as GameSlug;
  const gameConfig = GAME_REGISTRY[gameSlug];

  // Handle case where game is not found
  if (!gameConfig) {
    return notFound();
  }

  const GameComponent = gameConfig.component;

  return (
    <div className="flex flex-col items-center w-full max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header with game title and optional description*/}
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl pb-2 font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-sm">
          {gameConfig.title}
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
          {gameConfig.description}
        </p>
      </header>

      {/* Game Component Container */}
      <div className="relative w-full">

        {/* Light Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 pointer-events-none" />

        {/* Game Container with sci-fi styling */}
        <div className="relative w-full min-h-[500px] md:min-h-[600px] bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
          {/* Game Component */}
          <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center">
            <GameComponent />
          </div>
        </div>
        <div className="mt-4 flex justify-between text-xs text-gray-600 font-mono uppercase tracking-widest px-4">
          <span>Control: Mouse / Touch</span>
          <span>Training: {gameConfig.goal}</span>
        </div>
      </div>
    </div>
  );
}