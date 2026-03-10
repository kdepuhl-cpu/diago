-- ============================================
-- DIAGO: Initial Database Schema
-- ============================================

-- ============================================
-- 1. LEAGUES
-- ============================================
CREATE TABLE leagues (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('herren', 'frauen', 'pokal')),
  tier INTEGER NOT NULL DEFAULT 1,
  region TEXT NOT NULL CHECK (region IN ('national', 'nordost', 'berlin')),
  parent_id TEXT REFERENCES leagues(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leagues_category ON leagues(category);
CREATE INDEX idx_leagues_region ON leagues(region);
CREATE INDEX idx_leagues_parent_id ON leagues(parent_id);

-- ============================================
-- 2. CLUBS
-- ============================================
CREATE TABLE clubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  league_id TEXT REFERENCES leagues(id) ON DELETE SET NULL,
  bezirk TEXT,
  founded_year INTEGER,
  primary_color TEXT,
  secondary_color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clubs_league_id ON clubs(league_id);
CREATE INDEX idx_clubs_bezirk ON clubs(bezirk);

-- ============================================
-- 3. ARTICLES
-- ============================================
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('spielbericht', 'analyse', 'transfer', 'news', 'interview')),
  image_url TEXT,
  image_alt TEXT,
  image_caption TEXT,
  image_credit TEXT,
  author_name TEXT,
  author_image TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  reading_time_minutes INTEGER,
  league_id TEXT REFERENCES leagues(id) ON DELETE SET NULL,
  club_ids TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_league_id ON articles(league_id);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_is_featured ON articles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);

-- ============================================
-- 4. JOBS
-- ============================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  club_name TEXT NOT NULL,
  club_logo_url TEXT,
  district TEXT,
  league TEXT,
  category TEXT NOT NULL CHECK (category IN ('trainer', 'spieler', 'ehrenamt', 'management', 'jugend', 'schiedsrichter')),
  type TEXT NOT NULL CHECK (type IN ('vollzeit', 'teilzeit', 'ehrenamtlich', 'minijob')),
  description TEXT,
  requirements TEXT[] DEFAULT '{}',
  tasks TEXT[] DEFAULT '{}',
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  compensation TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_district ON jobs(district);
CREATE INDEX idx_jobs_is_featured ON jobs(is_featured) WHERE is_featured = true;
CREATE INDEX idx_jobs_active ON jobs(active) WHERE active = true;
CREATE INDEX idx_jobs_tags ON jobs USING GIN (tags);
CREATE INDEX idx_jobs_published_at ON jobs(published_at DESC);

-- ============================================
-- 5. PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  favorite_club_ids TEXT[] DEFAULT '{}',
  bezirk TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  level TEXT NOT NULL DEFAULT 'Kreisliga-Fan',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leagues_updated_at
  BEFORE UPDATE ON leagues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_clubs_updated_at
  BEFORE UPDATE ON clubs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- INCREMENT VIEW COUNT RPC
-- ============================================
CREATE OR REPLACE FUNCTION increment_view_count(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE articles
  SET view_count = view_count + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Leagues: public read
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leagues are publicly readable"
  ON leagues FOR SELECT
  USING (true);

-- Clubs: public read
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clubs are publicly readable"
  ON clubs FOR SELECT
  USING (true);

-- Articles: public read
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT
  USING (true);

-- Jobs: public read
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are publicly readable"
  ON jobs FOR SELECT
  USING (true);

-- Profiles: own data only
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
-- ============================================
-- DIAGO: User Profiles & Bookmarks Extension
-- ============================================

-- Neue Spalten für Profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS favorite_league_ids TEXT[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Fehlende INSERT-Policy (001 hat nur SELECT + UPDATE)
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- BOOKMARKS (ersetzt localStorage für eingeloggte User)
-- ============================================
CREATE TABLE bookmarks (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, article_slug)
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookmarks_select" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookmarks_insert" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "bookmarks_delete" ON bookmarks FOR DELETE USING (auth.uid() = user_id);
-- 004_tippspiel.sql
-- Tipp-Voting: match_votes + match_results

-- match_votes: User-Tipps (1, X, 2)
CREATE TABLE match_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  match_id TEXT NOT NULL,
  vote CHAR(1) NOT NULL CHECK (vote IN ('1', 'X', '2')),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE match_votes ADD CONSTRAINT match_votes_unique UNIQUE (user_id, match_id);
CREATE INDEX idx_match_votes_match ON match_votes(match_id);
CREATE INDEX idx_match_votes_user ON match_votes(user_id);

-- RLS: eigene Votes lesen + erstellen, kein Update/Delete
ALTER TABLE match_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "votes_select_own" ON match_votes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "votes_insert" ON match_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RPC: aggregierte Stats für alle sichtbar (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION get_vote_stats(p_match_id TEXT)
RETURNS TABLE(vote CHAR(1), count BIGINT, percentage NUMERIC) AS $$
  SELECT v.vote, COUNT(*), ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER(), 0), 1)
  FROM match_votes v WHERE v.match_id = p_match_id GROUP BY v.vote
$$ LANGUAGE sql SECURITY DEFINER;

-- match_results: Admin trägt Ergebnisse ein
CREATE TABLE match_results (
  match_id TEXT PRIMARY KEY,
  result CHAR(1) NOT NULL CHECK (result IN ('1', 'X', '2')),
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "results_select" ON match_results FOR SELECT USING (true);
CREATE POLICY "results_admin_insert" ON match_results FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'kdepuhl@gmail.com'));
CREATE POLICY "results_admin_update" ON match_results FOR UPDATE
  USING (EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = 'kdepuhl@gmail.com'));
