import { notFound } from "next/navigation";
import { BLOG_POSTS, postBySlug } from "@/content/blog";
import { OG_CONTENT_TYPE, OG_SIZE, renderCard } from "@/lib/og";
import { formatDate } from "@/lib/format";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return renderCard({
    title: post.title,
    subtitle: post.excerpt,
    footer: formatDate(post.date),
  });
}
