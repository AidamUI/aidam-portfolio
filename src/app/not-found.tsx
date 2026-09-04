import Link from "next/link";
import { StationSign } from "@/components/StationSign";
import { INTERCHANGE } from "@/content/stations";

/**
 * Not a joke about delays or missed trains — design-system.md rules out fake
 * transit furniture. Just an honest sign and a way back to the interchange.
 */
export default function NotFound() {
  return (
    <>
      <StationSign code="—" name="No such station" line="pribadi" as="h1" />
      <div className="px-lg py-xl">
        <p className="measure text-ink">
          That address is not on either line. Nothing was moved; the link was
          probably never real.
        </p>
        <p className="mt-lg">
          <Link href={INTERCHANGE.href} className="text-ink underline">
            Back to the interchange
          </Link>
        </p>
      </div>
    </>
  );
}
