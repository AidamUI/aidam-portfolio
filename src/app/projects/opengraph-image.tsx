import { STATIONS } from "@/content/stations";
import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og";

const station = STATIONS.find((s) => s.code === "P1")!;

export const alt = `${station.code} ${station.name} — ${station.blurb}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderCard({
    code: station.code,
    title: station.name,
    subtitle: station.blurb,
    line: "kerja",
    footer: "Muhammad Kaila Aidam Riyan",
  });
}
