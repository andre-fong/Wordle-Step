import { useState, createContext, useContext, useCallback } from "react";
import rw from "random-words";

interface AnswerContextProps {
  answer: string;
  loading: boolean;
  generateAnswer: (length: number) => void;
}

interface AnswerProviderProps {
  children?: React.ReactNode;
}

const AnswerContext = createContext<AnswerContextProps>({
  answer: "",
  loading: true,
  generateAnswer: () => {},
});

export default function AnswerProvider({ children }: AnswerProviderProps) {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const generateAnswer = useCallback((length: number) => {
    let correctLength = false;
    let randomWord = "";
    let iterations = 0;
    while (!correctLength) {
      if (iterations > 10000) {
        alert("Something went wrong. Please refresh the page.");
        break;
      }

      randomWord = rw({ exactly: 1, maxLength: length + 5 })[0];
      if (randomWord.length === length) correctLength = true;
      iterations++;
    }
    setLoading(false);
    setAnswer(randomWord);
  }, []);

  return (
    <AnswerContext.Provider value={{ answer, loading, generateAnswer }}>
      {children}
    </AnswerContext.Provider>
  );
}

export function useAnswer() {
  const context: AnswerContextProps | undefined = useContext(AnswerContext);
  if (context === undefined) {
    throw new Error("useAnswer must be used within a AnswerProvider");
  }

  return context;
}
