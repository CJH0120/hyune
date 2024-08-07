"use client";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../useDebounce";

export const useWindowSize = (delay: number = 100) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const debounceFunc = useDebounce(handleResize, delay);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", debounceFunc);
      debounceFunc();

      return () => {
        window.removeEventListener("resize", debounceFunc);
      };
    }
  }, [debounceFunc]);

  return windowSize;
};
