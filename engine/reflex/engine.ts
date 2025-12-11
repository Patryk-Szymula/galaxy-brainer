// Define the possible states of the game
export type GameState =
    | 'idle' // Waiting to start
    | 'waiting' // Waiting for the color change
    | 'ready' // Color has changed, waiting for user reaction
    | 'tooSoon' // User clicked too soon
    | 'finished'; // After the reaction time has been recorded

// Define time measurements in milliseconds
export const MIN_WAIT_TIME = 2000; // Minimum wait time before color change
export const MAX_WAIT_TIME = 5000; // Maximum wait time before color change

// Function to get a random wait time between MIN_WAIT_TIME and MAX_WAIT_TIME
export function getRandomWaitTime(): number {
    return Math.floor(Math.random() * (MAX_WAIT_TIME - MIN_WAIT_TIME + 1)) + MIN_WAIT_TIME;
};