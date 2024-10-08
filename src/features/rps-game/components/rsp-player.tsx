import { useMemo, useState } from "react";
import { useModal } from "../../../shared/hooks";
import { Button } from "../../../shared/ui";
import CustomModal from "./rps-modal";
import Stats from "./rps-stats";
import Result from "./rps-result";
import Choices from "./rps-choices";
import {
  INITIAL_BALANCE,
  BET_AMOUNT,
  ONE_POSITION_WIN_RATE,
  TWO_POSITION_WIN_RATE,
  GAME_DELAY,
} from "../constants";
import { getRandomElementFromArray } from "../../../shared/utils/getRandomElementFromArray";
import type { GameState, Bet, Choice, Winner } from "../types";

import "../styles/player.scss";

const Player = () => {
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
      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </>
  );
};

export default Player;
