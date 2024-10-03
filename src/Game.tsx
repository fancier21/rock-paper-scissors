import { useMemo, useState } from "react";

type Choice = "rock" | "paper" | "scissors";
type Bet = { [key in Choice]?: number };

const INITIAL_BALANCE = 5000;
const BET_AMOUNT = 500;
const ONE_POSITION_WIN_RATE = 14;
const TWO_POSITION_WIN_RATE = 3;

const RockPaperScissorsGame = () => {
  const choices: Choice[] = ["rock", "paper", "scissors"];
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [bets, setBets] = useState<Bet>({});

  const placeBet = (choice: Choice) => {
    if (Object.keys(bets).length >= 2 && !bets[choice]) {
      alert("You can only bet on two positions at a time");
      return;
    }

    if (balance < BET_AMOUNT) {
      alert("You don't have enough money to bet");
      return;
    }

    setBets((prevBets) => ({
      ...prevBets,
      [choice]: (prevBets[choice] || 0) + BET_AMOUNT,
    }));

    setBalance((prevBalance) => prevBalance - BET_AMOUNT);
  };

  const totalBet = useMemo(() => {
    return Object.values(bets).reduce((acc, bet) => acc + (bet || 0), 0);
  }, [bets]);

  return (
    <>
      <header className="rps-header">
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
              <span className="rps-stats__item--value">XXX.XX</span>
            </li>
          </ul>
        </div>
      </header>
      <main className="rps-main">
        <section className="rps-result">
          <h1 className="rps-result__title">PAPER WON</h1>
          <p className="rps-result__win-amount">YOU WIN XXX.XX</p>
        </section>
        <section className="rps-game">
          <p className="rps-game__instruction">PICK YOUR POSITIONS</p>
          <div className="rps-choices">
            {choices.map((choice) => {
              return (
                <div
                  className="rps-choice"
                  key={choice}
                  onClick={() => placeBet(choice)}
                >
                  {bets[choice] && (
                    <div className="rps-choice__value">{bets[choice]}</div>
                  )}
                  <div className="rps-choice__name">{choice}</div>
                </div>
              );
            })}
          </div>
        </section>
        <button className="rps-play-button">PLAY</button>
      </main>
    </>
  );
};

export default RockPaperScissorsGame;
