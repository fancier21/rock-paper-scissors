import React from "react";

import "../styles/stats.scss";

interface StatsProps {
  balance: number;
  totalBet: number;
  winAmount: number;
  winner: string | null;
}

const Stats: React.FC<StatsProps> = ({
  balance,
  totalBet,
  winAmount,
  winner,
}) => {
  return (
    <div className="rps-stats">
      <ul className="rps-stats__list">
        <li className="rps-stats__item">
          <span className="rps-stats__item--label">BALANCE:</span>
          <span className="rps-stats__item--value">{balance}</span>
        </li>
        <li className="rps-stats__item">
          <span className="rps-stats__item--label">BET:</span>
          <span className="rps-stats__item--value">{totalBet}</span>
        </li>
        <li className="rps-stats__item">
          <span className="rps-stats__item--label">WIN:</span>
          <span className="rps-stats__item--value">
            {winner === "player" ? winAmount : 0}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
