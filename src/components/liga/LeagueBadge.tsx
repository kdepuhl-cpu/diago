import { Liga } from "@/lib/types";

interface LeagueBadgeProps {
  liga: Liga;
}

export default function LeagueBadge({ liga }: LeagueBadgeProps) {
  return (
    <span className="bg-forest-green text-off-white text-xs font-semibold px-2 py-1 rounded">
      {liga.name}
    </span>
  );
}
