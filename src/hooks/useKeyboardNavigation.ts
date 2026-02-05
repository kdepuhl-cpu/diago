"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useKeyboardNavigation(articleSlugs: string[], currentIndex: number = -1) {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "j" || e.key === "ArrowDown") {
        // Next article
        e.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < articleSlugs.length) {
          router.push(`/artikel/${articleSlugs[nextIndex]}`);
        }
      } else if (e.key === "k" || e.key === "ArrowUp") {
        // Previous article
        e.preventDefault();
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          router.push(`/artikel/${articleSlugs[prevIndex]}`);
        }
      } else if (e.key === "h" || e.key === "Escape") {
        // Go home
        e.preventDefault();
        router.push("/");
      }
    },
    [articleSlugs, currentIndex, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
