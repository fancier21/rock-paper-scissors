import React from "react";

interface ResultProps {
  gameState: string;
  computerChoice: string | null;
  playerChoice: string | null;
  winAmount: number;
}

const Result: React.FC<ResultProps> = ({
  gameState,
  computerChoice,
  playerChoice,
  winAmount,
}) => {
  return (
    <>
      {gameState === "result" && (
        <section className="rps-result">
          <h1 className="rps-result__title">{playerChoice} WON</h1>
          <p className="rps-result__win-amount">YOU WIN {winAmount}</p>
        </section>
      )}
      {gameState === "result" && (
        <section className="rps-result">
          <h1 className="rps-result__title">
            {computerChoice} <span className="rps-result__versus">VS</span>{" "}
            {playerChoice}
          </h1>
        </section>
      )}
    </>
  );
};

export default Result;
