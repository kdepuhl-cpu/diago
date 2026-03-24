-- ============================================
-- 011: League Data Pipeline
-- Tabellen, Ergebnisse, Spielpläne von fussball.de
-- ============================================

-- Mapping: Unsere Ligen → fussball.de IDs
CREATE TABLE league_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id TEXT NOT NULL,                    -- unser league ID (z.B. "berlin-liga")
  league_name TEXT NOT NULL,                  -- Anzeigename
  fussball_de_team_id TEXT NOT NULL,          -- Team-ID von fussball.de (beliebiges Team der Liga)
  source TEXT DEFAULT 'api-fussball',         -- API-Quelle
  priority TEXT DEFAULT 'standard',           -- 'intensiv' oder 'standard'
  season TEXT DEFAULT '2526',                 -- Saison
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(league_id, season)
);

-- Aktuelle Tabellen
CREATE TABLE standings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id TEXT NOT NULL,
  season TEXT NOT NULL DEFAULT '2526',
  matchday INT,
  position INT NOT NULL,
  team_name TEXT NOT NULL,
  team_id TEXT,                               -- fussball.de Team-ID
  played INT DEFAULT 0,
  wins INT DEFAULT 0,
  draws INT DEFAULT 0,
  losses INT DEFAULT 0,
  goals_for INT DEFAULT 0,
  goals_against INT DEFAULT 0,
  goal_diff INT GENERATED ALWAYS AS (goals_for - goals_against) STORED,
  points INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(league_id, season, team_name)
);

-- Spiele: Ergebnisse + Fixtures
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id TEXT NOT NULL,
  season TEXT NOT NULL DEFAULT '2526',
  matchday INT,
  match_date TIMESTAMPTZ,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INT,
  away_score INT,
  status TEXT DEFAULT 'scheduled',            -- scheduled, live, finished, cancelled
  fussball_de_url TEXT,                       -- Link zum Spiel auf fussball.de
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(league_id, season, home_team, away_team, match_date)
);

-- Sync-Log
CREATE TABLE sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id TEXT,
  sync_type TEXT NOT NULL,                    -- 'standings', 'next_games', 'prev_games', 'all'
  status TEXT NOT NULL,                       -- 'success', 'error'
  records_count INT DEFAULT 0,
  duration_ms INT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX idx_standings_league ON standings(league_id, season);
CREATE INDEX idx_matches_league ON matches(league_id, season);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_sync_log_created ON sync_log(created_at DESC);

-- RLS
ALTER TABLE league_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_log ENABLE ROW LEVEL SECURITY;

-- Alle dürfen lesen
CREATE POLICY "Public read league_sources" ON league_sources FOR SELECT USING (true);
CREATE POLICY "Public read standings" ON standings FOR SELECT USING (true);
CREATE POLICY "Public read matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public read sync_log" ON sync_log FOR SELECT USING (true);

-- Nur Service-Role darf schreiben (Sync-Script nutzt Service Key)
CREATE POLICY "Service write league_sources" ON league_sources FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write standings" ON standings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write matches" ON matches FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service write sync_log" ON sync_log FOR ALL USING (auth.role() = 'service_role');
