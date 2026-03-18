import Link from "next/link";
import { format } from "date-fns";

type CardPost = {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  publishedAt: string;
  category: { slug: string; name: string };
};

export function PostCard({ post, compact = false }: { post: CardPost; compact?: boolean }) {
  return (
    <article className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900 ${compact ? "" : "h-full"}`}>
      <Link href={`/posts/${post.slug}`}>
        <img src={post.featuredImage} alt={post.title} className="h-48 w-full object-cover" />
      </Link>
      <div className="space-y-3 p-4">
        <Link href={`/category/${post.category.slug}`} className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          {post.category.name}
        </Link>
        <h3 className="text-lg font-bold leading-tight">
          <Link href={`/posts/${post.slug}`} className="hover:text-brand-600">
            {post.title}
          </Link>
        </h3>
        {!compact && <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">{format(new Date(post.publishedAt), "MMM d, yyyy")}</p>
      </div>
    </article>
  );
}
