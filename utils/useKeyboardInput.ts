import { useState, useEffect } from "react";
import { legalKeys } from "@/utils/legalKeys";

export default function useKeyboardInput(maxLength: number) {
  const [guess, setGuess] = useState<string>("");

  function handleKeyDown(e: KeyboardEvent) {
    if (!legalKeys.includes(e.key)) return;

    setGuess((prevGuess: string) => {
      if (e.key === "Backspace") {
        return prevGuess.slice(0, -1);
      }
      if (prevGuess.length >= maxLength) return prevGuess;
      return prevGuess + e.key.toLowerCase();
    });
  }

  useEffect(() => {
    enableInput();

    return () => {
      disableInput();
    };
  });

  function disableInput() {
    window.removeEventListener("keydown", handleKeyDown);
  }

  function enableInput() {
    window.addEventListener("keydown", handleKeyDown);
  }

  function resetGuess() {
    setGuess("");
  }

  return { guess, resetGuess, enableInput, disableInput };
}
