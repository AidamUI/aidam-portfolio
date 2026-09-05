import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
      <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="text-text-muted mt-4 max-w-prose">
        That page doesn&apos;t exist. Nothing was moved; the link was probably
        never right.
      </p>
      <p className="mt-8">
        <Link href="/" className="text-accent underline">
          Back to the home page
        </Link>
      </p>
    </div>
  );
}
