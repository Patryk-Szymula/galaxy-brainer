'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { generateCode, GameState } from '@/engine/code/engine';

export default function CodeGame() {
    const [level, setLevel] = useState(1);
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [gameState, setGameState] = useState<GameState>('idle');
    const [showCode, setShowCode] = useState(false);

    // Game Logic

    const startRound = useCallback((incrementLevel: boolean = false) => {
        const nextLevel = incrementLevel ? level + 1 : level;
        if (incrementLevel) setLevel(nextLevel);

        const newCode = generateCode(nextLevel);
        setCode(newCode);

        setInput('');
        setGameState('memorize');
        setShowCode(true);

        // Code displaying time: base 1.5s + 0.5s per level
        const displayTime = 1000 + (level * 500);

        const timer = setTimeout(() => {
            setShowCode(false);
            setGameState('input');
        }, displayTime);

        return () => clearTimeout(timer);
    }, [level]);

    const handlePadClick = (digit: string) => {
        if (gameState !== 'input') return;

        const newInput = input + digit;
        setInput(newInput);

        if (newInput === code) {
            // Success
            setGameState('success');
        } else if (!code.startsWith(newInput)) {
            // Mistake
            setGameState('gameover');
        }
    };

    // Next round starts automatic
    useEffect(() => {
        if (gameState === 'success') {
            const timeout = setTimeout(() => {
                startRound(true);
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [level, gameState, startRound]);


    const resetGame = () => {
        setLevel(1);
        setGameState('idle');
        setInput('');
        setCode('');
    };

    // Style helpers

    // Font styles
    const getDynamicFontSize = (textLength: number) => {
        if (textLength <= 5) return 'text-6xl md:text-8xl';
        if (textLength <= 8) return 'text-5xl md:text-7xl';
        if (textLength <= 12) return 'text-4xl md:text-5xl';
        if (textLength <= 20) return 'text-2xl md:text-4xl';
        if (textLength <= 35) return 'text-xl md:text-2xl';
        return 'text-lg md:text-xl';
    };

    // Border and background colors based on the state
    const getScreenStyles = () => {
        switch (gameState) {
            case 'gameover':
                return 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] bg-red-950/40';
            case 'success':
                return 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)] bg-green-950/40';
            case 'memorize':
                return 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] bg-slate-900/90';
            case 'input':
                return 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-slate-900/80';
            default: // IDLE
                return 'border-slate-600 bg-slate-900/50';
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 min-h-[500px]">

            {/* Code display | Left side */}
            <div className="flex-1 w-full flex flex-col items-center justify-center order-1">
                <div className={`
                    relative w-full aspect-video border-4 rounded-2xl flex items-center justify-center overflow-hidden
                    transition-all duration-500 ease-in-out px-4 py-4
                    ${getScreenStyles()}
                `}>

                    {/* Grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                    {/* Display content */}
                    <div className="relative z-10 text-center w-full max-w-full break-all px-2">

                        {gameState === 'idle' && (
                            <div>
                                <p className="text-cyan-400 text-lg mb-4 tracking-widest uppercase">System Ready</p>
                                <button
                                    onClick={() => startRound(false)}
                                    className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded shadow-[0_0_15px_cyan] transition-all transform hover:scale-105 uppercase tracking-widest"
                                >
                                    START
                                </button>
                            </div>
                        )}

                        {gameState === 'memorize' && (
                            <div className="flex flex-col items-center w-full">
                                <p className="text-cyan-500/70 text-sm uppercase tracking-[0.3em] mb-4 animate-pulse">Remember the code</p>
                                <div className={`
                                    font-mono text-cyan-100 tracking-[0.1em] leading-tight 
                                    drop-shadow-[0_0_15px_rgba(103,232,249,0.9)] w-full break-words whitespace-pre-wrap
                                    ${getDynamicFontSize(code.length)}
                                `}>
                                    {showCode ? code : <span className="opacity-0">{code}</span>}
                                </div>
                            </div>
                        )}

                        {gameState === 'input' && (
                            <div className="w-full max-w-lg mx-auto">
                                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2 animate-pulse">Enter the code</p>

                                <div className={`
                                    min-h-[4rem] bg-black/40 border border-slate-700 rounded p-4
                                    flex flex-wrap items-center justify-center 
                                    text-white font-mono tracking-[0.2em] break-all leading-none
                                    ${getDynamicFontSize(code.length)} 
                                `}>
                                    {input}
                                    <span className="inline-block w-[0.1em] h-[0.8em] bg-cyan-500 ml-1 animate-pulse align-middle" />
                                </div>

                                <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-500 transition-all duration-300"
                                        style={{ width: `${(input.length / code.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {gameState === 'success' && (
                            <div className="animate-bounce">
                                <div className="text-5xl md:text-6xl text-green-400 font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                                    OK
                                </div>
                                <p className="text-green-600/80 mt-2 uppercase tracking-widest text-sm">
                                    Level {level} completed
                                </p>
                            </div>
                        )}

                        {gameState === 'gameover' && (
                            <div className="animate-shake">
                                <div className="text-4xl md:text-5xl text-red-500 font-bold tracking-widest uppercase mb-4 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                    MISTAKE
                                </div>
                                <p className="text-gray-400 mb-6">You have reached level: <span className="text-white font-bold">{level}</span></p>
                                <button
                                    onClick={resetGame}
                                    className="px-6 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors uppercase font-bold tracking-wider rounded"
                                >
                                    Restart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Keypad | Right side */}
            <div className="w-full max-w-[320px] order-2 md:order-2">
                <div className="bg-slate-800 p-6 rounded-xl border-t border-l border-slate-600 border-b-4 border-r-4 border-slate-900 shadow-2xl relative">

                    {/* Decorative screws in the corners */}
                    <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 shadow-inner"></div>
                    <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 shadow-inner"></div>
                    <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 shadow-inner"></div>
                    <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 shadow-inner"></div>

                    {/* Level display above the keyboard */}
                    <div className="mb-6 flex justify-between items-end border-b border-slate-700 pb-2 mx-2">
                        <span className="text-[10px] text-slate-500 font-mono uppercase">SECURE_PAD_V1</span>
                        <span className="text-xs text-cyan-400 font-mono uppercase font-bold">LVL: {level}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <KeypadButton
                                key={num}
                                digit={num.toString()}
                                onClick={() => handlePadClick(num.toString())}
                                disabled={gameState !== 'input'}
                            />
                        ))}

                        {/* Empty (or Delete) Button */}
                        <div className="flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${gameState === 'input' ? 'bg-red-500 animate-ping' : 'bg-slate-700'}`}></div>
                        </div>

                        <KeypadButton
                            digit="0"
                            onClick={() => handlePadClick("0")}
                            disabled={gameState !== 'input'}
                        />

                        {/* Enter Button (Dummy) */}
                        <div className="flex items-center justify-center opacity-40">
                            <span className="text-[10px] text-slate-400 font-mono rotate-90">ENTER</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Keypad key
const KeypadButton = ({ digit, onClick, disabled }: { digit: string, onClick: () => void, disabled: boolean }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
            h-16 flex items-center justify-center text-2xl font-mono font-bold rounded shadow-lg
            transition-all duration-100 select-none
            ${disabled
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed border-t border-slate-600 opacity-60'
                : 'bg-slate-700 text-cyan-100 border-t border-cyan-500/30 active:scale-95 active:bg-cyan-900 active:border-cyan-400 hover:bg-slate-600 active:shadow-none shadow-[0_4px_0_rgb(15,23,42)] active:translate-y-1'}
        `}
    >
        {digit}
    </button>
);

