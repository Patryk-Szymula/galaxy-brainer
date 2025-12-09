import { GAME_CONFIG } from './constants';

export type GameState =
    | 'config' // Waiting to configure
    | 'ready' // Waiting to start
    | 'playing' // Playing
    | 'input' // Waiting to player input
    | 'success' // Player completed the target sum successfully
    | 'gameover'; // Player made a mistake

export type SequenceResult = {
    sequence: number[];
    targetSum: number;
};

/*
Generating random sequence of arithmetic numbers (without 0 to keep dynamic)
*/

export const generateMathSequence = (length: number): SequenceResult => {
    const sequence: number[] = [];
    let sum = 0;

    for (let i = 0; i < length; i++) {
        let num = 0;
        while (num === 0) {
            const min = Math.ceil(GAME_CONFIG.minNumber);
            const max = Math.floor(GAME_CONFIG.maxNumber);
            num = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        sequence.push(num);
        sum += num;
    }

    return { sequence, targetSum: sum };
}

export const validateResult = (input: string, targetSum: number): boolean => {
    const parsedInput = parseInt(input, 10);
    return !isNaN(parsedInput) && parsedInput === targetSum;
}