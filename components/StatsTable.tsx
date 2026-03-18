"use client";

import { useMemo, useState } from "react";
import { StatsColumn, StatsRow } from "@/lib/types";

type Props = {
  title: string;
  description?: string;
  columns: StatsColumn[];
  data: StatsRow[];
  stylingRules?: {
    positiveKey?: string;
    negativeKey?: string;
    highlightThreshold?: number;
  };
};

export function StatsTable({ title, description, columns, data, stylingRules }: Props) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key ?? "");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [query, setQuery] = useState("");

  const filteredAndSorted = useMemo(() => {
    const filtered = data.filter((row) => JSON.stringify(row.values).toLowerCase().includes(query.toLowerCase()));

    return [...filtered].sort((a, b) => {
      const left = a.values[sortKey];
      const right = b.values[sortKey];

      if (typeof left === "number" && typeof right === "number") {
        return sortDirection === "asc" ? left - right : right - left;
      }

      return sortDirection === "asc"
        ? String(left ?? "").localeCompare(String(right ?? ""))
        : String(right ?? "").localeCompare(String(left ?? ""));
    });
  }, [data, query, sortDirection, sortKey]);

  function onSort(key: string) {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("desc");
  }

  function getCellClass(key: string, value: string | number) {
    if (typeof value !== "number") {
      return "";
    }

    if (stylingRules?.positiveKey === key && value >= (stylingRules.highlightThreshold ?? 0)) {
      return "text-accent-success font-semibold";
    }

    if (stylingRules?.negativeKey === key && value < 0) {
      return "text-accent-danger font-semibold";
    }

    return "";
  }

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          {description && <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search table..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950"
          aria-label="Search stats table"
        />
      </div>

      <div className="overflow-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border-b border-slate-200 px-3 py-2 text-left font-semibold dark:border-slate-700">
                  <button type="button" onClick={() => onSort(column.key)} className="inline-flex items-center gap-1 hover:text-brand-600">
                    {column.label}
                    {sortKey === column.key ? (sortDirection === "asc" ? "↑" : "↓") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((row) => (
              <tr key={row.id} className={row.highlighted ? "bg-brand-50 dark:bg-brand-900/20" : ""}>
                {columns.map((column) => {
                  const value = row.values[column.key];
                  const cellClass = getCellClass(column.key, value);
                  return (
                    <td key={column.key} className={`border-b border-slate-200 px-3 py-2 dark:border-slate-800 ${cellClass}`}>
                      {typeof value === "number" && column.type === "percent" ? `${value}%` : String(value ?? "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
