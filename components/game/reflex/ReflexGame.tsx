'use client';

import { useState, useRef } from "react";
import { GameState, getRandomWaitTime } from '@/games/reflex/engine';

export default function ReflexGame() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);

    const startTimeRef = useRef<number>(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle the start of the game
    const handleStart = () => {
        // Transition to waiting state
        setGameState('waiting');
        setReactionTime(null);

        // Set a random timeout for the color change
        const waitTime = getRandomWaitTime();

        // Schedule the color change
        timeoutRef.current = setTimeout(() => {
            setGameState('ready');
            startTimeRef.current = Date.now();
        }, waitTime);
    };

    // Handle user click
    const handleClick = () => {
        switch (gameState) {
            case 'idle':
                // Start the game
                handleStart();
                break;
            case 'waiting':
                // User clicked too soon
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                setGameState('tooSoon');
                break;
            case 'ready':
                // User reacted
                const endTime = Date.now();
                const time = endTime - startTimeRef.current;
                setReactionTime(time);
                setGameState('finished');
                break;
            case 'tooSoon':
            // Reset to idle
            case 'finished':
                // Reset to idle
                setGameState('idle');
                setReactionTime(null);
                break;
        }
    };

    // Map states to display properties
    const stateProperties = {
        'idle': { text: 'Click to Start', color: 'bg-gray-300' },
        'waiting': { text: 'Wait for Green...', color: 'bg-red-500' },
        'ready': { text: 'Click Now!', color: 'bg-green-500' },
        'tooSoon': { text: 'Too Soon! Click to Retry', color: 'bg-yellow-500' },
        'finished': { text: `Your Time: ${reactionTime} ms. Click to Retry`, color: 'bg-blue-500' },
    };

    return (
        <div
            className={`flex items-center justify-center w-full h-full rounded-lg cursor-pointer select-none ${stateProperties[gameState].color}`}
            onClick={handleClick}
        >
            <div className="text-white text-center font-bold pointer-events-none">
                {gameState === 'idle' && (
                    <>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white"> Reaction Test </h2>
                        <p className="text-lg md:text-2xl"> Click to Start </p>
                    </>
                )}

                {gameState === 'waiting' && (
                    <h2 className="text-2xl md:text-4xl animate-pulse"> Wait for Green... </h2>
                )}

                {gameState === 'ready' && (
                    <h2 className="text-2xl md:text-4xl"> Click Now! </h2>
                )}

                {gameState === 'tooSoon' && (
                    <>
                        <h2 className="text-2xl md:text-4xl"> Too Soon!</h2>
                        <p className="text-lg md:text-2xl mt-2"> Click to Retry </p>
                    </>
                )}

                {gameState === 'finished' && reactionTime !== null && (
                    <>
                        <h2 className="text-2xl md:text-4xl"> Your Time: {reactionTime} ms </h2>
                        <p className="text-lg md:text-2xl mt-2"> Click to Retry </p>
                    </>
                )}
            </div>
        </div>
    );

};


