"use client";

interface NewBadgeProps {
  date: string;
  className?: string;
}

export default function NewBadge({ date, className = "" }: NewBadgeProps) {
  const articleDate = new Date(date);
  const now = new Date();
  const hoursDiff = (now.getTime() - articleDate.getTime()) / (1000 * 60 * 60);

  // Show badge if article is less than 24 hours old
  if (hoursDiff > 24) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-electric-orange text-white ${className}`}
    >
      Neu
    </span>
  );
}
