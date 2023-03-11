import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Board from "@/components/Board";
import { useState, useEffect } from "react";
import useKeyboardInput from "@/utils/useKeyboardInput";
import { useAnswer } from "@/components/AnswerContext";
import { gameConfig } from "@/utils/gameConfig";

type GameStatus = "progress" | "win" | "lose" | "end";

export default function Long() {
  const startingLength: number = parseInt(Object.keys(gameConfig["long"])[0]);
  const [answerLength, setAnswerLength] = useState<number>(startingLength);
  const [numGuesses, setNumGuesses] = useState<number>(
    gameConfig["long"][answerLength] || 0
  );
  const { guess, resetGuess, enableInput, disableInput } =
    useKeyboardInput(answerLength);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("progress");
  const [extraGuesses, setExtraGuesses] = useState<number>(0);

  const { answer, generateAnswer } = useAnswer();

  // Reset board state and generate new answer when answer length changes
  useEffect(() => {
    if (answerLength === -1) setAnswerLength(startingLength);
    else if (gameConfig["long"][answerLength] === undefined) {
      // Game cleared
      setGameStatus("end");
    } else {
      setPrevGuesses([]);
      setGameStatus("progress");
      generateAnswer(answerLength);
      setNumGuesses(gameConfig["long"][answerLength] || 0);
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
        // Set extra guesses depending if lost or won round
        if (gameStatus === "win")
          setExtraGuesses(
            (prevExtra) => numGuesses + prevExtra - prevGuesses.length
          );
        else if (gameStatus === "lose") setExtraGuesses(0);
      }, 1500);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  function handleAddGuess(guess: string) {
    if (guess === answer) setGameStatus("win");
    else if (prevGuesses.length === numGuesses - 1 + extraGuesses)
      setGameStatus("lose");

    setPrevGuesses((prevGuesses) => [...prevGuesses, guess]);
  }

  return (
    <>
      <Head>
        <title>Wordle Step Long</title>
      </Head>

      <main className={styles.content}>
        <Board
          numGuesses={numGuesses}
          extraGuesses={extraGuesses}
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
