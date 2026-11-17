"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SECTIONS } from "@/lib/sections";
import ThemeToggle from "./ThemeToggle";

export default function Header({ today }: { today: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 lg:hidden dark:text-neutral-200 dark:hover:bg-neutral-800"
          aria-label="Open sections menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
        <div className="hidden min-w-40 text-xs text-neutral-500 lg:block dark:text-neutral-400">{today}</div>
        <Link href="/" className="group flex flex-col items-center text-center" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl dark:text-white">
            Truth Lies <span className="text-brand">With</span> Us
          </span>
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:block dark:text-neutral-400">
            Shuswap · Fort Myers Beach · Canada · World
          </span>
        </Link>
        <div className="flex min-w-9 items-center justify-end gap-2 lg:min-w-40">
          <ThemeToggle />
        </div>
      </div>
      <nav aria-label="Sections" className="border-t border-neutral-200 dark:border-neutral-800">
        <ul className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 text-sm font-medium sm:px-4 lg:justify-center">
          {SECTIONS.map((s) => {
            const href = s.slug === "top-stories" ? "/" : s.slug === "weather-alerts" ? "/weather" : `/section/${s.slug}`;
            const active = s.slug === "top-stories" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={s.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b-2 px-3 py-2.5 transition-colors ${active ? "border-brand text-neutral-950 dark:text-white" : "border-transparent text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"}`}
                >
                  {s.short ?? s.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {open && (
        <div className="border-t border-neutral-200 bg-white lg:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.slug === "top-stories" ? "/" : s.slug === "weather-alerts" ? "/weather" : `/section/${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-neutral-800 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {s.name}
                </Link>
              </li>
            ))}
            <li><Link href="/about" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">About</Link></li>
            <li><Link href="/contact" onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800">Contact</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
