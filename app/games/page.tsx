import { notFound } from "next/navigation";
import { GAME_REGISTRY, GameSlug } from "@/lib/gameRegistry";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const GameSlug = slug as GameSlug;
  const gameConfig = GAME_REGISTRY[GameSlug];

  if (!gameConfig) {
    return notFound();
  }

  const GameComponent = gameConfig.component;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <GameComponent />
    </div>
  );
}