"use client";

import { useEffect, useCallback } from "react";
import { Video, getPlatformLabel } from "@/lib/mock/videos";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function VideoModal({ video, onClose, onNext, onPrev }: VideoModalProps) {
  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && onNext) {
        onNext();
      } else if (e.key === "ArrowLeft" && onPrev) {
        onPrev();
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Generate embed URL based on platform
  const getEmbedContent = () => {
    const { platform, embedUrl, videoUrl } = video;

    // If we have an embed URL, use it
    if (embedUrl) {
      if (platform === "youtube") {
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        );
      }

      if (platform === "instagram") {
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            title={video.title}
          />
        );
      }

      if (platform === "tiktok") {
        return (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        );
      }
    }

    // Fallback: Show a placeholder with link to original
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-8">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-center mb-4">{video.title}</h3>
        <p className="text-gray-400 text-center mb-6">
          Video auf {getPlatformLabel(platform)} ansehen
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-forest-green text-white rounded-xl font-semibold hover:bg-forest-green/90 transition-colors"
        >
          Video öffnen →
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[400px] mx-4 aspect-[9/16] max-h-[90vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Video Embed */}
        {getEmbedContent()}

        {/* Navigation Arrows (if multiple videos) */}
        {onPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Vorheriges Video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Nächstes Video"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Video Title (below modal) */}
      <div className="absolute bottom-8 left-0 right-0 text-center px-4">
        <p className="text-white font-medium text-lg max-w-md mx-auto">
          {video.title}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          ← → zum Navigieren • ESC zum Schließen
        </p>
      </div>
    </div>
  );
}
