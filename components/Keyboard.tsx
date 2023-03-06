import { useEffect, useState } from "react";
import { keyboardKeys } from "@/utils/legalKeys";
import styles from "@/styles/Keyboard.module.scss";
import Image from "next/image";

type BoxStatus = "correct" | "wrong" | "inaccurate";

interface KeyboardProps {
  prevGuesses: string[];
  currentGuessAccuracy: BoxStatus[];
  screenWidth: number | undefined;
}

export default function Keyboard({
  prevGuesses,
  currentGuessAccuracy,
  screenWidth,
}: KeyboardProps) {
  const [wrongKeys, setWrongKeys] = useState<string[]>([]);
  const [inaccurateKeys, setInaccurateKeys] = useState<string[]>([]);
  const [correctKeys, setCorrectKeys] = useState<string[]>([]);

  useEffect(() => {
    if (prevGuesses.length === 0) {
      setWrongKeys([]);
      setInaccurateKeys([]);
      setCorrectKeys([]);
    } else {
      const lastGuess = prevGuesses[prevGuesses.length - 1];
      console.log(`lastGuess: ${lastGuess}`);

      Array.from(lastGuess).forEach((key, i) => {
        if (currentGuessAccuracy[i] === "wrong" && !wrongKeys.includes(key))
          setWrongKeys((prev) => [...prev, key]);
        if (
          currentGuessAccuracy[i] === "inaccurate" &&
          !inaccurateKeys.includes(key)
        )
          setInaccurateKeys((prev) => [...prev, key]);
        if (currentGuessAccuracy[i] === "correct" && !correctKeys.includes(key))
          setCorrectKeys((prev) => [...prev, key]);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevGuesses]);

  function handleLetterClass(key: string): string {
    let keyClass = `${styles.key} `;
    if (correctKeys.includes(key)) keyClass += styles.green;
    else if (inaccurateKeys.includes(key)) keyClass += styles.yellow;
    else if (wrongKeys.includes(key)) keyClass += styles.gray;

    return keyClass;
  }

  function handleKeySize(): number {
    if (!screenWidth) return 40;
    const maxKeySize = (screenWidth - 80) / 10;
    return Math.min(maxKeySize, 40);
  }

  return (
    <div className={styles.content}>
      <div className={styles.row}>
        {keyboardKeys.slice(0, 10).map((key) => (
          <button
            className={handleLetterClass(key)}
            key={key}
            style={{
              width: handleKeySize(),
              fontSize: Math.max(handleKeySize() * 0.45, 15),
            }}
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent("keydown", { key }))
            }
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        {keyboardKeys.slice(10, 19).map((key) => (
          <button
            className={handleLetterClass(key)}
            key={key}
            style={{
              width: handleKeySize(),
              fontSize: Math.max(handleKeySize() * 0.45, 15),
            }}
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent("keydown", { key }))
            }
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.row}>
        <button
          className={styles.one_half_key}
          style={{
            width: handleKeySize() * 1.5 + 3,
            fontSize: Math.max(handleKeySize() * 0.3, 8),
          }}
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "Enter" })
            );
          }}
        >
          ENTER
        </button>
        {keyboardKeys.slice(19, 26).map((key) => (
          <button
            className={handleLetterClass(key)}
            key={key}
            style={{
              width: handleKeySize(),
              fontSize: Math.max(handleKeySize() * 0.45, 15),
            }}
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent("keydown", { key }))
            }
          >
            {key.toUpperCase()}
          </button>
        ))}
        <button
          className={styles.one_half_key}
          style={{
            width: handleKeySize() * 1.5 + 3,
            fontSize: Math.max(handleKeySize() * 0.3, 8),
          }}
          onClick={() =>
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "Backspace" })
            )
          }
        >
          <Image src="/backspace.svg" alt="Backspace" width={22} height={22} />
        </button>
      </div>
    </div>
  );
}
