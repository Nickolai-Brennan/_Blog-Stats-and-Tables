import { getTaxonomy } from "@/lib/posts";

export default function EditorPage() {
  const { categories, tags } = getTaxonomy();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <h1 className="text-3xl font-black">Content Editor</h1>
        <p className="text-slate-600 dark:text-slate-300">Markdown-style admin input for posts, tables, and SEO fields.</p>
      </header>

      <form className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="Post title" />
          <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="URL slug" />
        </div>
        <textarea rows={3} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="Excerpt" />

        <textarea
          rows={12}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm dark:border-slate-700 dark:bg-slate-950"
          placeholder="Write Markdown content here...\n\n## Heading\nParagraph text"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
            <option value="">Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>

          <select multiple className="h-28 rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>{tag.name}</option>
            ))}
          </select>
        </div>

        <details className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <summary className="cursor-pointer text-sm font-semibold">SEO fields</summary>
          <div className="mt-3 grid gap-3">
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="SEO title" />
            <textarea rows={2} className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="SEO description" />
            <input className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950" placeholder="OG image URL" />
          </div>
        </details>

        <button type="button" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
          Save Draft
        </button>
      </form>
    </div>
  );
}
