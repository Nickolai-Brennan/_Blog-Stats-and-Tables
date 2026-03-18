import Link from "next/link";
import { ArchiveControls } from "@/components/ArchiveControls";
import { PostCard } from "@/components/PostCard";
import { getTaxonomy, listPosts, getPostPresentation } from "@/lib/posts";

type SearchParams = {
  category?: string;
  tag?: string;
  search?: string;
  date?: string;
  view?: "grid" | "list";
  page?: string;
};

const PAGE_SIZE = 6;

export default function ArchivePage({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page ?? "1");
  const filters = {
    category: searchParams.category,
    tag: searchParams.tag,
    search: searchParams.search,
    date: searchParams.date
  };

  const results = listPosts(filters).map(getPostPresentation);
  const offset = (page - 1) * PAGE_SIZE;
  const paginated = results.slice(offset, offset + PAGE_SIZE);
  const hasNextPage = offset + PAGE_SIZE < results.length;
  const { categories, tags } = getTaxonomy();
  const view = searchParams.view === "list" ? "list" : "grid";

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black">Archive</h1>
        <p className="text-slate-600 dark:text-slate-300">Filter by category, tag, date, and full-text search.</p>
      </header>

      <form className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <select name="category" defaultValue={searchParams.category} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
        <select name="tag" defaultValue={searchParams.tag} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.slug}>{tag.name}</option>
          ))}
        </select>
        <input type="date" name="date" defaultValue={searchParams.date} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
        <input type="search" name="search" defaultValue={searchParams.search} placeholder="Search posts..." className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" />
        <input type="hidden" name="view" value={view} />
        <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 md:col-span-4 md:justify-self-start">
          Apply Filters
        </button>
      </form>

      <ArchiveControls
        view={view}
        category={searchParams.category}
        tag={searchParams.tag}
        search={searchParams.search}
        date={searchParams.date}
        page={page}
        hasNextPage={hasNextPage}
      />

      {view === "grid" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((post) => (
            <article key={post.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <Link href={`/category/${post.category?.slug}`} className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {post.category?.name}
              </Link>
              <h2 className="mt-1 text-xl font-bold">
                <Link href={`/posts/${post.slug}`} className="hover:text-brand-600">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
