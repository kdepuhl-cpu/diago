"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EPaperIssue, ArchivIssue } from "@/lib/mock/epaper";

interface EPaperReaderPageProps {
  issue: EPaperIssue | ArchivIssue;
}

export default function EPaperReaderPage({ issue }: EPaperReaderPageProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const totalPages = issue.pages.length;

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
  }, []);

  // Auto-hide controls after 3s
  useEffect(() => {
    hideTimeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      showControls();
      switch (e.key) {
        case "ArrowRight":
        case " ":
          e.preventDefault();
          nextPage();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevPage();
          break;
        case "Home":
          e.preventDefault();
          goToPage(0);
          break;
        case "End":
          e.preventDefault();
          goToPage(totalPages - 1);
          break;
        case "Escape":
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, goToPage, totalPages, showControls]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextPage();
      else prevPage();
    }
    touchStartX.current = null;
    showControls();
  };

  // Click on left/right side
  const handleAreaClick = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const thirdWidth = rect.width / 3;

    if (clickX < thirdWidth) {
      prevPage();
    } else if (clickX > thirdWidth * 2) {
      nextPage();
    }
    showControls();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gray-950 z-50 flex flex-col select-none"
      onMouseMove={showControls}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent reader-controls ${
          controlsVisible ? "" : "reader-controls-hidden"
        }`}
      >
        <Link
          href="/epaper"
          className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück
        </Link>
        <span className="text-white/80 text-sm font-medium truncate mx-4">
          {issue.title}
        </span>
        <span className="text-white/60 text-sm tabular-nums">
          Seite {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Page Content */}
      <div
        className="flex-1 flex items-center justify-center relative cursor-pointer"
        onClick={handleAreaClick}
      >
        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevPage();
            showControls();
          }}
          disabled={currentPage === 0}
          className={`absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all reader-controls ${
            controlsVisible ? "" : "reader-controls-hidden"
          } ${currentPage === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Image */}
        <div className="relative w-full h-full max-w-[600px] max-h-[90vh] mx-auto px-12 sm:px-20 py-4">
          <Image
            src={issue.pages[currentPage]}
            alt={`${issue.title} — Seite ${currentPage + 1}`}
            fill
            className="object-contain"
            priority
          />
          {/* Preload adjacent pages */}
          {currentPage + 1 < totalPages && (
            <link rel="preload" as="image" href={issue.pages[currentPage + 1]} />
          )}
          {currentPage - 1 >= 0 && (
            <link rel="preload" as="image" href={issue.pages[currentPage - 1]} />
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextPage();
            showControls();
          }}
          disabled={currentPage === totalPages - 1}
          className={`absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all reader-controls ${
            controlsVisible ? "" : "reader-controls-hidden"
          } ${currentPage === totalPages - 1 ? "opacity-30 cursor-not-allowed" : ""}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page Dots */}
      <div
        className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 reader-controls ${
          controlsVisible ? "" : "reader-controls-hidden"
        }`}
      >
        {issue.pages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              goToPage(index);
              showControls();
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentPage
                ? "bg-white w-3"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Seite ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
