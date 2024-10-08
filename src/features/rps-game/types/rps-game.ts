export type Choice = "rock" | "paper" | "scissors";
export type Bet = { [key in Choice]?: number };
export type GameState = "betting" | "playing" | "result";
export type Winner = "player" | "computer" | "tie";
