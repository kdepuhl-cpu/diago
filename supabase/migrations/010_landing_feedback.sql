-- Feature-Votes: ein Vote pro Feature pro Session
CREATE TABLE IF NOT EXISTS landing_feature_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feature TEXT NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feature, session_id)
);

ALTER TABLE landing_feature_votes ENABLE ROW LEVEL SECURITY;

-- Jeder darf voten (anonym)
CREATE POLICY "Anyone can vote" ON landing_feature_votes
  FOR INSERT TO anon WITH CHECK (true);

-- Jeder darf Vote-Counts lesen (fuer Anzeige)
CREATE POLICY "Anyone can read vote counts" ON landing_feature_votes
  FOR SELECT TO anon USING (true);

-- Admin kann alles
CREATE POLICY "Admin full access" ON landing_feature_votes
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'kdepuhl@gmail.com');

-- Freitext-Feedback
CREATE TABLE IF NOT EXISTS landing_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE landing_messages ENABLE ROW LEVEL SECURITY;

-- Jeder darf Feedback schicken
CREATE POLICY "Anyone can send feedback" ON landing_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Kein oeffentliches Lesen
CREATE POLICY "No public reads" ON landing_messages
  FOR SELECT TO anon USING (false);

-- Admin kann alles lesen
CREATE POLICY "Admin full access" ON landing_messages
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'kdepuhl@gmail.com');

-- RPC: Vote-Counts pro Feature aggregiert zurueckgeben
CREATE OR REPLACE FUNCTION get_feature_vote_counts()
RETURNS TABLE(feature TEXT, count BIGINT)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT feature, COUNT(*) as count
  FROM landing_feature_votes
  GROUP BY feature
  ORDER BY count DESC;
$$;
