import Image from "next/image";
import type { GalleryItem } from "@/content/types";

/**
 * CSS multi-column masonry, 1/2/3 columns by breakpoint — images keep their
 * real aspect ratio, no cropping, no uniform card heights.
 *
 * Shared between a real album grid and the placeholder preview grid, so both
 * lay out identically and swapping placeholder items for real ones changes
 * nothing about the layout.
 */
export function PhotoGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <figure key={item.src} className="mb-6 break-inside-avoid">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full rounded-lg"
          />
          {item.caption ? (
            <figcaption className="text-text-muted mt-2 text-sm">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
