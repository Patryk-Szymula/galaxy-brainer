import ReflexGame from '@/components/game/reflex/ReflexGame';
import SequenceGame from '@/components/game/sequence/SequenceGame';

export const GAME_REGISTRY = {
    'reflex': {
        component: ReflexGame,
        title: 'Space Reflex',
        description: 'Test your reflexes in this space game!',
    },
    'sequence': {
        component: SequenceGame,
        title: 'Cosmic Sequence',
        description: 'Memorize and repeat the sequence of signals to maintain connection to the base!',
    }
};

export type GameSlug = keyof typeof GAME_REGISTRY;