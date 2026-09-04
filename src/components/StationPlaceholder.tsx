import { notFound } from "next/navigation";
import { STATION_PLACEHOLDER } from "@/content/shell";
import { STATIONS } from "@/content/stations";
import { StationSign } from "./StationSign";

/**
 * M0 only. Every route in the map resolves and renders in the right line
 * colour with the right sign, so the shell can be navigated end to end before
 * any of the content exists. Each of these is replaced by the real page in its
 * own milestone (W1/A1 in M3, P1 in M4, O1 in M5, G1 in M6).
 */
export function StationPlaceholder({ code }: { code: string }) {
  const station = STATIONS.find((s) => s.code === code);
  if (!station) notFound();

  return (
    <>
      <StationSign
        code={station.code}
        name={station.name}
        line={station.line}
        as="h1"
      />
      <div className="px-lg py-xl">
        <p className="measure text-ink">{STATION_PLACEHOLDER[code]}</p>
      </div>
    </>
  );
}
