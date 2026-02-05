"use client";

import { Kategorie, KATEGORIE_LABELS } from "@/lib/types";

interface CategoryFilterProps {
  selected: Kategorie | "all";
  onChange: (category: Kategorie | "all") => void;
}

const categories: (Kategorie | "all")[] = ["all", "spielbericht", "analyse", "transfer", "news", "interview"];

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selected === cat
              ? "bg-forest-green text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {cat === "all" ? "Alle" : KATEGORIE_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
