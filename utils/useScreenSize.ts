import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export default function useScreenSize() {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      console.log(window.innerWidth);

      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize, true);

    handleResize();

    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  return size;
}
