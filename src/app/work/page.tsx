import type { Metadata } from "next";
import { StationPlaceholder } from "@/components/StationPlaceholder";
import { STATION_PLACEHOLDER } from "@/content/shell";

export const metadata: Metadata = {
  title: "Work",
  description: STATION_PLACEHOLDER["W1"],
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <StationPlaceholder code="W1" />;
}
