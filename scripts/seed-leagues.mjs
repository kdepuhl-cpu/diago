/**
 * Seed leagues into Supabase
 * Run: node scripts/seed-leagues.mjs
 */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const parentLeagues = [
  { id: "bundesliga", name: "Bundesliga", short_name: "BL", slug: "bundesliga", category: "herren", tier: 1, region: "national" },
  { id: "2-bundesliga", name: "2. Bundesliga", short_name: "2. BL", slug: "2-bundesliga", category: "herren", tier: 2, region: "national" },
  { id: "3-liga", name: "3. Liga", short_name: "3. Liga", slug: "3-liga", category: "herren", tier: 3, region: "national" },
  { id: "regionalliga-nordost", name: "Regionalliga Nordost", short_name: "RL NO", slug: "regionalliga-nordost", category: "herren", tier: 4, region: "nordost" },
  { id: "oberliga-nofv-nord", name: "Oberliga NOFV Nord", short_name: "OL Nord", slug: "oberliga-nofv-nord", category: "herren", tier: 5, region: "nordost" },
  { id: "oberliga-nofv-sued", name: "Oberliga NOFV Süd", short_name: "OL Süd", slug: "oberliga-nofv-sued", category: "herren", tier: 5, region: "nordost" },
  { id: "berlin-liga", name: "Berlin-Liga", short_name: "BL", slug: "berlin-liga", category: "herren", tier: 6, region: "berlin" },
  { id: "landesliga", name: "Landesliga Berlin", short_name: "LL", slug: "landesliga", category: "herren", tier: 7, region: "berlin" },
  { id: "bezirksliga", name: "Bezirksliga Berlin", short_name: "BZL", slug: "bezirksliga", category: "herren", tier: 8, region: "berlin" },
  { id: "kreisliga-a", name: "Kreisliga A Berlin", short_name: "KL A", slug: "kreisliga-a", category: "herren", tier: 9, region: "berlin" },
  { id: "kreisliga-b", name: "Kreisliga B Berlin", short_name: "KL B", slug: "kreisliga-b", category: "herren", tier: 10, region: "berlin" },
  { id: "kreisliga-c", name: "Kreisliga C Berlin", short_name: "KL C", slug: "kreisliga-c", category: "herren", tier: 11, region: "berlin" },
  { id: "frauen-bundesliga", name: "Frauen-Bundesliga", short_name: "F-BL", slug: "frauen-bundesliga", category: "frauen", tier: 1, region: "national" },
  { id: "2-frauen-bundesliga", name: "2. Frauen-Bundesliga", short_name: "2. F-BL", slug: "2-frauen-bundesliga", category: "frauen", tier: 2, region: "national" },
  { id: "frauen-regionalliga-nordost", name: "Frauen-Regionalliga Nordost", short_name: "F-RL NO", slug: "frauen-regionalliga-nordost", category: "frauen", tier: 3, region: "nordost" },
  { id: "frauen-berlin-liga", name: "Frauen Berlin-Liga", short_name: "F-BL", slug: "frauen-berlin-liga", category: "frauen", tier: 4, region: "berlin" },
  { id: "frauen-landesliga", name: "Frauen-Landesliga Berlin", short_name: "F-LL", slug: "frauen-landesliga", category: "frauen", tier: 5, region: "berlin" },
  { id: "frauen-bezirksliga", name: "Frauen-Bezirksliga Berlin", short_name: "F-BZL", slug: "frauen-bezirksliga", category: "frauen", tier: 6, region: "berlin" },
  { id: "dfb-pokal", name: "DFB-Pokal", short_name: "DFB", slug: "dfb-pokal", category: "pokal", tier: 1, region: "national" },
  { id: "dfb-pokal-frauen", name: "DFB-Pokal Frauen", short_name: "DFB-F", slug: "dfb-pokal-frauen", category: "pokal", tier: 1, region: "national" },
  { id: "berliner-pokal", name: "Berliner Pilsner-Pokal", short_name: "BP", slug: "berliner-pokal", category: "pokal", tier: 2, region: "berlin" },
  { id: "polytan-pokal", name: "Polytan-Pokal", short_name: "PP", slug: "polytan-pokal", category: "pokal", tier: 3, region: "berlin" },
];

const childLeagues = [
  { id: "landesliga-1", name: "Staffel 1", short_name: "LL 1", slug: "landesliga-staffel-1", category: "herren", tier: 7, region: "berlin", parent_id: "landesliga" },
  { id: "landesliga-2", name: "Staffel 2", short_name: "LL 2", slug: "landesliga-staffel-2", category: "herren", tier: 7, region: "berlin", parent_id: "landesliga" },
  { id: "bezirksliga-1", name: "Staffel 1", short_name: "BZL 1", slug: "bezirksliga-staffel-1", category: "herren", tier: 8, region: "berlin", parent_id: "bezirksliga" },
  { id: "bezirksliga-2", name: "Staffel 2", short_name: "BZL 2", slug: "bezirksliga-staffel-2", category: "herren", tier: 8, region: "berlin", parent_id: "bezirksliga" },
  { id: "bezirksliga-3", name: "Staffel 3", short_name: "BZL 3", slug: "bezirksliga-staffel-3", category: "herren", tier: 8, region: "berlin", parent_id: "bezirksliga" },
  { id: "bezirksliga-4", name: "Staffel 4", short_name: "BZL 4", slug: "bezirksliga-staffel-4", category: "herren", tier: 8, region: "berlin", parent_id: "bezirksliga" },
];

console.log("Seeding parent leagues...");
const { error: e1 } = await supabase.from("leagues").upsert(parentLeagues, { onConflict: "id" });
if (e1) { console.error("Parent leagues:", e1.message); process.exit(1); }
console.log(`  ${parentLeagues.length} parent leagues OK`);

console.log("Seeding child leagues...");
const { error: e2 } = await supabase.from("leagues").upsert(childLeagues, { onConflict: "id" });
if (e2) { console.error("Child leagues:", e2.message); process.exit(1); }
console.log(`  ${childLeagues.length} child leagues OK`);

console.log("Done!");
