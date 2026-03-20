import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export interface CrowdfundingStats {
  funding_current: number;
  funding_goal: number;
  supporter_count: number;
  campaign_url: string;
  campaign_live: boolean;
}

export interface CrowdfundingSupporter {
  id: string;
  name: string;
  tier: string;
  amount: number;
  is_gruendungself: boolean;
  logo_url: string | null;
  description: string | null;
  website: string | null;
  created_at: string;
}

const DEFAULT_STATS: CrowdfundingStats = {
  funding_current: 0,
  funding_goal: 250000,
  supporter_count: 0,
  campaign_url: "https://www.startnext.com/fussballwoche",
  campaign_live: false,
};

export async function getCrowdfundingStats(): Promise<CrowdfundingStats> {
  if (!isSupabaseConfigured()) return DEFAULT_STATS;

  const { data, error } = await supabase
    .from("crowdfunding_stats")
    .select("funding_current, funding_goal, supporter_count, campaign_url, campaign_live")
    .limit(1)
    .single();

  if (error || !data) return DEFAULT_STATS;
  return data as CrowdfundingStats;
}

export async function getSupporterWall(): Promise<CrowdfundingSupporter[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("crowdfunding_supporters")
    .select("id, name, tier, amount, is_gruendungself, logo_url, description, website, created_at")
    .eq("show_on_wall", true)
    .order("amount", { ascending: false });

  if (error || !data) return [];
  return data as CrowdfundingSupporter[];
}

export async function getGruendungself(): Promise<CrowdfundingSupporter[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("crowdfunding_supporters")
    .select("id, name, tier, amount, is_gruendungself, logo_url, description, website, created_at")
    .eq("is_gruendungself", true)
    .eq("show_on_wall", true)
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data as CrowdfundingSupporter[];
}

// Admin: Stats aktualisieren
export async function updateCrowdfundingStats(
  stats: Partial<Pick<CrowdfundingStats, "funding_current" | "supporter_count" | "campaign_live">>
) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("crowdfunding_stats")
    .update({ ...stats, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Admin: Supporter hinzufuegen
export async function addSupporter(supporter: {
  name: string;
  tier: string;
  amount: number;
  show_on_wall?: boolean;
  logo_url?: string;
  description?: string;
  website?: string;
}) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("crowdfunding_supporters")
    .insert(supporter)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Admin: Supporter loeschen
export async function removeSupporter(id: string) {
  if (!isSupabaseConfigured()) return;

  const { error } = await supabase
    .from("crowdfunding_supporters")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
