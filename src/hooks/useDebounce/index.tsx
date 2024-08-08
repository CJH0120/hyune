import { useEffect, useState, useCallback, useRef } from "react";

type DebouncedValue<T> = T extends (...args: any) => any ? () => void : T;

export function useDebounce<T>(valueOrFunction: T | (() => void), delay: number): DebouncedValue<T> {
  const [debouncedValue, setDebouncedValue] = useState<T | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof valueOrFunction === "function") {
      const callback = valueOrFunction as () => void;

      timeoutRef.current = setTimeout(() => {
        callback();
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      const value = valueOrFunction as T;

      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [valueOrFunction, delay]);

  if (typeof valueOrFunction === "function") {
    return useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        (valueOrFunction as () => void)();
      }, delay);
    }, [valueOrFunction, delay]) as DebouncedValue<T>;
  } else {
    return debouncedValue as DebouncedValue<T>;
  }
}
