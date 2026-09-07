import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { STAGE_EYEBROW } from "@/content/stage";

export default function NotFound() {
  return (
    <>
      <Scene stage="notfound" />
      <Hero eyebrow={STAGE_EYEBROW.notfound} title="Wrong fork.">
        <p className="mt-5 max-w-[48ch] text-lg">
          The signpost here points at nothing. This page doesn&apos;t exist.
        </p>
        <p className="mt-7">
          <Link
            href="/"
            className="bg-accent text-on-accent inline-block rounded-full px-6 py-3 text-sm font-bold"
          >
            Back to the trailhead
          </Link>
        </p>
      </Hero>
    </>
  );
}
