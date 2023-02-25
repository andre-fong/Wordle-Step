import styles from "@/styles/Board.module.scss";
import Row from "@/components/Row";
import { useAnswer } from "@/components/AnswerContext";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

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

type GameStatus = "progress" | "win" | "lose";

type RowStatus =
  | "building"
  | "processing"
  | "invalid"
  | "animating"
  | "finished";

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
  console.log(`words: ${words.length}`);
  console.log(`LIVE_PRODUCTION: ${process.env.LIVE_PRODUCTION}`);
  console.log(`VERCEL: ${process.env.VERCEL}`);
  console.log(`VERCEL_URL: ${process.env.VERCEL_URL}`);
  console.log(`NEXT_PUBLIC_VERCEL_URL: ${process.env.NEXT_PUBLIC_VERCEL_URL}`);

  useEffect(() => {
    fetch("/words.txt")
      .then((res) => res.text())
      .then((text) => {
        if (process.env.VERCEL_URL) setWords(text.split("\n").slice(0, -1));
        else setWords(text.split("\r\n").slice(0, -1));
      });
  }, []);

  const [currentRowStatus, setCurrentRowStatus] =
    useState<RowStatus>("building");

  useEffect(() => {
    if (currentRowStatus === "processing") {
      // Check if word is in word list with dictionary APi
      if (!words.includes(currentGuess)) {
        handleInvalidGuess("Not in word list");
        enableInput();
      } else {
        setCurrentRowStatus("animating");
        setTimeout(() => {
          addGuess(currentGuess);
          setCurrentRowStatus("building");
          resetGuess();
          enableInput();
        }, 1900);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRowStatus]);

  function handleInvalidGuess(message: string) {
    toast.warning(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: true,
      pauseOnHover: false,
      style: { background: "black", color: "white" },
    });

    setCurrentRowStatus("invalid");
    setTimeout(() => {
      setCurrentRowStatus("building");
    }, 1000);
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

  // Handle submitting guess
  useEffect(() => {
    window.addEventListener("keydown", handleEnter, true);

    return () => window.removeEventListener("keydown", handleEnter, true);
  }, [handleEnter]);

  return (
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
            />
          );
        else if (i === currentRow)
          return (
            <Row
              status={currentRowStatus}
              rowWord={currentGuess}
              length={answer.length}
              key={i}
            />
          );
        else
          return (
            <Row status="building" rowWord="" length={answer.length} key={i} />
          );
      })}
    </div>
  );
}
