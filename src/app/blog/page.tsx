import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Scene } from "@/components/mountain/Scene";
import { Stack } from "@/components/Section";
import { BLOG_COPY, BLOG_POSTS } from "@/content/blog";
import { STAGE_EYEBROW } from "@/content/stage";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: BLOG_COPY.heading,
  description: BLOG_COPY.blurb,
  alternates: { canonical: "/blog" },
};

/**
 * The index: every entry, newest first, in one card. Reposts say plainly
 * whose post they are rather than reading as Aidam's own words.
 */
export default function BlogPage() {
  return (
    <>
      <Scene stage="blog" />
      <Hero eyebrow={STAGE_EYEBROW.blog} title={BLOG_COPY.heading}>
        <p className="text-mut mt-4 max-w-prose">{BLOG_COPY.blurb}</p>
      </Hero>

      <Stack>
        <div className="card p-3 sm:p-4">
          <ul className="flex flex-col">
            {BLOG_POSTS.map((post) => (
              <li
                key={post.slug}
                className="border-line border-b last:border-b-0"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:bg-pill-bg block rounded-2xl p-5 transition-colors sm:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <span className="text-warm font-mono text-[11px] tracking-[0.1em] uppercase">
                      {BLOG_COPY.kindLabel[post.kind]}
                      {post.kind === "repost" && post.repostedFrom
                        ? ` · ${BLOG_COPY.repostedFromPrefix} ${post.repostedFrom.name}`
                        : null}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-mut shrink-0 font-mono text-xs"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <h2 className="font-display mt-2 text-lg font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-mut mt-1 max-w-prose">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Stack>
    </>
  );
}
