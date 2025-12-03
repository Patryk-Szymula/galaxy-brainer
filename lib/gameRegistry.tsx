import ReflexGame from '@/components/game/reflex/ReflexGame';
import SequenceGame from '@/components/game/sequence/SequenceGame';
import CodeGame from '@/components/game/code/CodeGame';

export const GAME_REGISTRY = {
    'reflex': {
        component: ReflexGame,
        title: 'Space Reflex',
        description: 'Test your reflexes in this space game!',
        goal: 'reflex'
    },
    'sequence': {
        component: SequenceGame,
        title: 'Cosmic Sequence',
        description: 'Memorize and repeat the sequence of signals to maintain connection to the base!',
        goal: 'memory'
    },
    'code': {
        component: CodeGame,
        title: 'Starship Code',
        description: 'Memorize rapidly flashing numeric codes and re-enter them on a starship’s keypad!',
        goal: 'memory'
    }
};

export type GameSlug = keyof typeof GAME_REGISTRY;