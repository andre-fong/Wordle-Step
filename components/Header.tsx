import { useState, useEffect } from "react";
import styles from "@/styles/Header.module.scss";
import { useRouter } from "next/router";
import useScreenSize from "@/utils/useScreenSize";
import { useAnswer } from "@/components/AnswerContext";
import Link from "next/link";
import { gameConfig } from "@/utils/gameConfig";

type GameLength = "short" | "medium" | "long";

export default function Header() {
  const router = useRouter();
  const gameLength = router.pathname.slice(1);
  const isValidGameLength = ["short", "medium", "long"].includes(gameLength);

  const { width } = useScreenSize();
  const { answer } = useAnswer();

  const [currentStage, setCurrentStage] = useState<number>(1);
  const [totalStages, setTotalStages] = useState<number>(1);

  // Calculate current stage and total stages
  useEffect(() => {
    if (["short", "medium", "long"].includes(gameLength) && answer) {
      const levels = Object.keys(gameConfig[gameLength as GameLength]).map(
        (key) => parseInt(key)
      );
      const answerLength = answer.length;
      const currentStage =
        levels.findIndex((level) => level === answerLength) + 1;

      setTotalStages(levels.length);
      setCurrentStage(currentStage);
    }

    return () => {
      setTotalStages(1);
      setCurrentStage(1);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  function handleNextGameLength() {
    if (gameLength === "medium") router.push("/long");
    else if (gameLength === "long") router.push("/short");
    else if (gameLength === "short") router.push("/medium");
    else router.push("/");
  }

  function handleGameLengthColor(gameLength: string) {
    let className = `${styles.length} `;
    if (!["short", "medium", "long"].includes(gameLength)) return className;
    else if (gameLength === "short") className += styles.green;
    else if (gameLength === "medium") className += styles.yellow;
    else if (gameLength === "long") className += styles.red;
    return className;
  }

  return (
    <header className={styles.content}>
      {!isValidGameLength ? (
        <div className={styles.title_container}>
          <h1 className={styles.title}>Wordle Step</h1>
        </div>
      ) : width && width <= 300 ? (
        <>
          <h1 className={styles.title}>Wordle Step</h1>
          <div className={styles.info}>
            <div className={styles.stage}>
              {currentStage}/{totalStages}
            </div>
            <button
              className={handleGameLengthColor(gameLength)}
              title="Game length"
              onClick={handleNextGameLength}
            >
              {gameLength[0].toUpperCase() + gameLength.slice(1)}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.stage}>
            Stage {currentStage}/{totalStages}
          </div>
          <h1 className={styles.title}>Wordle Step</h1>
          <button
            className={handleGameLengthColor(gameLength)}
            title="Game length"
            onClick={handleNextGameLength}
          >
            {gameLength[0].toUpperCase() + gameLength.slice(1)}
          </button>
        </>
      )}
    </header>
  );
}
