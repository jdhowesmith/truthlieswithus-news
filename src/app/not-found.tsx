import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-wider text-brand">404</p>
      <h1 className="mt-2 font-serif text-4xl font-bold">We couldn&rsquo;t find that page</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-400">The story may have moved. Try the front page.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-brand px-5 py-2.5 font-semibold text-white hover:bg-brand-dark">Go to the front page</Link>
    </div>
  );
}
