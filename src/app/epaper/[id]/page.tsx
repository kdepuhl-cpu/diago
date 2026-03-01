import { getAllIssueIds, getEPaperIssueById } from "@/lib/mock/epaper";
import { notFound } from "next/navigation";
import EPaperReaderPage from "@/components/epaper/EPaperReaderPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EPaperDetailPage({ params }: PageProps) {
  const { id } = await params;
  const issue = getEPaperIssueById(id);

  if (!issue) {
    notFound();
  }

  return <EPaperReaderPage issue={issue} />;
}

export async function generateStaticParams() {
  return getAllIssueIds().map((id) => ({ id }));
}
