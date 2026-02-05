"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "diago-read-articles";

export function useReadArticles() {
  const [readArticles, setReadArticles] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setReadArticles(JSON.parse(stored));
      } catch {
        setReadArticles([]);
      }
    }
  }, []);

  // Mark an article as read
  const markAsRead = useCallback((slug: string) => {
    setReadArticles((prev) => {
      if (prev.includes(slug)) return prev;
      const updated = [...prev, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Check if an article is read
  const isRead = useCallback(
    (slug: string) => {
      return readArticles.includes(slug);
    },
    [readArticles]
  );

  return { readArticles, markAsRead, isRead };
}

// Standalone functions for server components or non-hook usage
export function getReadArticles(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function markArticleAsReadDirect(slug: string): void {
  if (typeof window === "undefined") return;
  const current = getReadArticles();
  if (!current.includes(slug)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, slug]));
  }
}

export function isArticleReadDirect(slug: string): boolean {
  return getReadArticles().includes(slug);
}
