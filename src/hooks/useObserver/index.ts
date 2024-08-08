"use client";
import { useCallback, useEffect, useRef } from "react";

export const useObserver = (onIntersect: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [ref, callback, onIntersect]);

  return ref;
};
