import { GAME_REGISTRY, GameSlug } from "@/lib/gameRegistry";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const GameSlug = slug as GameSlug;
  const gameConfig = GAME_REGISTRY[GameSlug];

  // Handle case where game is not found
  if (!gameConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <h1 className="text-3xl font-bold">Game not found</h1>
        </main>
      </div>
    );
  }

  const GameComponent = gameConfig.component;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl animate-in fade-in duration-500">

      {/* Header with game title and optional description*/}
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-white uppercase border-b-2 border-white pb-2 px-8">
          {gameConfig.title}
        </h1>
        <p className="text-gray-400 mt-2 text-sm">{gameConfig.description}</p>
      </header>

      {/* aspect-square for mobiles, aspect-video for desktops */}
      <div className="w-full aspect-square md:aspect-video border-4 border-white rounded-xl overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.2)]">
        <GameComponent />
      </div>
    </div>
  );
}