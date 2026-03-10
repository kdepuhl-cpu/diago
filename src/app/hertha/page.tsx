import ProfiClubHubLayout from "@/components/proficlub/ProfiClubHubLayout";
import {
  PROFI_CLUBS,
  HERTHA_ARTICLES,
  HERTHA_MATCHES,
  HERTHA_STANDINGS,
} from "@/lib/mock/proficlubs";

export default function HerthaPage() {
  const club = PROFI_CLUBS.find((c) => c.id === "hertha")!;

  return (
    <ProfiClubHubLayout
      club={club}
      articles={HERTHA_ARTICLES}
      matches={HERTHA_MATCHES}
      standings={HERTHA_STANDINGS}
    />
  );
}
