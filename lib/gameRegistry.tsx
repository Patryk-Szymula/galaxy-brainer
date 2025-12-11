import ReflexGame from '@/components/game/reflex/ReflexGame';
import SequenceGame from '@/components/game/sequence/SequenceGame';
import CodeGame from '@/components/game/code/CodeGame';
import CountingGame from '@/components/game/counting/CountingGame';

export const GAME_REGISTRY = {
    'reflex': {
        component: ReflexGame,
        title: 'Space Reflex',
        shortDescription: 'Ignite your neural pathways! Test your reaction time and engage your hyper-drive the moment the signal turns green.',
        longDescription: {
            description: 'In the vacuum of space, hesitation is dangerous. Space Reflex is the ultimate reaction time test designed to sharpen your cognitive processing speed.',
            rules: 'Wait for the visual signal. The moment the screen flashes green, click or tap instantly. Your reaction time is measured in milliseconds. Train daily to lower your latency and achieve a reflex speed worthy of a starship commander.'
        },
        skills: 'Reaction speed, Visual Focus',
        metadata: {
            title: 'Space Reflex - Online Reaction Time Test | Galaxy Brainer',
            description: 'Train your reflexes with Space Reflex. A fast-paced reaction time game to improve your cognitive processing speed and visual focus. Play for free.'
        }
    },
    'sequence': {
        component: SequenceGame,
        title: 'Space Reflex',
        shortDescription: 'Follow the constellation pattern. Push your visual memory to the limit as the sequence expands across the galaxy grid.',
        longDescription: {
            description: 'Navigation systems are flashing a complex path through the stars. Cosmic Sequence challenges your short-term memory and pattern recognition skills.',
            rules: 'Watch the sequence of lights carefully on the grid (expanding from 2x2 to 4x4). Repeat the pattern exactly. Each round adds a new step to the sequence. One wrong move resets your progress. How long can you maintain the signal?'
        },
        skills: 'Working Memory, Pattern Recognition',
        metadata: {
            title: 'Cosmic Sequence - Visual Memory Pattern Game | Galaxy Brainer',
            description: 'Challenge your working memory with Cosmic Sequence. Memorize and repeat complex light patterns in this space-themed brain training puzzle. Play for free.'
        }
    },
    'code': {
        component: CodeGame,
        title: 'Space Reflex',
        shortDescription: 'Intercept the encrypted transmission. Memorize the random number codes before they vanish into the void.',
        longDescription: {
            description: 'Security clearance required. Starship Code is a high-intensity drill for your mnemonic capacity and immediate recall.',
            rules: 'A random numeric code will appear on your HUD for a few seconds. Focus and memorize it instantly. When it disappears, type the code to authorize the launch. The codes get longer with every success. One error aborts the mission.'
        },
        skills: 'Short-term Recall, Cognitive Focus',
        metadata: {
            title: 'Starship Code - Number Recall & Memory Training | Galaxy Brainer',
            description: 'Boost your short-term memory with Starship Code. Memorize random numeric codes instantly and improve your focus and retention skills. Play for free.'
        }
    },
    'counting': {
        component: CountingGame,
        title: 'Space Reflex',
        shortDescription: 'Calibrate your mental trajectory. Perform rapid mental arithmetic to keep your onboard computer running.',
        longDescription: {
            description: 'Your navigation computer is offline; you must calculate the coordinates manually. Counting Star trains your mental math agility and ability to sustain attention under pressure.',
            rules: 'A series of numbers (from -10 to 10) will appear sequentially. Keep a running total in your head. When the stream ends, enter the final sum. Precision is key—train your brain to calculate faster than a machine.'
        },
        skills: 'Mental Arithmetic, Sustained Attention',
        metadata: {
            title: 'Counting Star - Mental Math & Arithmetic Game | Galaxy Brainer',
            description: 'Practice mental arithmetic with Counting Star. A fun way to improve calculation speed and sustained attention through rapid math challenges. Play for free.'
        }
    }
};

export type GameSlug = keyof typeof GAME_REGISTRY;