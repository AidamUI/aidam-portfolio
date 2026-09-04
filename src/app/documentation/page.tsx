import type { Metadata } from "next";
import { StationPlaceholder } from "@/components/StationPlaceholder";
import { STATION_PLACEHOLDER } from "@/content/shell";

export const metadata: Metadata = {
  title: "Documentation",
  description: STATION_PLACEHOLDER["O1"],
  alternates: { canonical: "/documentation" },
};

export default function DocumentationPage() {
  return <StationPlaceholder code="O1" />;
}
