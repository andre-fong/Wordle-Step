import styles from "@/styles/Board.module.scss";
import Row from "@/components/Row";
import { useAnswer } from "@/components/AnswerContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface BoardProps {
  numGuesses: number;
  currentGuess: string;
  prevGuesses: string[];
  addGuess: (guess: string) => void;
  resetGuess: () => void;
  enableInput: () => void;
  disableInput: () => void;
}

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
}: BoardProps) {
  const { answer } = useAnswer();

  // Load legal words (dictionary)
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    fetch("words.txt")
      .then((res) => res.text())
      .then((text) => {
        setWords(text.split("\r\n").slice(0, -1));
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
        }, 1800);
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

  function handleEnter(e: KeyboardEvent) {
    if (e.key !== "Enter" || currentRowStatus === "animating") return;
    disableInput();

    if (currentGuess.length < answer.length) {
      handleInvalidGuess("Not enough letters");
      enableInput();
      return;
    }

    setCurrentRowStatus("processing");
  }

  // Handle submitting guess
  useEffect(() => {
    window.addEventListener("keydown", handleEnter);

    return () => window.removeEventListener("keydown", handleEnter);
  });

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
