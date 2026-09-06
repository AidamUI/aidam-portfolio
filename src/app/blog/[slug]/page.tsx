import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { Section, Stack } from "@/components/Section";
import { BLOG_COPY, BLOG_POSTS, postBySlug } from "@/content/blog";
import { PLACEHOLDER_BLUR } from "@/content/placeholder-blur";
import { PLACEHOLDER_SHAPES } from "@/content/gallery";
import { STAGE_EYEBROW } from "@/content/stage";
import { formatDate } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

/** Cycles the same six generated placeholder shapes documentation albums use. */
function placeholderTiles(count: number) {
  return Array.from(
    { length: count },
    (_, i) => PLACEHOLDER_SHAPES[i % PLACEHOLDER_SHAPES.length],
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const index = BLOG_POSTS.findIndex((candidate) => candidate.slug === slug);
  const previous = index > 0 ? BLOG_POSTS[index - 1] : null;
  const next = index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : null;

  return (
    <>
      <Scene stage="blog" />
      <Hero eyebrow={STAGE_EYEBROW.blog} title={post.title}>
        <div className="border-line mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t pt-6">
          <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
            {BLOG_COPY.kindLabel[post.kind]}
          </span>
          <time dateTime={post.date} className="text-mut text-sm">
            {formatDate(post.date)}
          </time>
        </div>
        {post.kind === "repost" && post.repostedFrom ? (
          <p className="text-mut mt-4 max-w-prose">
            {BLOG_COPY.repostedFromPrefix}{" "}
            <span className="text-ink font-semibold">
              {post.repostedFrom.name}
            </span>{" "}
            — {post.repostedFrom.title}
          </p>
        ) : null}
      </Hero>

      <Stack>
        <Section>
          <div className="flex flex-col gap-6">
            {post.body.map((block, i) =>
              typeof block === "string" ? (
                <p key={i} className="max-w-prose">
                  {block}
                </p>
              ) : (
                <pre
                  key={i}
                  className="bg-ground overflow-x-auto rounded-2xl p-5 text-sm"
                >
                  <code className="font-mono">{block.code}</code>
                </pre>
              ),
            )}
          </div>

          {post.tags && post.tags.length > 0 ? (
            <p className="text-mut mt-8 text-sm">
              {post.tags.map((tag, i) => (
                <Fragment key={tag}>
                  {i > 0 ? " · " : null}#{tag}
                </Fragment>
              ))}
            </p>
          ) : null}
        </Section>

        {post.kind === "video" ? (
          <Section heading="Video">
            <div className="bg-ground flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="none"
                  stroke="var(--line-strong)"
                  strokeWidth="1.4"
                />
                <path d="M10 8.5L16 12L10 15.5Z" fill="var(--line-strong)" />
              </svg>
              <p className="text-mut font-mono text-xs">
                {post.videoDuration ?? "video"} — no file kept, this is a
                placeholder frame
              </p>
            </div>
          </Section>
        ) : null}

        {post.placeholderImages && post.placeholderImages > 0 ? (
          <Section heading="Photos">
            <p className="text-mut mb-6 text-sm">
              Placeholders — the originals weren&apos;t carried over.
            </p>
            <div className="grid grid-cols-2 gap-4 opacity-60 sm:grid-cols-3">
              {placeholderTiles(post.placeholderImages).map((shape, i) => (
                <Image
                  key={i}
                  src={`/images/documentation/placeholder-${shape.id}.png`}
                  alt=""
                  aria-hidden="true"
                  width={shape.width}
                  height={shape.height}
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  className="h-auto w-full rounded-xl"
                />
              ))}
            </div>
          </Section>
        ) : null}

        <nav
          aria-label={BLOG_COPY.allPosts}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="card group block px-6 py-6"
            >
              <span className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
                ← Newer
              </span>
              <span className="font-display group-hover:text-accent mt-3 block font-semibold transition-colors">
                {previous.title}
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="card group block px-6 py-6 sm:text-right"
            >
              <span className="text-warm font-mono text-[10.5px] tracking-[0.12em] uppercase">
                Older →
              </span>
              <span className="font-display group-hover:text-accent mt-3 block font-semibold transition-colors">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>

        <p>
          <Link href="/blog" className="text-accent font-semibold underline">
            {BLOG_COPY.allPosts}
          </Link>
        </p>
      </Stack>
    </>
  );
}
