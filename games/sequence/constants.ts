export type GridSize = 2 | 3 | 4;

export const GAME_CONFIG = {
    initialSpeed: 600, // Initial speed in milliseconds
    gapSpeed: 200,     // Speed increase per level in milliseconds
    maxSpeed: 200,     // Maximum speed in milliseconds
};

// Mapping of grid sizes to their corresponding CSS classes
export const GRID_SIZES: Record<GridSize, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
};