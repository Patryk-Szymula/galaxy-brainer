export type GameState =
    | 'idle' // Waiting to start
    | 'memorize' // Code momorizing
    | 'input' // Waiting for player input
    | 'success' // Player completed the sequence successfully
    | 'gameover'; // Player made a mistake

export interface StarshipCodeState {
    level: number;
    currentCode: string;
    userInput: string;
    status: GameState;
    score: number;
}

export const generateCode = (length: number): string => {
    let code = "";
    for (let i = 0; i < length; i++)
        code += Math.floor(Math.random() * 10).toString();
    return code;
}


