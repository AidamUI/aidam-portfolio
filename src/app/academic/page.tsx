import type { Metadata } from "next";
import { StationPlaceholder } from "@/components/StationPlaceholder";
import { STATION_PLACEHOLDER } from "@/content/shell";

export const metadata: Metadata = {
  title: "Academic",
  description: STATION_PLACEHOLDER["A1"],
  alternates: { canonical: "/academic" },
};

export default function AcademicPage() {
  return <StationPlaceholder code="A1" />;
}
