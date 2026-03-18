INSERT INTO authors (id, name, slug, bio, avatar_url)
VALUES
  ('1b8e6eb6-9104-4d72-bf0f-cfd94ff6b287', 'Nick Brennan', 'nick-brennan', 'Sports analytics writer focused on betting edges and model transparency.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'),
  ('378fcf03-7ca6-4f8d-99b7-f2734a37d307', 'Maya Collins', 'maya-collins', 'Former data journalist covering NBA and EPL performance trends.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO categories (id, name, slug, description)
VALUES
  ('5f1b0cea-549d-4de4-a8dd-eb8f3ce24a53', 'Sports', 'sports', 'Editorial and game coverage'),
  ('d98f6ea4-6256-4de1-b194-0fe96ca4a6e4', 'Analytics', 'analytics', 'Modeling, projections, and trend analysis'),
  ('5e50e3c8-bdc8-4f8c-9288-9ca3d6ac1d7e', 'Betting', 'betting', 'Odds, value spots, and market movement')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tags (id, name, slug)
VALUES
  ('847c78b4-f3a3-4461-ac4d-33baa06cfb70', 'NBA', 'nba'),
  ('6ec7b87d-f6e1-4f74-b6f0-0174d08bc4f2', 'EPL', 'epl'),
  ('969700f3-0e95-43ea-abf0-aa490e8b10cf', 'Player Props', 'player-props'),
  ('cd799887-4f71-4382-bb94-c813de66f87e', 'Projections', 'projections'),
  ('9ce2087d-f89f-4dab-93f3-cf46e9ed26f5', 'Rankings', 'rankings')
ON CONFLICT (id) DO NOTHING;
