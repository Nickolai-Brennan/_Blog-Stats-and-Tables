export type SEO = {
  title: string;
  description: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
};

export type Author = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatarUrl: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type StatsColumn = {
  key: string;
  label: string;
  type: "text" | "number" | "percent" | "currency";
};

export type StatsRow = {
  id: string;
  values: Record<string, string | number>;
  highlighted?: boolean;
};

export type StatsTable = {
  id: string;
  slug: string;
  title: string;
  description: string;
  columns: StatsColumn[];
  rows: StatsRow[];
  stylingRules?: {
    positiveKey?: string;
    negativeKey?: string;
    highlightThreshold?: number;
  };
};

export type RichBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "callout"; tone: "info" | "success" | "warning"; text: string }
  | { type: "statsTable"; tableSlug: string }
  | { type: "code"; language: string; code: string };

export type Post = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  authorId: string;
  categoryId: string;
  tagIds: string[];
  publishedAt: string;
  updatedAt: string;
  seo: SEO;
  contentBlocks: RichBlock[];
  trendingScore: number;
  views: number;
};
