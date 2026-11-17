import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50 text-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-xl font-bold text-neutral-950 dark:text-white">
            Truth Lies <span className="text-brand">With</span> Us
          </p>
          <p className="mt-2 max-w-md text-neutral-600 dark:text-neutral-400">{SITE.tagline} Independent daily news for the Shuswap, Fort Myers Beach and the wider world, written with sources you can check.</p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">
            Tips and corrections: <a className="font-medium text-brand underline-offset-2 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">Sections</p>
          <ul className="mt-3 space-y-1.5">
            {SECTIONS.slice(1).map((s) => (
              <li key={s.slug}><Link className="text-neutral-600 hover:text-brand dark:text-neutral-400" href={`/section/${s.slug}`}>{s.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">About</p>
          <ul className="mt-3 space-y-1.5">
            <li><Link className="text-neutral-600 hover:text-brand dark:text-neutral-400" href="/about">About us</Link></li>
            <li><Link className="text-neutral-600 hover:text-brand dark:text-neutral-400" href="/editorial-standards">Editorial standards</Link></li>
            <li><Link className="text-neutral-600 hover:text-brand dark:text-neutral-400" href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed text-neutral-500 sm:px-6 dark:text-neutral-400">
          <p>
            <strong className="text-neutral-700 dark:text-neutral-300">Editorial disclaimer:</strong> Stories on this site summarize and explain reporting from the outlets and official sources linked at the bottom of each article. Facts are attributed to those sources. Sections labelled &ldquo;Our Take&rdquo; are analysis and opinion, not news reporting. We do not run ads or accept payment for coverage. If we get something wrong, email us and we will correct it.
          </p>
          <p>Photos are credited on each story; most are from Wikimedia Commons under the licence shown, or are public-domain government images. Embedded videos belong to the outlets that published them.</p>
          <p>© {new Date().getFullYear()} Truth Lies With Us. Preview edition.</p>
        </div>
      </div>
    </footer>
  );
}
