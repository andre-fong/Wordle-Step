import React, { useEffect } from "react";
import styles from "@/styles/BackgroundBlur.module.scss";
import useScreenSize from "@/utils/useScreenSize";
import Slide from "@mui/material/Slide";

type BoxColor = "green" | "yellow" | "gray";

interface BackgroundBlurProps {
  header: string;
  children: React.ReactNode;
  open: boolean;
  color: BoxColor;
  setOpen: (open: boolean) => void;
}

export default function BackgroundBlur({
  header,
  children,
  open,
  color,
  setOpen,
}: BackgroundBlurProps) {
  const { width, height } = useScreenSize();
  const headerArray = Array.from(header.toUpperCase());

  function handleBoxSize(wordLength: number): number {
    if (!width || !wordLength) return 50;

    const maxBoxSize = (width - 80) / wordLength - 5;
    return Math.min(maxBoxSize, 52);
  }

  // Animate header letters
  useEffect(() => {
    const letters = document.querySelectorAll(".animate_header");

    if (open) {
      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add(styles.snake);
        }, 150 * i);
      });
    } else {
      letters.forEach((letter) => {
        letter.classList.remove(styles.snake);
      });
    }
  }, [open]);

  return (
    <div
      className={styles.content}
      style={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
      }}
    >
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 800, exit: 600 }}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            {headerArray.map((letter, i) => (
              <div
                key={i}
                className={`${styles.letter} ${styles[color]} animate_header`}
                style={{
                  width: handleBoxSize(header.length),
                  height: handleBoxSize(header.length),
                  fontSize: handleBoxSize(header.length) * 0.6,
                }}
              >
                {letter}
              </div>
            ))}
          </div>

          {children}
        </div>
      </Slide>
    </div>
  );
}
