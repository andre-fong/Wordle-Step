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
      console.log(Math.min(window.innerWidth, window.outerWidth));

      setSize({
        width: Math.min(window.innerWidth, window.outerWidth),
        height: Math.min(window.innerHeight, window.outerHeight),
      });
    }

    window.addEventListener("resize", handleResize, true);

    handleResize();

    return () => window.removeEventListener("resize", handleResize, true);
  }, []);

  return size;
}
