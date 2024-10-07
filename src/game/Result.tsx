import React from "react";

interface ResultProps {
  gameState: string;
  computerChoice: string | null;
  playerChoices: string[];
  winningChoice: string | null;
  winAmount: number;
  winner: string | null;
}

const Result: React.FC<ResultProps> = ({
  gameState,
  playerChoices,
  computerChoice,
  winningChoice,
  winner,
  winAmount,
}) => {
  return (
    <>
      {gameState === "result" && (
        <section className="rps-result">
          {winner != "tie" && (
            <h1 className="rps-result__title">{winningChoice} WON</h1>
          )}
          <p className="rps-result__win-amount">
            {winner === "player"
              ? `YOU WIN ${winAmount}`
              : winner === "computer"
                ? "YOU LOSE"
                : "TIE"}
          </p>
        </section>
      )}
      {gameState === "playing" && (
        <section className="rps-result">
          <h1 className="rps-result__title">
            {computerChoice} <span className="rps-result__versus">VS</span>{" "}
            {playerChoices.length === 1
              ? playerChoices[0]
              : playerChoices.map((choice, index) => (
                  <React.Fragment key={choice}>
                    {index > 0 && <span className="rps-result__or"> or </span>}
                    {choice}
                  </React.Fragment>
                ))}
          </h1>
        </section>
      )}
    </>
  );
};

export default Result;
