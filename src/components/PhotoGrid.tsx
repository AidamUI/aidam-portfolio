import Image from "next/image";
import type { GalleryItem } from "@/content/types";

/**
 * CSS multi-column masonry, 1/2/3 columns by breakpoint. Source:
 * design-system.md § Gallery components — images keep their real aspect
 * ratio, no square cropping, no uniform card heights.
 *
 * Shared between a real album grid and the placeholder preview grid, so both
 * lay out identically and swapping placeholder items for real ones changes
 * nothing about the layout.
 */
export function PhotoGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="gap-md lg:gap-lg columns-1 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <figure key={item.src} className="mb-md lg:mb-lg break-inside-avoid">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full"
          />
          {item.caption ? (
            <figcaption className="text-ink-2 mt-sm text-[14px]">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
