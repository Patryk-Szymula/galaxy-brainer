import ReflexGame from '@/components/game/reflex/ReflexGame';
import SequenceGame from '@/components/game/sequence/SequenceGame';
import CodeGame from '@/components/game/code/CodeGame';
import CountingGame from '@/components/game/counting/CountingGame';

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
    },
    'counting': {
        component: CountingGame,
        title: 'Counting Star',
        description: 'Add a series of rapidly appearing numbers and keep the running total in your head!',
        goal: 'mental arithmetic'
    }
};

export type GameSlug = keyof typeof GAME_REGISTRY;