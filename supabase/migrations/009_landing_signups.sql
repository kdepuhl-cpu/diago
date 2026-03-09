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
