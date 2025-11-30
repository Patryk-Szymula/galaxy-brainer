'use client';

import { useState, useEffect, useRef } from "react";
import { GridSize, GAME_CONFIG, GRID_SIZES } from '@/games/sequence/constants';
import { getNextStep, wait } from '@/games/sequence/engine';
import next from "next";

type GameState =
    'menu' | // Initial menu state
    'demonstrating' | // Showing the sequence to the player
    'input' | // Waiting for player input
    'gameover' | // Player made a mistake
    'success'; // Player completed the sequence successfully

export default function SequenceGame() {
    const [gameState, setGameState] = useState<GameState>('menu'); // Current state of the game
    const [gridSize, setGridSize] = useState<GridSize>(2); // Size of the grid
    const [sequence, setSequence] = useState<number[]>([]); // The sequence to be memorized
    const [playerInput, setPlayerInput] = useState<number[]>([]); // Player's current input
    const [activeTile, setActiveTile] = useState<number | null>(null); // Currently highlighted tile
    const [score, setScore] = useState(0); // Player's score

    const isMounted = useRef(true); // To track component mount status

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Game Logic Functions

    const startGame = async (size: GridSize) => {
        setGridSize(size);
        setSequence([]);
        setPlayerInput([]);
        setScore(0);
        setGameState('demonstrating');
        await wait(500);
        nextRound([]);
    };

    const nextRound = async (currentSequence: number[]) => {
        if (!isMounted.current) return;

        const nextStep = getNextStep(gridSize);
        const newSequence = [...currentSequence, nextStep];
        setSequence(newSequence);
        setPlayerInput([]);
        setGameState('demonstrating');

        await wait(500);

        for (const tileIndex of newSequence) {
            if (!isMounted.current) return;

            setActiveTile(tileIndex);
            await wait(GAME_CONFIG.initialSpeed)

            setActiveTile(null);
            await wait(GAME_CONFIG.gapSpeed);

        }

        if (isMounted.current) {
            setGameState('input');
        }
    };

    const handleTileClick = async (index: number) => {
        if (gameState !== 'input') return;

        setActiveTile(index);
        setTimeout(() => setActiveTile(null), 200);

        const expectedIndex = sequence[playerInput.length];

        if (index === expectedIndex) {
            const newPlayerInput = [...playerInput, index];
            setPlayerInput(newPlayerInput);

            if (newPlayerInput.length === sequence.length) {
                setScore(prev => prev + 1);
                setGameState('success');
                await wait(800);
                nextRound(sequence);
            }
        } else {
            setGameState('gameover');
        }
    };

    // Render Functions
    if (gameState === 'menu') {
        return (
            <div className="flex flex-col items-center gap-6 text-center animate-in fade-in">
                <h2 className="text-2xl text-white"> Select Grid Size to Start</h2>
                <div className="flex gap-4">
                    {([2, 3, 4] as GridSize[]).map((size) => (
                        <button
                            key={size}
                            onClick={() => startGame(size)}
                            className="w-20 h-20 bg-gray-800 border-2 border-gray-600 rounded-xl hover:bg-blue-900 hover:border-blue-400 text-2xl font-bold transition-all"
                        >
                            {size}x{size}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    if (gameState === 'gameover') {
        return (
            <div className="flex flex-col items-center gap-4 text-center animate-in zoom-in duration-300">
                <h2 className="text-4xl font-bold text-white"> Game Over!</h2>
                <p className="text-xl"> Your score: <span className="text-white font-mono">{score}</span></p>
                <button
                    onClick={() => setGameState('menu')}
                    className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const totalTiles = gridSize * gridSize;

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex justify-between w-full px-4 text-sm uppercase tracking-widest text-gray-400">
                <span>Level: {score + 1}</span>
            </div>

            <div
                className={`grid gap-3 w-full max-w-[400px] aspect-square p-4 bg-gray-900/50 rounded-2xl border border-gray-800 ${GRID_SIZES[gridSize]}`}
            >
                {Array.from({ length: totalTiles }).map((_, i) => {
                    const isActive = activeTile === i;
                    return (
                        <button
                            key={i}
                            disabled={gameState !== 'input'}
                            onClick={() => handleTileClick(i)}
                            className={`
                relative rounded-lg transition-all duration-100 border-2
                ${isActive
                                    ? 'bg-cyan-400 border-white shadow-[0_0_30px_rgba(34,211,238,0.6)] scale-95 z-10'
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-500'
                                }
                ${gameState === 'input' ? 'cursor-pointer active:scale-95' : 'cursor-default'}
              `}
                        />
                    );
                })}
            </div>
        </div>
    );
}


