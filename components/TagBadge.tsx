import Link from "next/link";

export function TagBadge({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      href={`/tag/${slug}`}
      className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200"
    >
      #{name}
    </Link>
  );
}
