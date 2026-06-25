import type { Metadata } from "next";
import { Now } from "@/components/now";

export const metadata: Metadata = {
  title: "Now · anh nd.",
  description: "What I am working on, reading, and not doing.",
};

export default function VisitorsPage() {
  return <Now />;
}
