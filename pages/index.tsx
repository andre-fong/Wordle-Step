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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6aaa64" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#6aaa64" />

        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wordle-step.vercel.app/" />
        <meta
          property="og:title"
          content="Wordle Step - A word game with levels"
        />
        <meta
          property="og:description"
          content="Guess the Wordle(s) in 6 tries or less... or more? A Wordle spinoff game with levels."
        />
        <meta
          property="og:image"
          content="https://wordle-step.vercel.app/wordle-banner.png"
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="wordle-step.vercel.app/" />
        <meta
          property="twitter:url"
          content="https://wordle-step.vercel.app/"
        />
        <meta
          name="twitter:title"
          content="Wordle Step - A word game with levels"
        />
        <meta
          name="twitter:description"
          content="Guess the Wordle(s) in 6 tries or less... or more? A Wordle spinoff game with levels."
        />
        <meta
          name="twitter:image"
          content="https://wordle-step.vercel.app/wordle-banner.png"
        />
      </Head>

      <div className={styles.content}>
        <div className={styles.anchors}>
          <a className={styles.anchor} href="#how_to_play">
            How To Play
          </a>
          <a className={styles.anchor} href="#tips">
            Tips
          </a>
          <a className={styles.anchor} href="#how_it_was_built">
            How It Was Built
          </a>
          <a className={styles.anchor} href="#releases">
            Releases
          </a>
        </div>

        <div className={styles.sections_container}>
          <div className={styles.section}>
            <a id="how_to_play">
              <h1 className={styles.title}>How To Play</h1>
            </a>
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

            <Link href="/short">
              <div className={styles.row}>
                {["R", "E", "A", "D", "Y", "?"].map((letter, i) => (
                  <div key={i} className={styles.letter}>
                    {letter}
                  </div>
                ))}
              </div>
              <div className={`${styles.subtitle} ${styles.link}`}>
                Start playing!
              </div>
            </Link>
          </div>

          <div className={styles.section}>
            <a id="tips">
              <h1 className={styles.title}>Tips</h1>
            </a>
            <ul className={styles.list}>
              <li className={styles.item}>
                Games come in three difficulties:{" "}
                <Link href="/short">
                  <span className={styles.emphasis_green}>Short</span>
                </Link>
                ,{" "}
                <Link href="/medium">
                  <span className={styles.emphasis_yellow}>Medium</span>
                </Link>
                , and{" "}
                <Link href="/long">
                  <span className={styles.emphasis_red}>Long</span>
                </Link>
                . Change difficulties in the top right corner.
              </li>
              <li className={styles.item}>
                Don{"'"}t wait a day to play again. Just reload the page to
                start a new game!
              </li>
            </ul>

            <p className={styles.paragraph}>(Oh, and have fun!)</p>
          </div>

          <div className={styles.section}>
            <a id="how_it_was_built">
              <h1 className={styles.title}>How It Was Built</h1>
            </a>
            <h3 className={styles.subtitle}>
              Beg NY Times for their Wordle code.
            </h3>

            <p className={styles.paragraph}>
              ...if that doesn{"'"}t work, here was my journey developing this
              game:
            </p>

            <h2 className={styles.subheading}>Technologies & Frameworks</h2>

            <ul className={styles.list}>
              <li className={styles.item}>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.technology}
                >
                  React + Next.js
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.technology}
                  style={{ color: "#2f74c0" }}
                >
                  TypeScript
                </a>
              </li>
              <li className={styles.item}>
                <a
                  href="https://sass-lang.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.technology}
                  style={{ color: "#bf4080" }}
                >
                  Sass
                </a>
              </li>
            </ul>

            <h2 className={styles.subheading}>Things I Learned</h2>
            <p className={styles.paragraph}>
              While this wasn{"'"}t my first rodeo with React and Next.js, it
              was my first time creating a web game from scratch and it was a
              lot of fun! As my second decently-sized web project, I{"'"}m proud
              of the result and learned a whole lot, ranging from:
            </p>
            <ul className={styles.list}>
              <li className={styles.item}>
                Developing for mobile responsiveness and UX (especially
                important for a game with many moving parts)
              </li>
              <li className={styles.item}>
                The joys of developing with TypeScript (!!)
              </li>
              <li className={styles.item}>
                Deepening my React proficiency with context and custom hooks
              </li>
              <li className={styles.item}>
                Configuring and deploying a Next.js project on Vercel
              </li>
            </ul>

            <h2 className={styles.subheading}>Challenges I Faced</h2>
            <ul className={styles.list}>
              <li className={styles.item}>
                I had to figure out a way to generate random words that weren
                {"'"}t crazy obscure (who{"'"}s gonna guess a word like{" "}
                <a
                  className={styles.blue_link}
                  href="https://www.dictionary.com/browse/ducat"
                  target="_blank"
                  rel="noreferrer"
                >
                  {'"Ducat"'}
                </a>
                ) but still allow them to be guessed by the player. To solve
                this, I used{" "}
                <a
                  className={styles.blue_link}
                  href="https://www.npmjs.com/package/random-words"
                  target="_blank"
                  rel="noreferrer"
                >
                  random-words
                </a>{" "}
                to generate words for the game and parsed through a 370,000+
                line txt file of English words to create the game dictionary.
              </li>
              <li className={styles.item}>
                Parsing through said txt file worked in development but failed
                in production, causing the game dictionary to be empty on
                Vercel. The file on my Windows laptop had words separated by a
                Carriage Return and Line Feed (CR + LF) character, while the
                file in production was only separated by LF. Splitting the file
                {"'"}s contents with CR + LF in production would therefore
                produce an empty list of valid words. I fixed this by
                conditionally splitting the file based on the environment.
              </li>
              <li className={styles.item}>
                Testing the game because I{"'"}m bad at Wordle.
              </li>
            </ul>
          </div>

          <div className={styles.section}>
            <a id="releases">
              <h1 className={styles.title}>Releases</h1>
            </a>
            <h3 className={styles.subtitle}>v 1.0.0</h3>
            <ul className={styles.list}>
              <li className={styles.item}>Wordle Step released!</li>
              <li className={styles.item}>
                Games come in three difficulties: Short, Medium, and Long
              </li>
              <li className={styles.item}>
                Wordle answers are relatively common words, may tweak if
                difficulty or word variance is lacking
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
