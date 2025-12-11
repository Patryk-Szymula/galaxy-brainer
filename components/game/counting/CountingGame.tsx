'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

import { GameState, generateMathSequence, validateResult } from '@/engine/counting/engine';
import { GAME_CONFIG } from '@/engine/counting/constants';

export default function CountingStarGame() {
    const [numberCount, setNumberCount] = useState(GAME_CONFIG.defaultSequenceLength); // Default count of numbers
    const [gameState, setGameState] = useState<GameState>('config');
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);
    const [targetSum, setTargetSum] = useState(0);
    const [input, setInput] = useState('');

    const sequenceRef = useRef<number[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);


    // Game Logic
    const prepareGame = () => {
        const { sequence, targetSum } = generateMathSequence(numberCount);
        sequenceRef.current = sequence;
        setTargetSum(targetSum);
        setGameState('ready');
    };

    const startGame = useCallback(() => {
        setGameState('playing');
        setInput('');

        const sequence = sequenceRef.current;
        const displayTime = GAME_CONFIG.displayTime;
        const blankTime = GAME_CONFIG.blankTime;
        const cycleTime = displayTime + blankTime;

        sequence.forEach((num, index) => {
            // Show number
            const showTimer = setTimeout(() => {
                setCurrentNumber(num);
            }, index * cycleTime);

            // Break
            const hideTimer = setTimeout(() => {
                setCurrentNumber(null);
            }, (index * cycleTime) + displayTime);

            timeoutsRef.current.push(showTimer, hideTimer);
        });

        // End of sequence
        const endTimer = setTimeout(() => {
            setGameState('input');
        }, sequence.length * cycleTime);

        timeoutsRef.current.push(endTimer);

    }, []);

    // Clean timers
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };
    }, []);

    const resetGame = () => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        setGameState('config');
        setCurrentNumber(null);
        setInput('');
    };

    // Keyobord inputs
    const handlePadClick = (action: string) => {
        if (gameState !== 'input') return;

        // Confirm result
        if (action === 'ENTER') {
            if (input === '') return;
            const isCorrect = validateResult(input, targetSum);
            setGameState(isCorrect ? 'success' : 'gameover');
            return;
        }

        // Remove char
        if (action === 'DEL') {
            setInput((prev) => {
                const newValue = prev.slice(0, -1);
                return newValue === '-' ? '' : newValue;
            });
            return;
        }

        // Change of sign
        if (action === '+/-') {
            if (input === '0' || input === '') return;

            setInput((prev) => {
                if (prev.startsWith('-')) return prev.slice(1);
                return '-' + prev;
            });
            return;
        }

        // Number type
        if (input.replace('-', '').length < GAME_CONFIG.maxInputLength) {
            if (input === '0' && action !== '0') {
                setInput(action);
            } else if (input === '0' && action === '0') {
                return;
            } else {
                setInput((prev) => prev + action);
            }
        }
    };

    // Style helpers

    // Border and background colors based on the state
    const getScreenStyles = () => {
        switch (gameState) {
            case 'gameover':
                return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] bg-red-950/40';
            case 'success':
                return 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)] bg-green-950/40';
            case 'playing':
                return 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-900/90';
            case 'input':
                return 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-slate-900/95'; // Nieco ciemniejsze tło dla lepszego kontrastu klawiatury
            default: // config, ready
                return 'border-slate-600 bg-slate-900/50';
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-1 items-center justify-center">

            {/* --- Main display --- */}
            <div className={`
                relative w-full h-full border-4 rounded-2xl flex flex-col items-center justify-center overflow-hidden
                transition-colors duration-500 ease-in-out
                ${getScreenStyles()}
            `}>

                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* --- content --- */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                    {/* 1. Configuration */}
                    {gameState === 'config' && (
                        <div className="w-full max-w-md mx-auto animate-[fadeIn_0.5s_ease-out] text-center">
                            <h2 className="text-cyan-400 text-2xl mb-8 tracking-widest uppercase font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
                                Configuration
                            </h2>

                            <div className="mb-10 bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                                <label className="block text-slate-400 text-sm uppercase tracking-wider mb-4">
                                    Sequence Length: <span className="text-white font-bold text-xl ml-2">{numberCount}</span>
                                </label>
                                <input
                                    type="range"
                                    min={GAME_CONFIG.minSequenceLength}
                                    max={GAME_CONFIG.maxSequenceLength}
                                    value={numberCount}
                                    onChange={(e) => setNumberCount(Number(e.target.value))}
                                    className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
                                />
                                <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                                    <span>{GAME_CONFIG.minSequenceLength}</span>
                                    <span>{GAME_CONFIG.maxSequenceLength}</span>
                                </div>
                            </div>

                            <button
                                onClick={prepareGame}
                                className="px-12 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_20px_rgba(8,145,178,0.6)] transition-transform hover:scale-105 uppercase tracking-widest border border-cyan-400 text-lg"
                            >
                                Initialize
                            </button>
                        </div>
                    )}

                    {/* 2. Ready */}
                    {gameState === 'ready' && (
                        <div className="animate-[zoomIn_0.3s_ease-out] text-center">
                            <p className="text-cyan-400 text-xl mb-8 tracking-[0.3em] uppercase drop-shadow-sm">Connect Neural Link</p>
                            <button
                                onClick={startGame}
                                className="px-16 py-6 bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-bold rounded-full shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all uppercase tracking-widest text-2xl"
                            >
                                START
                            </button>
                        </div>
                    )}

                    {/* 3. Playing */}
                    {gameState === 'playing' && (
                        <div className="flex items-center justify-center">
                            {currentNumber !== null ? (
                                <div className={`
                                    font-mono font-bold tracking-tighter transition-transform duration-100 scale-110
                                    ${currentNumber < 0 ? 'text-red-400 drop-shadow-[0_0_25px_rgba(248,113,113,0.9)]' : 'text-cyan-100 drop-shadow-[0_0_25px_rgba(103,232,249,0.9)]'}
                                    text-9xl
                                `}>
                                    {currentNumber}
                                </div>
                            ) : (
                                <div className="w-6 h-6 bg-slate-700/50 rounded-full" />
                            )}
                        </div>
                    )}

                    {/* 4. Input */}
                    {gameState === 'input' && (
                        <div className="w-full max-w-md flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">

                            {/* Result display */}
                            <div className="mb-6 w-full flex flex-col items-center">
                                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Target Sum Calculation</p>
                                <div className="
                                    w-full h-24 bg-black/60 border border-slate-600 rounded-lg px-8
                                    flex items-center justify-center 
                                    text-white font-mono tracking-[0.1em]
                                    text-5xl shadow-inner leading-none
                                ">
                                    {input || <span className="text-slate-600"></span>}
                                    <span className="inline-block w-[2px] h-[40px] bg-cyan-500 ml-2 animate-pulse" />
                                </div>
                            </div>

                            {/* Keypad */}
                            <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                    <KeypadButton
                                        key={num}
                                        label={num.toString()}
                                        onClick={() => handlePadClick(num.toString())}
                                    />
                                ))}

                                <KeypadButton
                                    label="+/-"
                                    onClick={() => handlePadClick('+/-')}
                                    variant="secondary"
                                />

                                <KeypadButton
                                    label="0"
                                    onClick={() => handlePadClick("0")}
                                />

                                <KeypadButton
                                    label="<"
                                    onClick={() => handlePadClick("DEL")}
                                    variant="warning"
                                />
                            </div>

                            {/* enter button */}
                            <button
                                onClick={() => handlePadClick("ENTER")}
                                className="mt-4 w-full max-w-[300px] py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded shadow-lg uppercase tracking-widest border-t border-cyan-500 transition-transform active:scale-95"
                            >
                                CONFIRM DATA
                            </button>
                        </div>
                    )}

                    {/* 5. Success */}
                    {gameState === 'success' && (
                        <div className="animate-[zoomIn_0.4s_ease-out] text-center">
                            <div className="text-6xl text-green-400 font-bold tracking-widest uppercase drop-shadow-[0_0_15px_rgba(74,222,128,0.6)]">
                                CORRECT
                            </div>
                            <div className="text-9xl text-white font-mono my-6 drop-shadow-xl">{targetSum}</div>
                            <button
                                onClick={resetGame}
                                className="mt-4 px-8 py-3 border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-white uppercase tracking-wider text-sm font-bold transition-all rounded-full"
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                    {/* 6. Gameover */}
                    {gameState === 'gameover' && (
                        <div className="animate-[zoomIn_0.4s_ease-out] text-center w-full max-w-lg">
                            <div className="text-5xl text-red-500 font-bold tracking-widest uppercase mb-2 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
                                FAILURE
                            </div>
                            <p className="text-slate-400 uppercase text-xs tracking-widest mb-8">Calculation Mismatch</p>

                            <div className="flex justify-center gap-12 mb-10 font-mono">
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 uppercase mb-1">Your Input</div>
                                    <div className="text-3xl text-red-400 line-through decoration-red-600/50">{input || 'NULL'}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-slate-500 uppercase mb-1">Correct Sum</div>
                                    <div className="text-3xl text-green-400 border-b border-green-500/30 pb-1">{targetSum}</div>
                                </div>
                            </div>

                            <button
                                onClick={resetGame}
                                className="px-10 py-3 bg-red-900/20 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase font-bold tracking-wider rounded shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

}

// Keypad key
const KeypadButton = ({
    label,
    onClick,
    variant = 'primary'
}: {
    label: string,
    onClick: () => void,
    variant?: 'primary' | 'secondary' | 'warning'
}) => {

    let baseColor = 'bg-slate-800/80 text-cyan-100 border border-slate-600 hover:bg-cyan-900/50 hover:border-cyan-500/50';
    if (variant === 'secondary') baseColor = 'bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-slate-700/80';
    if (variant === 'warning') baseColor = 'bg-red-900/20 text-red-300 border border-red-900/50 hover:bg-red-900/40';

    return (
        <button
            onClick={onClick}
            className={`
                h-14 flex items-center justify-center text-xl font-mono font-bold rounded
                transition-all duration-100 select-none backdrop-blur-sm
                ${baseColor} active:scale-95 active:bg-cyan-800
            `}
        >
            {label}
        </button>
    );
};