"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "diago-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
  }, []);

  const toggleBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(slug);
      const updated = isBookmarked
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}
