"use client";

import { useEffect } from "react";
import { markArticleAsReadDirect } from "@/hooks/useReadArticles";

interface MarkAsReadOnViewProps {
  slug: string;
}

export default function MarkAsReadOnView({ slug }: MarkAsReadOnViewProps) {
  useEffect(() => {
    // Mark as read when the article page is viewed
    markArticleAsReadDirect(slug);
  }, [slug]);

  return null;
}
