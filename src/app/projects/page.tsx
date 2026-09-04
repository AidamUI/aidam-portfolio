import type { Metadata } from "next";
import { StationPlaceholder } from "@/components/StationPlaceholder";
import { STATION_PLACEHOLDER } from "@/content/shell";

export const metadata: Metadata = {
  title: "Projects",
  description: STATION_PLACEHOLDER["P1"],
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <StationPlaceholder code="P1" />;
}
