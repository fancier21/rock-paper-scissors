import { useMemo, useState } from "react";
import { useModal } from "./shared/hooks";
import { Modal, Card, Button } from "./shared/ui";
import { getRandomElementFromArray } from "./shared/utils/getRandomElementFromArray";

type Choice = "rock" | "paper" | "scissors";
type Bet = { [key in Choice]?: number };

const INITIAL_BALANCE = 5000;
const BET_AMOUNT = 500;
const ONE_POSITION_WIN_RATE = 14;
const TWO_POSITION_WIN_RATE = 3;

const RockPaperScissorsGame = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const choices: Choice[] = ["rock", "paper", "scissors"];
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [bets, setBets] = useState<Bet>({});
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const placeBet = (choice: Choice) => {
    if (Object.keys(bets).length >= 2 && !bets[choice]) {
      setModalMessage("You can only bet on two positions at a time");
      openModal();
      return;
    }

    if (balance < BET_AMOUNT) {
      setModalMessage("You don't have enough money to bet");
      openModal();
      return;
    }

    setBets((prevBets) => ({
      ...prevBets,
      [choice]: (prevBets[choice] || 0) + BET_AMOUNT,
    }));

    setBalance((prevBalance) => prevBalance - BET_AMOUNT);
  };

  const playGame = () => {
    const computerChoice = getRandomElementFromArray(choices);
    const playerChoices = Object.keys(bets) as Choice[];
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
                <Card
                  className="rps-choice"
                  key={choice}
                  onClick={() => placeBet(choice)}
                >
                  {bets[choice] && (
                    <div className="rps-choice__value">{bets[choice]}</div>
                  )}
                  <div className="rps-choice__name">{choice}</div>
                </Card>
              );
            })}
          </div>
        </section>
        <Button className="rps-play-button" onClick={playGame}>
          PLAY
        </Button>
      </main>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="rps-modal"
        contentClassName="rps-modal__content"
      >
        <p className="rps-modal__message">{modalMessage}</p>
        <Button className="rps-modal__close-button" onClick={closeModal}>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default RockPaperScissorsGame;
