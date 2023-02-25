import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Board from "@/components/Board";
import { useState, useEffect } from "react";
import useKeyboardInput from "@/utils/useKeyboardInput";
import { useAnswer } from "@/components/AnswerContext";

type GameStatus = "progress" | "win" | "lose";

export default function Home() {
  const numGuesses = 6;
  const { guess, resetGuess, enableInput, disableInput } = useKeyboardInput(5); // TODO: Limit keyboard from level, not answer
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("progress");

  const { answer, generateAnswer } = useAnswer();
  useEffect(() => {
    generateAnswer(5); // TODO: Generate answer from level

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameStatus !== "progress") {
      alert(`${gameStatus}, reloading`);
      disableInput();

      setTimeout(() => {
        setPrevGuesses([]);
        setGameStatus("progress");
        generateAnswer(5); // TODO: Generate answer from level
        enableInput();
      }, 3000);
    }
  }, [gameStatus, disableInput, enableInput, generateAnswer]);

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