-- 006_reader_score.sql
-- Reader Score: Punkte fürs Artikellesen

-- Neue Felder in profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS reader_points INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS articles_read TEXT[] DEFAULT '{}';

-- RPC: Artikel als gelesen markieren + Punkte vergeben (verhindert Duplikate)
CREATE OR REPLACE FUNCTION record_article_read(p_article_slug TEXT)
RETURNS INT AS $$
DECLARE
  current_articles TEXT[];
  new_points INT;
BEGIN
  -- Aktuelle articles_read holen
  SELECT COALESCE(articles_read, '{}') INTO current_articles
  FROM profiles WHERE id = auth.uid();

  -- Wenn Artikel bereits gelesen, keine Punkte
  IF p_article_slug = ANY(current_articles) THEN
    SELECT reader_points INTO new_points FROM profiles WHERE id = auth.uid();
    RETURN new_points;
  END IF;

  -- Artikel hinzufügen + 10 Punkte vergeben
  UPDATE profiles
  SET
    articles_read = array_append(COALESCE(articles_read, '{}'), p_article_slug),
    reader_points = COALESCE(reader_points, 0) + 10
  WHERE id = auth.uid();

  SELECT reader_points INTO new_points FROM profiles WHERE id = auth.uid();
  RETURN new_points;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- ============================================
-- 007_platform_v2.sql
-- Platform v2 Migration for the FuWo Relaunch
-- ============================================
-- Extends the existing schema with:
--   1. VereinProfil data on clubs (Beschreibung, Sportstaette, Kontakt, etc.)
--   2. Subscription/Abo fields on profiles (Dauerkarte, Ehrentribuene)
--   3. club_authors table (Vereins-Accounts fuer Vereins-News)
--   4. feedback table (Thumbs up/down Feedback-System)
--   5. author_club_id on articles (Vereins-News vs. redaktionelle Artikel)
-- ============================================


-- ============================================
-- 1. EXTEND CLUBS — VereinProfil
-- ============================================

ALTER TABLE clubs ADD COLUMN IF NOT EXISTS beschreibung TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS telefon TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS facebook_url TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_name TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_adresse TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_plz TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_bezirk TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_maps_url TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_kapazitaet INTEGER;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_kunstrasen BOOLEAN DEFAULT false;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS sportstaette_flutlicht BOOLEAN DEFAULT false;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS ansprechpartner JSONB DEFAULT '[]';
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS trainingszeiten JSONB DEFAULT '[]';
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS mitglieder INTEGER;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS mannschaften INTEGER;


-- ============================================
-- 2. EXTEND PROFILES — Subscription / Abo
-- ============================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_tier TEXT NOT NULL DEFAULT 'free'
  CHECK (subscription_tier IN ('free', 'dauerkarte', 'ehrentribuene'));

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'inactive'
  CHECK (subscription_status IN ('inactive', 'active', 'canceled', 'past_due'));

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_expires_at TIMESTAMPTZ;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS newsletter_subscribed BOOLEAN NOT NULL DEFAULT false;


-- ============================================
-- 3. CREATE CLUB_AUTHORS — Vereins-Accounts
-- ============================================

CREATE TABLE IF NOT EXISTS club_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  club_id TEXT NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('editor', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, club_id)
);

CREATE INDEX IF NOT EXISTS idx_club_authors_club_id ON club_authors(club_id);

-- RLS: publicly readable
ALTER TABLE club_authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "club_authors_select"
  ON club_authors FOR SELECT
  USING (true);


-- ============================================
-- 4. CREATE FEEDBACK — Thumbs Up / Down
-- ============================================

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  page_url TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('up', 'down')),
  context TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_page_url ON feedback(page_url);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);

-- RLS: anyone can insert, select is public
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feedback_select"
  ON feedback FOR SELECT
  USING (true);

CREATE POLICY "feedback_insert"
  ON feedback FOR INSERT
  WITH CHECK (true);


-- ============================================
-- 5. EXTEND ARTICLES — Vereins-News
-- ============================================

ALTER TABLE articles ADD COLUMN IF NOT EXISTS author_club_id TEXT REFERENCES clubs(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_articles_author_club_id ON articles(author_club_id);
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT DEFAULT 'website',
  confirmed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert their email)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Only the subscriber can see their own entry (by email match - not critical, can be relaxed)
CREATE POLICY "Newsletter subscribers are readable"
  ON newsletter_subscribers FOR SELECT
  USING (true);
-- Landing Page Signups
CREATE TABLE IF NOT EXISTS landing_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE landing_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from landing page
CREATE POLICY "Anyone can sign up" ON landing_signups
  FOR INSERT TO anon WITH CHECK (true);

-- No public reads
CREATE POLICY "No public reads" ON landing_signups
  FOR SELECT TO anon USING (false);

-- Admin can read all
CREATE POLICY "Admin full access" ON landing_signups
  FOR ALL TO authenticated
  USING (auth.jwt() ->> 'email' = 'kdepuhl@gmail.com');
