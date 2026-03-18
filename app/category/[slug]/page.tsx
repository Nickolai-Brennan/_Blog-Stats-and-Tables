import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { getTaxonomy, listPosts, getPostPresentation } from "@/lib/posts";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { categories } = getTaxonomy();
  const category = categories.find((item) => item.slug === params.slug);

  if (!category) {
    notFound();
  }

  const posts = listPosts({ category: category.slug }).map(getPostPresentation);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black">{category.name}</h1>
        <p className="text-slate-600 dark:text-slate-300">{category.description}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
