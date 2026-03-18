import Link from "next/link";

type Props = {
  view: "grid" | "list";
  category?: string;
  tag?: string;
  search?: string;
  date?: string;
  page: number;
  hasNextPage: boolean;
};

function buildQuery({
  view,
  category,
  tag,
  search,
  date,
  page
}: {
  view: "grid" | "list";
  category?: string;
  tag?: string;
  search?: string;
  date?: string;
  page: number;
}) {
  const params = new URLSearchParams();

  params.set("view", view);
  if (category) params.set("category", category);
  if (tag) params.set("tag", tag);
  if (search) params.set("search", search);
  if (date) params.set("date", date);
  params.set("page", String(page));

  return `/archive?${params.toString()}`;
}

export function ArchiveControls({ view, category, tag, search, date, page, hasNextPage }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex rounded-lg border border-slate-300 p-1 dark:border-slate-700">
        <Link
          href={buildQuery({ view: "grid", category, tag, search, date, page: 1 })}
          className={`rounded px-3 py-1 text-sm ${view === "grid" ? "bg-brand-600 text-white" : ""}`}
        >
          Grid
        </Link>
        <Link
          href={buildQuery({ view: "list", category, tag, search, date, page: 1 })}
          className={`rounded px-3 py-1 text-sm ${view === "list" ? "bg-brand-600 text-white" : ""}`}
        >
          List
        </Link>
      </div>
      <div className="flex items-center gap-2 text-sm">
        {page > 1 && (
          <Link href={buildQuery({ view, category, tag, search, date, page: page - 1 })} className="rounded border border-slate-300 px-3 py-1 dark:border-slate-700">
            Previous
          </Link>
        )}
        {hasNextPage && (
          <Link href={buildQuery({ view, category, tag, search, date, page: page + 1 })} className="rounded border border-slate-300 px-3 py-1 dark:border-slate-700">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
