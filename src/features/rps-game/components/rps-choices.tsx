import React from "react";
import classNames from "classnames";
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
  const getChoiceClassName = (
    gameState: string,
    isPlayerChoice: boolean,
    isComputerChoice: boolean,
    isWinningChoice: boolean,
    isTieChoice: boolean,
  ): string =>
    classNames("rps-choice", {
      "rps-choice--disabled": gameState !== "betting",
      "rps-choice--player": isPlayerChoice,
      "rps-choice--computer": isComputerChoice,
      "rps-choice--winning": isWinningChoice || isTieChoice,
    });

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
            className={getChoiceClassName(
              gameState,
              isPlayerChoice,
              isComputerChoice,
              isWinningChoice,
              isTieChoice,
            )}
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
