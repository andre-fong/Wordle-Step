import styles from "@/styles/Row.module.scss";
import { useAnswer } from "@/components/AnswerContext";
import { useEffect } from "react";

type RowStatus =
  | "building"
  | "processing"
  | "invalid"
  | "animating"
  | "finished";
type BoxStatus = "correct" | "wrong" | "inaccurate";

interface RowProps {
  status: RowStatus;
  rowWord: string;
  length: number;
}

export default function Row({ status, rowWord, length }: RowProps) {
  const { answer } = useAnswer();

  // Animate each box to reveal the word
  useEffect(() => {
    if (status === "animating" && rowWord.length === answer.length) {
      console.log("revealing");
      const statuses = handleBoxAnimationClasses(answer, rowWord);

      const boxes = document.querySelectorAll(`.animating .${styles.box}`);
      const boxesArray = Array.from(boxes);
      boxesArray.forEach((box, i) => {
        setTimeout(() => {
          box.classList.add(styles[statuses[i]]);
        }, 300 * i);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, rowWord]);

  function handleBoxAnimationClasses(
    answer: string,
    guess: string
  ): BoxStatus[] {
    let answerMap = {} as { [index: number]: string },
      guessMap = {} as { [index: number]: string };
    Object.assign(answerMap, Array.from(answer));
    Object.assign(guessMap, Array.from(guess));

    let statuses = {} as { [index: number]: BoxStatus };

    // Ex.,
    // answer = EARLY
    // guess = RARES

    // Find correct letters
    Object.keys(guessMap).forEach((key) => {
      const index = parseInt(key);
      if (answerMap[index] === guessMap[index]) {
        statuses[index] = "correct";
      }
    });
    // Splice out correct letters from arrays
    Object.keys(statuses).forEach((key) => {
      const index = parseInt(key);
      delete answerMap[index];
      delete guessMap[index];
    });

    /* 
    answerMap = {
      0: e,
      3: l,
      4: y,
    }
    guessMap = {
      0: r,
      3: e,
      4: s,
    }
    */

    // Find inaccurate, then wrong letters
    Object.keys(guessMap).forEach((key) => {
      const guessIndex = parseInt(key);

      Object.keys(answerMap).every((key) => {
        const answerIndex = parseInt(key);

        if (guessMap[guessIndex] === answerMap[answerIndex]) {
          statuses[guessIndex] = "inaccurate";
          delete answerMap[answerIndex];
          return false;
        }
        return true;
      });

      if (!statuses[guessIndex]) statuses[guessIndex] = "wrong";
    });

    console.log(statuses);

    return Object.keys(statuses).map((key) => statuses[parseInt(key)]);
  }

  function handleBoxClass(index: number): string {
    if (status === "building" || status === "invalid") {
      return rowWord.length >= index + 1
        ? rowWord.length === index + 1
          ? `${styles.box} ${styles.filled} ${styles.pop_up}`
          : `${styles.box} ${styles.filled}`
        : `${styles.box}`;
    } else if (
      status === "animating" ||
      status === "finished" ||
      status === "processing"
    ) {
      return `${styles.box} ${styles.filled}`;
    }
    return styles.box;
  }

  function handleRowClass(): string {
    if (status === "invalid") return `${styles.row} ${styles.shake}`;
    else if (status === "animating") return `${styles.row} animating`;
    else return styles.row;
  }

  return (
    <div className={handleRowClass()}>
      {Array.from(Array(length).keys()).map((i: number) => (
        <div className={handleBoxClass(i)} key={i}>
          {rowWord[i]?.toUpperCase() || ""}
        </div>
      ))}
    </div>
  );
}
