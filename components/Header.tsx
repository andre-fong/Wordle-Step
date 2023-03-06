import React from "react";
import styles from "@/styles/Header.module.scss";
import { useAnswer } from "@/components/AnswerContext";

export default function Header() {
  const { answer } = useAnswer();

  return (
    <header className={styles.content}>
      <h1 className={styles.title}>Wordle Step</h1>
    </header>
  );
}
