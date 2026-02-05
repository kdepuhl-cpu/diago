"use client";

import { useBookmarks } from "@/hooks/useBookmarks";

interface BookmarkButtonProps {
  slug: string;
  className?: string;
  showLabel?: boolean;
}

export default function BookmarkButton({ slug, className = "", showLabel = false }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(slug);
      }}
      className={`flex items-center gap-2 transition-colors ${
        bookmarked ? "text-forest-green" : "text-gray-400 hover:text-forest-green"
      } ${className}`}
      title={bookmarked ? "Lesezeichen entfernen" : "Lesezeichen hinzufügen"}
    >
      <svg
        className="w-5 h-5"
        fill={bookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {showLabel && <span>{bookmarked ? "Gespeichert" : "Speichern"}</span>}
    </button>
  );
}
