import React from "react";

interface ResultProps {
  gameState: string;
  computerChoice: string | null;
  playerChoice: string | null;
  winAmount: number;
  userChoices: string[];
}

const Result: React.FC<ResultProps> = ({
  gameState,
  computerChoice,
  playerChoice,
  winAmount,
  userChoices,
}) => {
  return (
    <>
      {gameState === "result" && (
        <section className="rps-result">
          <h1 className="rps-result__title">{playerChoice} WON</h1>
          <p className="rps-result__win-amount">YOU WIN {winAmount}</p>
        </section>
      )}
      {gameState === "pending" && (
        <section className="rps-result">
          <h1 className="rps-result__title">
            {computerChoice} <span className="rps-result__versus">VS</span>{" "}
            {userChoices.length === 1
              ? userChoices[0]
              : userChoices.map((choice, index) => (
                  <React.Fragment key={choice}>
                    {index > 0 && <span className="rps-result__or"> or </span>}
                    {choice}
                  </React.Fragment>
                ))}
            {playerChoice}
          </h1>
        </section>
      )}
    </>
  );
};

export default Result;
