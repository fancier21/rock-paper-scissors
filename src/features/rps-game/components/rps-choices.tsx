import React from "react";
import { Card } from "../../../shared/ui";
import type { Choice, Winner } from "../types";

import "../styles/choices.scss";

interface ChoicesProps {
  choices: Choice[];
  bets: Record<string, number>;
  computerChoice: string | null;
  winningChoice: string | null;
  gameState: string;
  placeBet: (choice: Choice) => void;
  winner: Winner | null;
}

const Choices: React.FC<ChoicesProps> = ({
  choices,
  bets,
  computerChoice,
  winningChoice,
  gameState,
  placeBet,
  winner,
}) => {
  return (
    <div className="rps-choices">
      {choices.map((choice) => {
        const isPlayerChoice = bets[choice] !== undefined;
        const isComputerChoice = computerChoice === choice;
        const isWinningChoice = winningChoice === choice;
        const isTieChoice =
          winner === "tie" && isPlayerChoice && isComputerChoice;
        return (
          <Card
            className={`rps-choice
                                ${gameState != "betting" ? "rps-choice--disabled" : ""}
                                ${isPlayerChoice ? "rps-choice--player" : ""}
                                ${isComputerChoice ? "rps-choice--computer" : ""}
                                ${isWinningChoice || isTieChoice ? "rps-choice--winning" : ""}`}
            key={choice}
            onClick={
              gameState === "betting" ? () => placeBet(choice) : undefined
            }
          >
            {bets[choice] && (
              <div className="rps-choice__value">{bets[choice]}</div>
            )}
            <div className="rps-choice__name">{choice}</div>
          </Card>
        );
      })}
    </div>
  );
};

export default Choices;
