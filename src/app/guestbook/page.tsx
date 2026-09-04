import type { Metadata } from "next";
import { StationPlaceholder } from "@/components/StationPlaceholder";
import { STATION_PLACEHOLDER } from "@/content/shell";

export const metadata: Metadata = {
  title: "Guestbook",
  description: STATION_PLACEHOLDER["G1"],
  alternates: { canonical: "/guestbook" },
};

export default function GuestbookPage() {
  return <StationPlaceholder code="G1" />;
}
