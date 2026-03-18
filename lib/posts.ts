import { categories, posts, statsTables, tags, authors } from "@/lib/seed-data";
import { Post } from "@/lib/types";

export type PostFilters = {
  category?: string;
  tag?: string;
  search?: string;
  date?: string;
};

export function listPosts(filters: PostFilters = {}) {
  const searchValue = filters.search?.toLowerCase().trim();

  return posts
    .filter((post) => {
      if (filters.category) {
        const category = categories.find((item) => item.id === post.categoryId || item.slug === filters.category);
        if (!category || category.id !== post.categoryId) {
          return false;
        }
      }

      if (filters.tag) {
        const tag = tags.find((item) => item.id === filters.tag || item.slug === filters.tag);
        if (!tag || !post.tagIds.includes(tag.id)) {
          return false;
        }
      }

      if (filters.date) {
        const publishedDate = post.publishedAt.slice(0, 10);
        if (publishedDate !== filters.date) {
          return false;
        }
      }

      if (searchValue) {
        const haystack = [post.title, post.subtitle, post.excerpt, ...post.contentBlocks.map((block) => ("text" in block ? block.text : ""))]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(searchValue)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3) {
  return posts
    .filter((item) => item.id !== post.id)
    .map((item) => {
      const sameCategoryScore = item.categoryId === post.categoryId ? 2 : 0;
      const tagOverlap = item.tagIds.filter((tagId) => post.tagIds.includes(tagId)).length;
      return { item, score: sameCategoryScore + tagOverlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function getTrendingPosts(limit = 5) {
  return [...posts].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, limit);
}

export function getPopularPosts(limit = 5) {
  return [...posts].sort((a, b) => b.views - a.views).slice(0, limit);
}

export function getPostPresentation(post: Post) {
  const author = authors.find((item) => item.id === post.authorId);
  const category = categories.find((item) => item.id === post.categoryId);
  const postTags = tags.filter((item) => post.tagIds.includes(item.id));

  return {
    ...post,
    author,
    category,
    tags: postTags
  };
}

export function getStatsTableBySlug(slug: string) {
  return statsTables.find((table) => table.slug === slug);
}

export function getStatsTables() {
  return statsTables;
}

export function getTaxonomy() {
  return { categories, tags, authors };
}
