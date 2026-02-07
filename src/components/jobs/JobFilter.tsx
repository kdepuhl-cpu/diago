"use client";

import { useState } from "react";
import {
  JobKategorie,
  JobTyp,
  JOB_KATEGORIEN,
  JOB_TYP_LABELS,
  BEZIRKE,
} from "@/lib/jobs";

interface JobFilterProps {
  selectedKategorie: JobKategorie | "";
  selectedBezirk: string;
  selectedTyp: JobTyp | "";
  onKategorieChange: (value: JobKategorie | "") => void;
  onBezirkChange: (value: string) => void;
  onTypChange: (value: JobTyp | "") => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function JobFilter({
  selectedKategorie,
  selectedBezirk,
  selectedTyp,
  onKategorieChange,
  onBezirkChange,
  onTypChange,
  onReset,
  hasActiveFilters,
}: JobFilterProps) {
  const [open, setOpen] = useState(false);

  const filterCount = [selectedKategorie, selectedBezirk, selectedTyp].filter(Boolean).length;

  return (
    <div>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex sm:hidden items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-off-black dark:text-white w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
          {filterCount > 0 && (
            <span className="bg-forest-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </span>
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter selects — always visible on desktop, toggled on mobile */}
      <div className={`${open ? "flex" : "hidden"} sm:flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 mt-3 sm:mt-0`}>
        <select
          value={selectedKategorie}
          onChange={(e) => onKategorieChange(e.target.value as JobKategorie | "")}
          className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-off-black dark:text-white focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green"
        >
          <option value="">Alle Kategorien</option>
          {JOB_KATEGORIEN.map((k) => (
            <option key={k.id} value={k.id}>{k.label}</option>
          ))}
        </select>

        <select
          value={selectedBezirk}
          onChange={(e) => onBezirkChange(e.target.value)}
          className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-off-black dark:text-white focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green"
        >
          <option value="">Alle Bezirke</option>
          {BEZIRKE.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={selectedTyp}
          onChange={(e) => onTypChange(e.target.value as JobTyp | "")}
          className="px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-off-black dark:text-white focus:outline-none focus:border-forest-green focus:ring-1 focus:ring-forest-green"
        >
          <option value="">Alle Typen</option>
          {(Object.entries(JOB_TYP_LABELS) as [JobTyp, string][]).map(
            ([value, label]) => (
              <option key={value} value={value}>{label}</option>
            )
          )}
        </select>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-off-black dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Zurücksetzen
          </button>
        )}
      </div>
    </div>
  );
}
