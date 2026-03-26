/**
 * Adds missing columns to clubs table (migration 013) via Supabase RPC
 * Run: node scripts/setup-clubs-schema.mjs
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test if columns exist by trying a select
const { data, error } = await supabase
  .from("clubs")
  .select("id, description")
  .limit(1);

if (error && error.message.includes("description")) {
  console.log("Columns missing — need to run migration 013 via SQL Editor.");
  console.log("\nRun this SQL in Supabase Dashboard > SQL Editor:\n");
  console.log(`ALTER TABLE clubs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS members INT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS teams_count INT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS profile JSONB DEFAULT '{}';
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS founded_year INT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS bezirk TEXT;
ALTER TABLE clubs ADD COLUMN IF NOT EXISTS secondary_color TEXT;`);
} else {
  console.log("Columns already exist — schema is ready.");
}
