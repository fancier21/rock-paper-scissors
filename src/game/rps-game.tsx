import { useMemo, useState } from "react";
import { useModal } from "../shared/hooks";
import { Modal, Button } from "../shared/ui";
import { getRandomElementFromArray } from "../shared/utils/getRandomElementFromArray";
import Stats from "./rps-stats";
import Result from "./rps-result";
import Choices from "./rps-choices";

type Choice = "rock" | "paper" | "scissors";
type Bet = { [key in Choice]?: number };
type GameState = "betting" | "playing" | "result";
type Winner = "player" | "computer" | "tie";

const INITIAL_BALANCE = 5000;
const BET_AMOUNT = 500;
const ONE_POSITION_WIN_RATE = 14;
const TWO_POSITION_WIN_RATE = 3;
const GAME_DELAY = 2000;

const Game = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const choices: Choice[] = ["rock", "paper", "scissors"];
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [bets, setBets] = useState<Bet>({});
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [gameState, setGameState] = useState<GameState>("betting");
  const [winAmount, setWinAmount] = useState(0);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [winningChoice, setWinningChoice] = useState<Choice | null>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const placeBet = (choice: Choice) => {
    if (gameState !== "betting") return;

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

  const calculateResult = (newComputerChoice: Choice) => {
    const playerChoices = Object.keys(bets) as Choice[];

    const getWinner = (choice1: Choice, choice2: Choice) => {
      if (choice1 === choice2) return null;

      if (
        (choice1 === "rock" && choice2 === "scissors") ||
        (choice1 === "scissors" && choice2 === "paper") ||
        (choice1 === "paper" && choice2 === "rock")
      ) {
        return choice1;
      }

      return choice2;
    };

    let winningChoice: Choice | null = null;

    for (const playerChoice of playerChoices) {
      const result = getWinner(playerChoice, newComputerChoice);
      if (result === playerChoice) {
        winningChoice = playerChoice;
        break;
      }
    }

    let winnings: number = 0;
    let winAmount: number = 0;
    let newWinner: Winner | null = null;

    if (winningChoice) {
      const winningBet = bets[winningChoice] || 0;
      if (playerChoices.length === 1) {
        winnings = winningBet * ONE_POSITION_WIN_RATE;
        winAmount = winnings;
      } else {
        winnings = winningBet * TWO_POSITION_WIN_RATE;
        winAmount = winnings;
        const losingChoice = playerChoices.find(
          (choice) => choice !== winningChoice,
        );
        if (losingChoice) {
          const losingBet = bets[losingChoice] || 0;
          winnings -= losingBet;
        }
      }
      setWinningChoice(winningChoice);
      newWinner = "player";
    } else if (playerChoices.includes(newComputerChoice)) {
      winnings = bets[newComputerChoice] || 0;
      const losingChoice = playerChoices.find(
        (choice) => choice !== newComputerChoice,
      );
      if (losingChoice) {
        winnings -= bets[losingChoice] || 0;
      }
      setWinningChoice(null);
      newWinner = "tie";
    } else {
      // winnings = -Object.values(bets).reduce((sum, bet) => sum + bet, 0);
      setWinningChoice(newComputerChoice);
      newWinner = "computer";
    }

    setWinAmount(winAmount);
    setBalance((prevBalance) => prevBalance + winnings);
    setWinner(newWinner);
    setGameState("result");
  };

  const playGame = () => {
    setGameState("playing");
    const newComputerChoice = getRandomElementFromArray(choices);
    setComputerChoice(newComputerChoice);

    setTimeout(() => calculateResult(newComputerChoice), GAME_DELAY);
  };

  const resetGame = () => {
    setWinner(null);
    setBets({});
    setComputerChoice(null);
    setGameState("betting");
    setWinAmount(0);
    setWinningChoice(null);
  };

  const totalBet = useMemo(() => {
    return Object.values(bets).reduce((acc, bet) => acc + (bet || 0), 0);
  }, [bets]);

  return (
    <>
      <header className="rps-header">
        <Stats
          balance={balance}
          totalBet={totalBet}
          winAmount={winAmount}
          winner={winner}
        />
      </header>
      <main className="rps-main">
        <Result
          gameState={gameState}
          playerChoices={Object.keys(bets) as Choice[]}
          computerChoice={computerChoice}
          winningChoice={winningChoice}
          winner={winner}
          winAmount={winAmount}
        />
        <section className="rps-game">
          {gameState === "betting" && (
            <p className="rps-game__instruction">PICK YOUR POSITIONS</p>
          )}
        </section>
        <Choices
          choices={choices}
          bets={bets}
          computerChoice={computerChoice}
          winningChoice={winningChoice}
          gameState={gameState}
          placeBet={placeBet}
          winner={winner}
        />
        {gameState !== "result" && (
          <Button
            className="rps-button"
            disabled={Object.keys(bets).length === 0 || gameState != "betting"}
            onClick={playGame}
          >
            PLAY
          </Button>
        )}
        {gameState === "result" && (
          <Button className="rps-button" onClick={resetGame}>
            CLEAR
          </Button>
        )}
      </main>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="rps-modal"
        contentClassName="rps-modal__content"
      >
        <p className="rps-modal__message">{modalMessage}</p>
        <Button className="rps-modal__close-button" onClick={closeModal}>
          Ok
        </Button>
      </Modal>
    </>
  );
};

export default Game;
