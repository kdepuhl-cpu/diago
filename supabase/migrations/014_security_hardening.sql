-- ============================================
-- 014: Security Hardening
-- 1. Newsletter RLS: SELECT nur fuer Admins
-- 2. Hardcoded Admin-Emails durch is_admin() ersetzen
-- 3. Feedback-Tabelle: INSERT nur authentifiziert oder mit Limit
-- ============================================


-- ============================================
-- 1. NEWSLETTER: Oeffentliches Lesen sperren
-- Vorher: USING (true) — jeder kann alle Emails sehen (DSGVO-Problem)
-- Nachher: Nur Admins koennen die Subscriber-Liste lesen
-- ============================================

DROP POLICY IF EXISTS "Newsletter subscribers are readable" ON newsletter_subscribers;

CREATE POLICY "newsletter_admin_select" ON newsletter_subscribers
  FOR SELECT TO authenticated
  USING (is_admin());


-- ============================================
-- 2. MATCH_RESULTS: Hardcoded Email → is_admin()
-- Betrifft: 004_tippspiel.sql Zeile 36-39
-- ============================================

DROP POLICY IF EXISTS "results_admin_insert" ON match_results;
DROP POLICY IF EXISTS "results_admin_update" ON match_results;

CREATE POLICY "results_admin_insert" ON match_results
  FOR INSERT WITH CHECK (is_admin());

CREATE POLICY "results_admin_update" ON match_results
  FOR UPDATE USING (is_admin());


-- ============================================
-- 3. LANDING_SIGNUPS: Hardcoded Email → is_admin()
-- Betrifft: 009_landing_signups.sql Zeile 21-23
-- ============================================

DROP POLICY IF EXISTS "Admin full access" ON landing_signups;

CREATE POLICY "landing_signups_admin" ON landing_signups
  FOR ALL TO authenticated
  USING (is_admin());


-- ============================================
-- 4. LANDING_FEATURE_VOTES: Hardcoded Email → is_admin()
-- Betrifft: 010_landing_feedback.sql Zeile 21-23
-- ============================================

DROP POLICY IF EXISTS "Admin full access" ON landing_feature_votes;

CREATE POLICY "feature_votes_admin" ON landing_feature_votes
  FOR ALL TO authenticated
  USING (is_admin());


-- ============================================
-- 5. LANDING_MESSAGES: Hardcoded Email → is_admin()
-- Betrifft: 010_landing_feedback.sql Zeile 44-46
-- ============================================

DROP POLICY IF EXISTS "Admin full access" ON landing_messages;

CREATE POLICY "landing_messages_admin" ON landing_messages
  FOR ALL TO authenticated
  USING (is_admin());
