import type { Album, AlbumSlug, GalleryItem } from "./types";

/**
 * The /documentation gallery. Source: content.md §10.
 *
 * ── Ships live in v1 with zero photos. ────────────────────────────────────
 * This is not a feature flag and not a hidden route. Every album page renders
 * a real empty state ("nothing here yet") and stays correct when `ITEMS` is
 * empty, so photos can land later without redeploying any structure.
 *
 * Adding a photo means: run the ingest script, which strips EXIF including GPS,
 * resizes, converts, generates a blur placeholder and appends a stub object
 * here — then write the caption. One file, no component edits.
 *
 * Two standing rules once photos arrive: a yes from anyone identifiable before
 * it goes up, and EXIF and GPS stripped on the way in.
 */

export const ALBUMS: Album[] = [
  {
    slug: "jalan-jalan",
    name: "Jalan-jalan",
    blurb: "Travel and trips.",
  },
  {
    slug: "kerja",
    name: "Kerja",
    blurb: "IBM, the office, conferences, demos.",
  },
  {
    slug: "ngajar",
    name: "Ngajar",
    blurb: "Teaching: labs, review sessions, the whiteboard.",
  },
  {
    slug: "lomba",
    name: "Lomba",
    blurb: "GEMASTIK, Datathon, competition rooms.",
  },
  {
    slug: "organisasi",
    name: "Organisasi",
    blurb: "AIESEC, BETIS, BEM, RISTEK, Open House.",
  },
  {
    slug: "random",
    name: "Random",
    blurb: "The ones that don't fit.",
  },
];

/**
 * Empty on purpose. Every consumer must handle this being `[]` — that is the
 * v1 acceptance criterion, not a temporary state to code around.
 */
export const ITEMS: GalleryItem[] = [];

export const GALLERY_COPY = {
  heading: "Documentation",
  blurb:
    "Photos and documentation, in the Indonesian student-org sense — the whole record, not just the nice pictures.",
  /** Shown on an album with no items yet. */
  emptyAlbum: "Nothing here yet.",
  emptyAlbumDetail:
    "This album is built and waiting. Photos land here as they get taken.",
  emptyIndex: "No photos up yet — the albums below are ready for them.",
  lightboxClose: "Close",
  lightboxPrev: "Previous photo",
  lightboxNext: "Next photo",
} as const;

export function albumBySlug(slug: string): Album | undefined {
  return ALBUMS.find((album) => album.slug === slug);
}

export function itemsInAlbum(slug: AlbumSlug): GalleryItem[] {
  return ITEMS.filter((item) => item.album === slug);
}

export function albumCount(slug: AlbumSlug): number {
  return itemsInAlbum(slug).length;
}
