"use client";

import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EPaperIssue, ArchivIssue } from "@/lib/mock/epaper";

interface EPaperReaderPageProps {
  issue: EPaperIssue | ArchivIssue;
}

// ── Single page wrapper for react-pageflip (requires forwardRef) ──
const FlipPage = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  function FlipPage(props, ref) {
    return (
      <div ref={ref} className="bg-white">
        {props.children}
      </div>
    );
  }
);

export default function EPaperReaderPage({ issue }: EPaperReaderPageProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [FlipBook, setFlipBook] = useState<React.ComponentType<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);

  const totalPages = issue.pages.length;

  // ── Load react-pageflip dynamically (no SSR) ──
  useEffect(() => {
    import("react-pageflip").then((mod) => {
      setFlipBook(() => mod.default);
    });
  }, []);

  // ── Navigation ──
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    } else {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    } else {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setControlsVisible(false), 4000);
  }, []);

  // Auto-hide controls after 4s
  useEffect(() => {
    hideTimeoutRef.current = setTimeout(() => setControlsVisible(false), 4000);
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
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, goToPage, totalPages, showControls]);

  // Touch swipe fallback (before FlipBook loads)
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

  // FlipBook page change handler
  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
    showControls();
  }, [showControls]);

  // ── FlipBook Reader ──
  if (FlipBook) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gray-950 z-50 flex flex-col select-none"
        onMouseMove={showControls}
      >
        {/* Top Bar */}
        <div
          className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent reader-controls ${
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

        {/* FlipBook */}
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <FlipBook
            ref={flipBookRef}
            width={550}
            height={733}
            size="stretch"
            minWidth={280}
            maxWidth={800}
            minHeight={373}
            maxHeight={1066}
            showCover={true}
            mobileScrollSupport={false}
            drawShadow={true}
            flippingTime={800}
            usePortrait={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            useMouseEvents={true}
            className=""
            style={{}}
            onFlip={onFlip}
          >
            {issue.pages.map((src, i) => (
              <FlipPage key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Seite ${i + 1}`}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </FlipPage>
            ))}
          </FlipBook>
        </div>

        {/* Bottom navigation */}
        <div
          className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-6 reader-controls ${
            controlsVisible ? "" : "reader-controls-hidden"
          }`}
        >
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ${
              currentPage === 0 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-white/60 text-sm tabular-nums min-w-[80px] text-center">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage >= totalPages - 1}
            className={`p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ${
              currentPage >= totalPages - 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ── Fallback: Simple image viewer (while FlipBook JS loads) ──
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

      {/* Page Image */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative w-full h-full max-w-[600px] max-h-[90vh] mx-auto px-12 sm:px-20 py-14">
          <Image
            src={issue.pages[currentPage]}
            alt={`${issue.title} — Seite ${currentPage + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
