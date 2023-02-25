import { useState, useEffect, useCallback } from "react";
import { legalKeys } from "@/utils/legalKeys";

export default function useKeyboardInput(maxLength: number) {
  const [guess, setGuess] = useState<string>("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!legalKeys.includes(e.key)) return;

      setGuess((prevGuess: string) => {
        if (e.key === "Backspace") {
          return prevGuess.slice(0, -1);
        }
        if (prevGuess.length >= maxLength) return prevGuess;
        return prevGuess + e.key.toLowerCase();
      });
    },
    [maxLength]
  );

  const disableInput = useCallback(() => {
    console.log("disabling input");
    window.removeEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  const enableInput = useCallback(() => {
    console.log("enabling input");
    window.addEventListener("keydown", handleKeyDown, true);
  }, [handleKeyDown]);

  const resetGuess = useCallback(() => {
    console.log("resetting input");
    setGuess("");
  }, []);

  useEffect(() => {
    enableInput();

    return () => {
      disableInput();
    };
  }, [enableInput, disableInput]);

  return { guess, resetGuess, enableInput, disableInput };
}
