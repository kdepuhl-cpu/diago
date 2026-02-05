"use client";

import { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollable = docHeight - winHeight;

      if (scrollable > 0) {
        const percent = (scrollTop / scrollable) * 100;
        setProgress(Math.min(Math.max(percent, 0), 100));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visible after scrolling 50px (roughly 1-2% of most pages)
  const showBar = progress > 0.5;

  return (
    <div
      style={{
        position: "fixed",
        top: "48px", // Header height (h-12 = 3rem = 48px)
        left: 0,
        right: 0,
        height: "4px",
        backgroundColor: "rgba(255, 255, 255, 0.9)", // White track
        boxShadow: "0 1px 3px rgba(255, 255, 255, 0.3), 0 0 8px rgba(255, 255, 255, 0.15)",
        zIndex: 9999,
        opacity: showBar ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "#044110", // Forest Green
          transition: "width 0.1s ease-out",
        }}
      />
    </div>
  );
}
