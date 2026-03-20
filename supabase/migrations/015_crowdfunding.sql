-- ============================================
-- 015: Crowdfunding — Stats + Supporters
-- ============================================

-- Kampagnen-Stand (1 Zeile, wird manuell aktualisiert)
CREATE TABLE crowdfunding_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funding_current INT NOT NULL DEFAULT 0,
  funding_goal INT NOT NULL DEFAULT 250000,
  supporter_count INT NOT NULL DEFAULT 0,
  campaign_url TEXT DEFAULT 'https://www.startnext.com/fussballwoche',
  campaign_live BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Initial-Zeile
INSERT INTO crowdfunding_stats (funding_current, funding_goal, supporter_count)
VALUES (0, 250000, 0);

-- Einzelne Supporter (fuer Wall + Gruendungself)
CREATE TABLE crowdfunding_supporters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN (
    'kreisliga', 'bezirksliga', 'berlin-liga', 'oberliga',
    'regionalliga', 'bundesliga', 'ehrentribuene',
    'gruendungself', 'gruendungspartner'
  )),
  amount INT NOT NULL DEFAULT 0,
  show_on_wall BOOLEAN DEFAULT true,
  is_gruendungself BOOLEAN GENERATED ALWAYS AS (tier IN ('gruendungself', 'gruendungspartner')) STORED,
  -- Gruendungself Profildaten
  logo_url TEXT,
  description TEXT,
  website TEXT,
  -- Meta
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_supporters_tier ON crowdfunding_supporters(tier);
CREATE INDEX idx_supporters_wall ON crowdfunding_supporters(show_on_wall);
CREATE INDEX idx_supporters_gruendungself ON crowdfunding_supporters(is_gruendungself);

-- RLS
ALTER TABLE crowdfunding_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE crowdfunding_supporters ENABLE ROW LEVEL SECURITY;

-- Jeder darf Stats + Wall lesen
CREATE POLICY "Public read stats" ON crowdfunding_stats
  FOR SELECT USING (true);

CREATE POLICY "Public read supporters" ON crowdfunding_supporters
  FOR SELECT USING (show_on_wall = true);

-- Nur Admin darf schreiben
CREATE POLICY "Admin write stats" ON crowdfunding_stats
  FOR ALL TO authenticated USING (is_admin());

CREATE POLICY "Admin write supporters" ON crowdfunding_supporters
  FOR ALL TO authenticated USING (is_admin());
