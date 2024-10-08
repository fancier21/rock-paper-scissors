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
          <p className="rps-result__outcome">
            {winner === "player" ? (
              <>
                <span className="rps-result__text">YOU WIN</span>{" "}
                <span className="rps-result__win-amount">{winAmount}</span>
              </>
            ) : (
              <span className="rps-result__text">YOU LOSE</span>
            )}
          </p>
        </section>
      )}
      {gameState === "playing" && (
        <section className="rps-playing-info">
          <h1 className="rps-playing-info__title">
            {computerChoice}{" "}
            <span className="rps-playing-info__versus">VS</span>{" "}
            {playerChoices.length === 1
              ? playerChoices[0]
              : playerChoices.map((choice, index) => (
                  <React.Fragment key={choice}>
                    {index > 0 && (
                      <span className="rps-playing-info__separator"> or </span>
                    )}
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
