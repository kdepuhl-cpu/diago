"use client";

import { useReadArticles } from "@/hooks/useReadArticles";

interface ReadIndicatorProps {
  slug: string;
  className?: string;
}

export default function ReadIndicator({ slug, className = "" }: ReadIndicatorProps) {
  const { isRead } = useReadArticles();

  if (!isRead(slug)) return null;

  return (
    <span className={`text-forest-green ${className}`} title="Bereits gelesen">
      ✓
    </span>
  );
}
