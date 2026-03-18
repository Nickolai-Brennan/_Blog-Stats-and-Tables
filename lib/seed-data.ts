import { Author, Category, Post, StatsTable, Tag } from "@/lib/types";

export const authors: Author[] = [
  {
    id: "1b8e6eb6-9104-4d72-bf0f-cfd94ff6b287",
    name: "Nick Brennan",
    slug: "nick-brennan",
    bio: "Sports analytics writer focused on betting edges and model transparency.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
  },
  {
    id: "378fcf03-7ca6-4f8d-99b7-f2734a37d307",
    name: "Maya Collins",
    slug: "maya-collins",
    bio: "Former data journalist covering NBA and EPL performance trends.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  }
];

export const categories: Category[] = [
  {
    id: "5f1b0cea-549d-4de4-a8dd-eb8f3ce24a53",
    name: "Sports",
    slug: "sports",
    description: "Editorial and game coverage"
  },
  {
    id: "d98f6ea4-6256-4de1-b194-0fe96ca4a6e4",
    name: "Analytics",
    slug: "analytics",
    description: "Modeling, projections, and trend analysis"
  },
  {
    id: "5e50e3c8-bdc8-4f8c-9288-9ca3d6ac1d7e",
    name: "Betting",
    slug: "betting",
    description: "Odds, value spots, and market movement"
  }
];

export const tags: Tag[] = [
  { id: "847c78b4-f3a3-4461-ac4d-33baa06cfb70", name: "NBA", slug: "nba" },
  { id: "6ec7b87d-f6e1-4f74-b6f0-0174d08bc4f2", name: "EPL", slug: "epl" },
  { id: "969700f3-0e95-43ea-abf0-aa490e8b10cf", name: "Player Props", slug: "player-props" },
  { id: "cd799887-4f71-4382-bb94-c813de66f87e", name: "Projections", slug: "projections" },
  { id: "9ce2087d-f89f-4dab-93f3-cf46e9ed26f5", name: "Rankings", slug: "rankings" }
];

export const statsTables: StatsTable[] = [
  {
    id: "0afddc86-4254-4ecc-b56b-e7adf8d52ad2",
    slug: "nba-top-scorers-projection-week-12",
    title: "NBA Top Scorer Projections - Week 12",
    description: "Model blend of usage, pace, and opponent defensive profile.",
    columns: [
      { key: "player", label: "Player", type: "text" },
      { key: "team", label: "Team", type: "text" },
      { key: "proj_points", label: "Proj. PTS", type: "number" },
      { key: "line", label: "Book Line", type: "number" },
      { key: "edge", label: "Edge %", type: "percent" }
    ],
    rows: [
      {
        id: "6db19790-a93f-4f3d-998e-50b8126ef580",
        values: { player: "Luka Doncic", team: "DAL", proj_points: 33.2, line: 30.5, edge: 8.9 },
        highlighted: true
      },
      {
        id: "e03bc644-3f86-44f2-88db-49ee6f7667f3",
        values: { player: "Shai Gilgeous-Alexander", team: "OKC", proj_points: 31.6, line: 30.5, edge: 3.6 }
      },
      {
        id: "279740c0-f70f-4a17-bf05-1f8c5f10490e",
        values: { player: "Jayson Tatum", team: "BOS", proj_points: 28.8, line: 29.5, edge: -2.4 }
      },
      {
        id: "25b8c4b1-4d2c-43c1-b9e3-94d2891244e4",
        values: { player: "Anthony Edwards", team: "MIN", proj_points: 27.3, line: 25.5, edge: 7.1 },
        highlighted: true
      }
    ],
    stylingRules: {
      positiveKey: "edge",
      negativeKey: "edge",
      highlightThreshold: 5
    }
  }
];

export const posts: Post[] = [
  {
    id: "3b19be4e-c0a4-47bf-8641-f40e2833f9da",
    title: "4 Player Props the Model Loves Tonight",
    subtitle: "Where projection edge and market mispricing overlap.",
    slug: "player-props-model-loves-tonight",
    excerpt: "A breakdown of the top value props from our projection model, with edge calculations and confidence tiers.",
    featuredImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
    authorId: "1b8e6eb6-9104-4d72-bf0f-cfd94ff6b287",
    categoryId: "5e50e3c8-bdc8-4f8c-9288-9ca3d6ac1d7e",
    tagIds: ["847c78b4-f3a3-4461-ac4d-33baa06cfb70", "969700f3-0e95-43ea-abf0-aa490e8b10cf", "cd799887-4f71-4382-bb94-c813de66f87e"],
    publishedAt: "2026-03-14T09:00:00.000Z",
    updatedAt: "2026-03-16T12:20:00.000Z",
    seo: {
      title: "4 NBA Player Props the Model Loves Tonight",
      description: "Projection-driven NBA props with edge percentages, confidence notes, and ranking table.",
      ogImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80",
      twitterCard: "summary_large_image"
    },
    contentBlocks: [
      { type: "paragraph", text: "Tonight's slate is packed with volatile pricing. We focus on spots where projected volume and matchup pace are aligned." },
      { type: "heading", level: 2, text: "Top Model Edges" },
      { type: "callout", tone: "info", text: "Edges above 5% are tagged as premium opportunities when injury news remains stable." },
      { type: "statsTable", tableSlug: "nba-top-scorers-projection-week-12" },
      { type: "heading", level: 2, text: "How to Use This Board" },
      { type: "paragraph", text: "Sort by edge percentage and filter by team to isolate spots that fit your risk profile." },
      { type: "code", language: "text", code: "Implied Edge = (Projection - Line) / Line * 100" }
    ],
    trendingScore: 98,
    views: 4200
  },
  {
    id: "4f948280-e14c-47fd-ab14-3465af5e27df",
    title: "EPL Form Table vs Market Odds",
    subtitle: "Why underlying metrics disagree with this week’s pricing.",
    slug: "epl-form-table-vs-market-odds",
    excerpt: "Expected goals trendlines reveal value where recent form is overstated by public sentiment.",
    featuredImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    authorId: "378fcf03-7ca6-4f8d-99b7-f2734a37d307",
    categoryId: "d98f6ea4-6256-4de1-b194-0fe96ca4a6e4",
    tagIds: ["6ec7b87d-f6e1-4f74-b6f0-0174d08bc4f2", "cd799887-4f71-4382-bb94-c813de66f87e", "9ce2087d-f89f-4dab-93f3-cf46e9ed26f5"],
    publishedAt: "2026-03-12T11:00:00.000Z",
    updatedAt: "2026-03-12T11:00:00.000Z",
    seo: {
      title: "EPL Form Table vs Betting Market Odds",
      description: "Analyze xG trends and market prices to find where the odds lag behind performance.",
      ogImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
      twitterCard: "summary_large_image"
    },
    contentBlocks: [
      { type: "paragraph", text: "Short-term win streaks can mask sustainable performance. xG differential remains a stronger guide." },
      { type: "heading", level: 2, text: "Market Drift" },
      { type: "paragraph", text: "Teams with inflated public support often carry an extra 2-4% margin in key weekend fixtures." }
    ],
    trendingScore: 84,
    views: 2750
  },
  {
    id: "2f72d695-3c2b-4df2-a5db-d12b7ab765f7",
    title: "Weekly Power Rankings: Data + Film Notes",
    subtitle: "Our blended methodology for ranking contenders.",
    slug: "weekly-power-rankings-data-film-notes",
    excerpt: "Combining adjusted net rating, injury impact, and tactical matchups for a truer pecking order.",
    featuredImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
    authorId: "1b8e6eb6-9104-4d72-bf0f-cfd94ff6b287",
    categoryId: "5f1b0cea-549d-4de4-a8dd-eb8f3ce24a53",
    tagIds: ["847c78b4-f3a3-4461-ac4d-33baa06cfb70", "9ce2087d-f89f-4dab-93f3-cf46e9ed26f5"],
    publishedAt: "2026-03-10T15:30:00.000Z",
    updatedAt: "2026-03-15T08:40:00.000Z",
    seo: {
      title: "Weekly Power Rankings with Data and Film",
      description: "A hybrid power ranking framework combining model outputs and qualitative tactical notes.",
      ogImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
      twitterCard: "summary_large_image"
    },
    contentBlocks: [
      { type: "paragraph", text: "Raw net rating can overstate teams that have faced weak benches. We weight schedule context and lineup continuity." },
      { type: "heading", level: 2, text: "Methodology" },
      { type: "paragraph", text: "70% model output + 30% film and injury context keeps rankings stable while responsive to tactical shifts." }
    ],
    trendingScore: 76,
    views: 1930
  }
];
