import Link from "next/link";
import { getPopularPosts, getTaxonomy, getTrendingPosts, listPosts, getPostPresentation } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TagBadge } from "@/components/TagBadge";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function HomePage() {
  const allPosts = listPosts();
  const featured = getPostPresentation(allPosts[0]);
  const trending = getTrendingPosts(3).map(getPostPresentation);
  const latest = allPosts.slice(0, 6).map(getPostPresentation);
  const popular = getPopularPosts(5).map(getPostPresentation);
  const { categories, tags } = getTaxonomy();

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900">
          <img src={featured.featuredImage} alt={featured.title} className="h-72 w-full object-cover" />
          <div className="space-y-4 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Featured</p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              <Link href={`/posts/${featured.slug}`} className="hover:text-brand-600">
                {featured.title}
              </Link>
            </h1>
            <p className="text-slate-600 dark:text-slate-300">{featured.excerpt}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Trending</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {trending.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const match = latest.filter((post) => post.category?.slug === category.slug).slice(0, 1);
              const post = match[0];
              return (
                <article key={category.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <Link href={`/category/${category.slug}`} className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                    {category.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
                  {post && (
                    <p className="mt-3 text-sm font-semibold">
                      <Link href={`/posts/${post.slug}`} className="hover:text-brand-600">
                        {post.title}
                      </Link>
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Latest</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {latest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold">Popular Posts</h3>
          <ul className="mt-3 space-y-3 text-sm">
            {popular.map((post) => (
              <li key={post.id}>
                <Link href={`/posts/${post.slug}`} className="font-semibold hover:text-brand-600">
                  {post.title}
                </Link>
                <p className="text-xs text-slate-500">{post.views.toLocaleString()} views</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold">Tags Cloud</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag.id} slug={tag.slug} name={tag.name} />
            ))}
          </div>
        </section>

        <NewsletterSignup />
      </aside>
    </div>
  );
}
