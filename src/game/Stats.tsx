import React from "react";

interface StatsProps {
  balance: number;
  totalBet: number;
  winAmount: number;
}

const Stats: React.FC<StatsProps> = ({ balance, totalBet, winAmount }) => {
  return (
    <div className="rps-stats">
      <ul className="rps-stats__list">
        <li className="rps-stats__item rps-stats__item--balance">
          BALANCE: <span className="rps-stats__item--value">{balance}</span>
        </li>
        <li className="rps-stats__item rps-stats__item--bet">
          BET:
          <span className="rps-stats__item--value">{totalBet}</span>
        </li>
        <li className="rps-stats__item rps-stats__item--win">
          WIN:
          <span className="rps-stats__item--value">{winAmount}</span>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
