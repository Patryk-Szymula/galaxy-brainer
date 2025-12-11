'use client';

import { useState, useRef } from "react";
import { GameState, getRandomWaitTime } from '@/engine/reflex/engine';

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
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
    const stateStyles = {
        idle: {
            container: "bg-gray-900 hover:bg-gray-800",
            title: "text-gray-400",
            sub: "text-cyan-400 animate-pulse",
            content: (
                <>
                    <h2 className="text-3xl font-bold tracking-widest uppercase">System Ready</h2>
                    <p className="mt-2 font-mono text-sm tracking-wider">Click to Start</p>
                </>
            )
        },
        waiting: {
            container: "bg-rose-950 shadow-[inset_0_0_100px_rgba(225,29,72,0.3)]",
            content: (
                <>
                    <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin mb-6" />
                    <h2 className="text-4xl font-bold text-red-500 tracking-widest uppercase animate-pulse">WAIT...</h2>
                </>
            )
        },
        ready: {
            container: "bg-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.8)] duration-0 scale-[1.02]",
            content: (
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter transform scale-110">
                    CLICK NOW!
                </h2>
            )
        },
        tooSoon: {
            container: "bg-yellow-900/90 animate-pulse",
            content: (
                <>
                    <h2 className="text-4xl font-bold text-yellow-500 mb-2">FALSTART</h2>
                    <p className="text-yellow-200/70 font-mono">You clicked too soon!</p>
                    <p className="mt-8 text-sm uppercase tracking-widest text-white/50">Click to try again</p>
                </>
            )
        },
        finished: {
            container: "bg-slate-900/90",
            content: (
                <>
                    <h2 className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-2">Reaction Time</h2>
                    <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-mono">
                        {reactionTime}<span className="text-2xl text-gray-600 ml-2">ms</span>
                    </div>
                    <div className="mt-8 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm text-gray-300">
                        Click to Restart
                    </div>
                </>
            )
        }
    };

    const currentStyle = stateStyles[gameState];

    return (
        <div
            className={`
                relative flex flex-col items-center justify-center w-full h-full flex-grow
                cursor-pointer select-none overflow-hidden transition-all duration-200
                ${currentStyle.container}
            `}
            onMouseDown={handleClick}
        >
            {/* Dekoracyjne tło siatki widoczne tylko w ciemnych trybach */}
            {(gameState === 'idle' || gameState === 'finished') && (
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
            )}

            <div className="relative z-10 text-center flex flex-col items-center pointer-events-none">
                {currentStyle.content}
            </div>
        </div>
    );
}


