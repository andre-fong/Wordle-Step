import { useEffect } from "react";
import styles from "@/styles/Welcome.module.scss";
import Head from "next/head";
import Link from "next/link";

export default function Welcome() {
  useEffect(() => {
    const letters = document.querySelectorAll(`.${styles.letter}`);
    const lettersArray = Array.from(letters);
    lettersArray.forEach((letter, i) => {
      setTimeout(() => {
        letter.classList.add(styles.correct);
      }, 200 * i);
    });
  });

  return (
    <>
      <Head>
        <title>Wordle Step - Home</title>
      </Head>

      <div className={styles.content}>
        <div className={styles.section}>
          <h1 className={styles.title}>How To Play</h1>
          <h3 className={styles.subtitle}>
            Guess the Wordle(s) in 6 tries or less... or more?
          </h3>
          <ul className={styles.list}>
            <li className={styles.item}>
              All of classic Wordle{"'"}s rules, but,
            </li>
            <li className={styles.item}>
              Wordles get{" "}
              <span className={styles.emphasis_yellow}>more challenging</span>{" "}
              with every stage you beat.
            </li>
            <li className={styles.item}>
              Leftover guesses become{" "}
              <span className={styles.emphasis_green}>bonus guesses</span> for
              the next stage.
            </li>
          </ul>

          <div className={styles.row}>
            {["R", "E", "A", "D", "Y", "?"].map((letter, i) => (
              <div key={i} className={styles.letter}>
                {letter}
              </div>
            ))}
          </div>
          <Link href="/short">
            <div className={`${styles.subtitle} ${styles.link}`}>
              Start playing!
            </div>
          </Link>
        </div>

        <div className={styles.section}>
          <h1 className={styles.title}>Tips</h1>
          <ul className={styles.list}>
            <li className={styles.item}>
              Games come in three difficulties:{" "}
              <span className={styles.emphasis_green}>Short</span>,{" "}
              <span className={styles.emphasis_yellow}>Medium</span>, and{" "}
              <span className={styles.emphasis_red}>Long</span>. Change
              difficulties in the top right corner.
            </li>
            <li className={styles.item}>
              Don{"'"}t wait a day to play again. Just reload the page to start
              a new game!
            </li>
          </ul>

          <p className={styles.paragraph}>(Oh, and have fun!)</p>
        </div>

        <div className={styles.section}>
          <h1 className={styles.title}>How It Was Built</h1>
          <h3 className={styles.subtitle}>
            Beg NY Times for their Wordle code.
          </h3>
        </div>
      </div>
    </>
  );
}
