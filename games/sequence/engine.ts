import { GridSize } from "./constants";

// Function to get the next step in the sequence
export const getNextStep = (gridSize: GridSize): number => {
    const totalTiles = gridSize * gridSize;
    return Math.floor(Math.random() * totalTiles);
};

// Utility function to create a delay
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));