import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Board from "@/components/Board";
import { useState, useEffect } from "react";
import useKeyboardInput from "@/utils/useKeyboardInput";
import { useAnswer } from "@/components/AnswerContext";
import { gameConfig } from "@/utils/gameConfig";

type GameStatus = "progress" | "win" | "lose" | "end";
type GameLength = "short" | "medium" | "long";

export default function Home() {
  const [gameLength, setGameLength] = useState<GameLength>("short");
  const startingLength: number = parseInt(
    Object.keys(gameConfig[gameLength])[0]
  );
  const [answerLength, setAnswerLength] = useState<number>(startingLength);
  const [numGuesses, setNumGuesses] = useState<number>(
    gameConfig[gameLength][answerLength] || 0
  );
  const { guess, resetGuess, enableInput, disableInput } =
    useKeyboardInput(answerLength);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("progress");

  const { answer, generateAnswer } = useAnswer();

  // Reset board state and generate new answer when answer length changes
  useEffect(() => {
    if (answerLength === -1) setAnswerLength(startingLength);
    else if (gameConfig[gameLength][answerLength] === undefined) {
      // Game cleared
      setGameStatus("end");
    } else {
      setPrevGuesses([]);
      setGameStatus("progress");
      generateAnswer(answerLength);
      setNumGuesses(gameConfig[gameLength][answerLength] || 0);
      enableInput();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerLength]);

  // Handle game ending (lose or win)
  useEffect(() => {
    if (gameStatus === "end") {
      disableInput();
      alert("You win! Reload to restart.");
    } else if (gameStatus !== "progress") {
      disableInput();
      alert(gameStatus === "win" ? "Round won!" : "Game lost! Restarting...");

      setTimeout(() => {
        // Increase or restart answer length depending on win/lose
        setAnswerLength((answerLength) =>
          gameStatus === "win" ? answerLength + 1 : -1
        );
      }, 1500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  function handleAddGuess(guess: string) {
    if (guess === answer) setGameStatus("win");
    else if (prevGuesses.length === numGuesses - 1) setGameStatus("lose");

    setPrevGuesses((prevGuesses) => [...prevGuesses, guess]);
  }

  return (
    <>
      <Head>
        <title>Wordle Step</title>
      </Head>

      <main className={styles.content}>
        <Board
          numGuesses={numGuesses}
          currentGuess={guess}
          prevGuesses={prevGuesses}
          addGuess={handleAddGuess}
          resetGuess={resetGuess}
          enableInput={enableInput}
          disableInput={disableInput}
          gameStatus={gameStatus}
        />
      </main>
      <p>Answer: {answer}</p>
    </>
  );
}
