import React from "react";
import styles from "@/styles/Header.module.scss";
import { useRouter } from "next/router";
import useScreenSize from "@/utils/useScreenSize";

export default function Header() {
  const router = useRouter();
  const gameLength = router.pathname.slice(1) || "short";

  const { width } = useScreenSize();

  function handleNextGameLength() {
    if (gameLength === "medium") router.push("/long");
    else if (gameLength === "long") router.push("/");
    else router.push("/medium");
  }

  return (
    <header className={styles.content}>
      {width && width <= 300 ? (
        <>
          <h1 className={styles.title}>Wordle Step</h1>
          <div className={styles.info}>
            <div className={styles.stage}>x/y</div>
            <button
              className={styles.length}
              title="Game length"
              onClick={handleNextGameLength}
            >
              {gameLength[0].toUpperCase() + gameLength.slice(1)}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.stage}>Stage x/y</div>
          <h1 className={styles.title}>Wordle Step</h1>
          <button
            className={styles.length}
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
