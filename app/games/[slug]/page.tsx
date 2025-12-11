import { notFound } from "next/navigation";
import type { Metadata } from 'next'
import { GAME_REGISTRY, GameSlug } from "@/lib/gameRegistry";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const gameSlug = slug as GameSlug;
  const gameConfig = GAME_REGISTRY[gameSlug];

  if (!gameConfig) {
    return {
      title: 'Game Not Found | Galaxy Brainer',
    };
  }

  return {
    title: gameConfig.metadata.title,
    description: gameConfig.metadata.description,
    openGraph: {
      title: gameConfig.metadata.title,
      description: gameConfig.metadata.description,
      type: 'website',
      siteName: 'Galaxy Brainer',
      locale: 'en_US',
      // images: [
      //   {
      //     url: `/${gameSlug}.png`, // Np. dedykowana grafika dla danej gry
      //     width: 1200,
      //     height: 630,
      //     alt: gameConfig.title,
      //   },
      // ]
    }
  };
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


  // --- JSON-LD - configuration of structural data ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: gameConfig.title,
    description: gameConfig.metadata.description,
    genre: ['Puzzle', 'Educational', 'Brain Training', gameConfig.skills],
    url: `https://galaxybrainer.com/games/${slug}`,
    // image: `https://galaxybrainer.com/images/${slug}.jpg`,
    applicationCategory: 'Game',
    operatingSystem: 'Any',
    author: {
      '@type': 'Organization',
      name: 'Galaxy Brainer',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
  // ------------------------------------------------------------


  return (
    <div className="flex flex-col items-center w-full max-w-5xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Structural data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with game title and optional description*/}
      <header className="mb-8 text-center space-y-2">
        <h1 className="text-4xl md:text-5xl pb-2 font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-sm">
          {gameConfig.title}
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
          {gameConfig.longDescription.description}
        </p>
        <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto">
          Mission Rules: {gameConfig.longDescription.rules}
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
          <span>Training: {gameConfig.skills}</span>
        </div>
      </div>
    </div>
  );
}