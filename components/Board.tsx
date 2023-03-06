import styles from "@/styles/Board.module.scss";
import Row from "@/components/Row";
import Keyboard from "@/components/Keyboard";
import { useAnswer } from "@/components/AnswerContext";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useScreenSize from "@/utils/useScreenSize";

interface BoardProps {
  numGuesses: number;
  currentGuess: string;
  prevGuesses: string[];
  addGuess: (guess: string) => void;
  resetGuess: () => void;
  enableInput: () => void;
  disableInput: () => void;
  gameStatus: GameStatus;
}

type GameStatus = "progress" | "win" | "lose" | "end";

type RowStatus =
  | "building"
  | "processing"
  | "invalid"
  | "animating"
  | "finished";

type BoxStatus = "correct" | "wrong" | "inaccurate";

export default function Board({
  numGuesses,
  currentGuess,
  prevGuesses,
  addGuess,
  resetGuess,
  enableInput,
  disableInput,
  gameStatus,
}: BoardProps) {
  const { answer } = useAnswer();

  // Load legal words (dictionary)
  const [words, setWords] = useState<string[]>([]);

  const [guessAccuracy, setGuessAccuracy] = useState<BoxStatus[]>([]);

  const { width, height } = useScreenSize();

  useEffect(() => {
    fetch("/words.txt")
      .then((res) => res.text())
      .then((text) => {
        if (process.env.NEXT_PUBLIC_VERCEL_URL)
          setWords(text.split("\n").slice(0, -1));
        else setWords(text.split("\r\n").slice(0, -1));
      });
  }, []);

  const [currentRowStatus, setCurrentRowStatus] =
    useState<RowStatus>("building");

  useEffect(() => {
    if (currentRowStatus === "processing") {
      // Check if word is in word list with dictionary APi
      if (words.length === 0) {
        handleInvalidGuess("Loading word list");
        enableInput();
      } else if (!words.includes(currentGuess)) {
        handleInvalidGuess("Not in word list");
        enableInput();
      } else {
        setCurrentRowStatus("animating");
        setTimeout(() => {
          addGuess(currentGuess);
          setCurrentRowStatus("building");
          resetGuess();
          enableInput();
        }, (answer.length - 1) * 300 + 700); // 300ms delay per letter + 700ms for animation
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRowStatus]);

  function handleInvalidGuess(message: string) {
    toast.warning(message, {
      position: "top-center",
      autoClose: 600,
      hideProgressBar: true,
      pauseOnHover: false,
      style: { background: "black", color: "white" },
    });

    setCurrentRowStatus("invalid");
    setTimeout(() => {
      setCurrentRowStatus("building");
    }, 600);
  }

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key !== "Enter" ||
        currentRowStatus !== "building" ||
        gameStatus !== "progress"
      )
        return;

      disableInput();

      if (currentGuess.length < answer.length) {
        handleInvalidGuess("Not enough letters");
        enableInput();
        return;
      }

      setCurrentRowStatus("processing");
    },
    [
      currentRowStatus,
      currentGuess,
      answer,
      disableInput,
      enableInput,
      gameStatus,
    ]
  );

  function transferGuessCalculation(guessAccuracy: BoxStatus[]) {
    setGuessAccuracy(guessAccuracy);
  }

  // Handle submitting guess
  useEffect(() => {
    window.addEventListener("keydown", handleEnter, true);

    return () => window.removeEventListener("keydown", handleEnter, true);
  }, [handleEnter]);

  return (
    <>
      <div className={styles.rows}>
        {Array.from(Array(numGuesses).keys()).map((i: number) => {
          const currentRow = prevGuesses.length;

          if (i < currentRow)
            return (
              <Row
                status="finished"
                rowWord={prevGuesses[i]}
                length={answer.length}
                key={i}
                onGuessCalculation={transferGuessCalculation}
                screenWidth={width}
              />
            );
          else if (i === currentRow)
            return (
              <Row
                status={currentRowStatus}
                rowWord={currentGuess}
                length={answer.length}
                key={i}
                onGuessCalculation={transferGuessCalculation}
                screenWidth={width}
              />
            );
          else
            return (
              <Row
                status="building"
                rowWord=""
                length={answer.length}
                key={i}
                onGuessCalculation={transferGuessCalculation}
                screenWidth={width}
              />
            );
        })}
      </div>

      <Keyboard
        prevGuesses={prevGuesses}
        currentGuessAccuracy={guessAccuracy}
        screenWidth={width}
      />
    </>
  );
}
