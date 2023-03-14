import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Board from "@/components/Board";
import { useState, useEffect } from "react";
import useKeyboardInput from "@/utils/useKeyboardInput";
import { useAnswer } from "@/components/AnswerContext";
import { gameConfig } from "@/utils/gameConfig";
import BackgroundBlur from "@/components/BackgroundBlur";
import modalStyles from "@/styles/BackgroundBlur.module.scss";

type GameStatus = "progress" | "win" | "lose" | "end";

export default function Medium() {
  const startingLength: number = parseInt(Object.keys(gameConfig["medium"])[0]);
  const [answerLength, setAnswerLength] = useState<number>(startingLength);
  const [numGuesses, setNumGuesses] = useState<number>(
    gameConfig["medium"][answerLength] || 0
  );
  const { guess, resetGuess, enableInput, disableInput } =
    useKeyboardInput(answerLength);
  const [prevGuesses, setPrevGuesses] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("progress");
  const [extraGuesses, setExtraGuesses] = useState<number>(0);
  const [bonusDisplayed, setBonusDisplayed] = useState<number>(0);
  const [stageDisplayed, setStageDisplayed] = useState<number>(1);

  const { answer, generateAnswer } = useAnswer();

  const [showRoundWinModal, setShowRoundWinModal] = useState<boolean>(false);
  const [showGameWinModal, setShowGameWinModal] = useState<boolean>(false);
  const [showGameLoseModal, setShowGameLoseModal] = useState<boolean>(false);

  // Reset board state and generate new answer when answer length changes
  useEffect(() => {
    if (answerLength === -1) setAnswerLength(startingLength);
    else if (gameConfig["medium"][answerLength] === undefined) {
      // Game cleared
      setGameStatus("end");
    } else {
      setPrevGuesses([]);
      setGameStatus("progress");
      generateAnswer(answerLength);
      setNumGuesses(gameConfig["medium"][answerLength] || 0);
      enableInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerLength]);

  // Handle game ending (lose or win)
  useEffect(() => {
    if (gameStatus === "end") {
      disableInput();
      setStageDisplayed((prevStage) => prevStage + 1);
      setShowGameWinModal(true);
    } else if (gameStatus !== "progress") {
      disableInput();

      // Get current level
      const levels = Object.keys(gameConfig.medium).map((key) => parseInt(key));
      const answerLength = answer.length;
      setStageDisplayed(
        levels.findIndex((level) => level === answerLength) + 1
      );

      if (gameStatus === "win") {
        setShowRoundWinModal(true);
        setBonusDisplayed(numGuesses + extraGuesses - prevGuesses.length);
      } else if (gameStatus === "lose") {
        setShowGameLoseModal(true);
        setBonusDisplayed(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  // Focus buttons when modal opens
  useEffect(() => {
    if (showRoundWinModal)
      document.getElementById("next_stage_button")?.focus();
    if (showGameLoseModal) document.getElementById("retry_button")?.focus();
    if (showGameWinModal) document.getElementById("restart_button")?.focus();
  }, [showRoundWinModal, showGameLoseModal, showGameWinModal]);

  // Handle round win and close modal clicked
  function handleRoundEnd() {
    // Increase answer length and set extra guesses
    setExtraGuesses((prevExtra) => numGuesses + prevExtra - prevGuesses.length);
    setAnswerLength((answerLength) => answerLength + 1);
  }

  // Handle game lose and close modal clicked
  function handleGameLose() {
    setStageDisplayed(1);
    setExtraGuesses(0);
    setAnswerLength(-1);
  }

  function handleAddGuess(guess: string) {
    if (guess === answer) {
      setGameStatus(
        gameConfig.medium[answerLength + 1] === undefined ? "end" : "win"
      );
    } else if (prevGuesses.length === numGuesses - 1 + extraGuesses)
      setGameStatus("lose");

    setPrevGuesses((prevGuesses) => [...prevGuesses, guess]);
  }

  return (
    <>
      <Head>
        <title>Wordle Step Medium</title>
      </Head>

      <BackgroundBlur
        header="nice!"
        open={showRoundWinModal}
        setOpen={(open: boolean) => {
          setShowRoundWinModal(open);
        }}
        color="yellow"
      >
        <div className={modalStyles.body}>
          <p
            className={modalStyles.bonus}
            style={{ visibility: bonusDisplayed ? "inherit" : "hidden" }}
          >
            +{bonusDisplayed} bonus guess{bonusDisplayed === 1 ? "" : "es"}
          </p>
          <button
            className={modalStyles.next_stage}
            disabled={!showRoundWinModal}
            onClick={() => {
              setShowRoundWinModal(false);
              handleRoundEnd();
            }}
            id="next_stage_button"
          >
            Stage {stageDisplayed + 1}
          </button>
        </div>
      </BackgroundBlur>

      <BackgroundBlur
        header="fail"
        open={showGameLoseModal}
        setOpen={(open: boolean) => {
          setShowGameLoseModal(open);
        }}
        color="gray"
      >
        <div className={modalStyles.body}>
          <h2 className={modalStyles.medium}>Medium</h2>
          <h3 className={modalStyles.stage}>
            Stage {stageDisplayed}/{Object.keys(gameConfig.medium).length}
          </h3>
          <div className={modalStyles.fail_stats}>
            <p className={modalStyles.stat}>Answer: {answer}</p>
          </div>
          <button
            className={modalStyles.retry}
            disabled={!showGameLoseModal}
            onClick={() => {
              setShowGameLoseModal(false);
              handleGameLose();
            }}
            id="retry_button"
          >
            Retry!
          </button>
        </div>
      </BackgroundBlur>

      <BackgroundBlur
        header="finish!"
        open={showGameWinModal}
        setOpen={(open: boolean) => {
          setShowGameWinModal(open);
        }}
        color="green"
      >
        <div className={modalStyles.body}>
          <h2 className={modalStyles.medium}>Medium</h2>
          <h3 className={modalStyles.stage}>
            Stage {stageDisplayed}/{Object.keys(gameConfig.medium).length}
          </h3>
          <button
            className={modalStyles.restart}
            disabled={!showGameWinModal}
            onClick={() => {
              setShowGameWinModal(false);
            }}
            id="restart_button"
          >
            View Game
          </button>
        </div>
      </BackgroundBlur>

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
    </>
  );
}
