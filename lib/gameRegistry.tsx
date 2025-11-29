import ReflexGame from '@/components/game/reflex/ReflexGame';

export const GAME_REGISTRY = {
    'reflex': {
        component: ReflexGame,
        title: 'Space Reflex',
        description: 'Test your reflexes in this space game!',
    }
};

export type GameSlug = keyof typeof GAME_REGISTRY;