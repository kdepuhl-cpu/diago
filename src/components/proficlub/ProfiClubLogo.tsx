"use client";

interface ProfiClubLogoProps {
  initials: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-10 h-10 text-xs",
  md: "w-16 h-16 text-lg",
  lg: "w-24 h-24 text-2xl",
};

export default function ProfiClubLogo({ initials, color, size = "md" }: ProfiClubLogoProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
