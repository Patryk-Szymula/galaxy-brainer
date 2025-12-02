import { GridSize } from "./constants";

export type GameState =
    'menu' | // Initial menu state
    'demonstrating' | // Showing the sequence to the player
    'input' | // Waiting for player input
    'gameover' | // Player made a mistake
    'success'; // Player completed the sequence successfully

// Function to get the next step in the sequence
export const getNextStep = (gridSize: GridSize): number => {
    const totalTiles = gridSize * gridSize;
    return Math.floor(Math.random() * totalTiles);
};

// Utility function to create a delay
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));