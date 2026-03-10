import ProfiClubHubLayout from "@/components/proficlub/ProfiClubHubLayout";
import {
  PROFI_CLUBS,
  UNION_ARTICLES,
  UNION_MATCHES,
  UNION_STANDINGS,
} from "@/lib/mock/proficlubs";

export default function UnionPage() {
  const club = PROFI_CLUBS.find((c) => c.id === "union")!;

  return (
    <ProfiClubHubLayout
      club={club}
      articles={UNION_ARTICLES}
      matches={UNION_MATCHES}
      standings={UNION_STANDINGS}
    />
  );
}
