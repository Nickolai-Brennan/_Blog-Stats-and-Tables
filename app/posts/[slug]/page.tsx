import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatsTable } from "@/components/StatsTable";
import { TagBadge } from "@/components/TagBadge";
import { getPostBySlug, getPostPresentation, getRelatedPosts, getStatsTableBySlug, getTaxonomy } from "@/lib/posts";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post not found" };
  }

  return buildMetadata({
    title: post.seo.title,
    description: post.seo.description,
    path: `/posts/${post.slug}`,
    image: post.seo.ogImage
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const source = getPostBySlug(params.slug);

  if (!source) {
    notFound();
  }

  const post = getPostPresentation(source);
  const headings = post.contentBlocks
    .filter((block): block is Extract<(typeof post.contentBlocks)[number], { type: "heading" }> => block.type === "heading")
    .map((heading) => ({ ...heading, anchor: heading.text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") }));

  const related = getRelatedPosts(source, 3).map(getPostPresentation);
  const jsonLd = articleJsonLd({
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    authorName: post.author?.name ?? "DataPlaybook",
    slug: post.slug
  });

  return (
    <article className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div>
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{post.category?.name}</p>
          <h1 className="text-4xl font-black tracking-tight">{post.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">{post.subtitle}</p>
          <div className="text-sm text-slate-500">
            By {post.author?.name} · {format(new Date(post.publishedAt), "MMM d, yyyy")} · Updated {format(new Date(post.updatedAt), "MMM d, yyyy")}
          </div>
          <img src={post.featuredImage} alt={post.title} className="h-80 w-full rounded-xl object-cover" />
        </header>

        <section className="prose-article mt-6 max-w-none">
          {post.contentBlocks.map((block, index) => {
            if (block.type === "paragraph") {
              return <p key={index}>{block.text}</p>;
            }

            if (block.type === "heading") {
              const anchor = block.text.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
              return block.level === 2 ? (
                <h2 key={index} id={anchor}>{block.text}</h2>
              ) : (
                <h3 key={index} id={anchor}>{block.text}</h3>
              );
            }

            if (block.type === "callout") {
              const toneClass = {
                info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-900/20 dark:text-blue-100",
                success: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
                warning: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-100"
              }[block.tone];
              return (
                <div key={index} className={`mt-5 rounded-lg border px-4 py-3 text-sm font-medium ${toneClass}`}>
                  {block.text}
                </div>
              );
            }

            if (block.type === "statsTable") {
              const table = getStatsTableBySlug(block.tableSlug);
              if (!table) return null;
              return (
                <StatsTable
                  key={table.id}
                  title={table.title}
                  description={table.description}
                  columns={table.columns}
                  data={table.rows}
                  stylingRules={table.stylingRules}
                />
              );
            }

            if (block.type === "code") {
              return (
                <pre key={index} className="mt-4 overflow-auto rounded-lg bg-slate-900 p-4 text-xs text-slate-100">
                  <code>{block.code}</code>
                </pre>
              );
            }

            return null;
          })}
        </section>

        <footer className="mt-10 space-y-5 border-t border-slate-200 pt-6 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag.id} slug={tag.slug} name={tag.name} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold">Share:</span>
            <a className="rounded border border-slate-300 px-2 py-1 dark:border-slate-700" href={`https://twitter.com/intent/tweet?url=https://example.com/posts/${post.slug}`}>
              X / Twitter
            </a>
            <a className="rounded border border-slate-300 px-2 py-1 dark:border-slate-700" href={`https://www.linkedin.com/sharing/share-offsite/?url=https://example.com/posts/${post.slug}`}>
              LinkedIn
            </a>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold">Related Posts</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{item.category?.name}</p>
                  <h3 className="mt-1 font-semibold">
                    <Link href={`/posts/${item.slug}`} className="hover:text-brand-600">
                      {item.title}
                    </Link>
                  </h3>
                </article>
              ))}
            </div>
          </section>
        </footer>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Table of Contents</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {headings.map((heading) => (
              <li key={heading.anchor}>
                <a href={`#${heading.anchor}`} className="hover:text-brand-600">
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </article>
  );
}
