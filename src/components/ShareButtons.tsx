"use client";
import { useEffect, useState } from "react";

export default function ShareButtons({ url: fallbackUrl, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(fallbackUrl);
  useEffect(() => setUrl(window.location.href.split("#")[0]), []);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const btn = "inline-flex h-9 items-center gap-1.5 rounded-full border border-neutral-300 px-3 text-sm font-medium text-neutral-700 hover:border-neutral-500 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800";
  async function native() {
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else copy();
  }
  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this story">
      <button type="button" onClick={native} className={`${btn} sm:hidden`}>Share</button>
      <a className={btn} href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.1L4.5 22H1.4l8.1-9.3L1 2h7.1l5 6.6L18.9 2zm-1.2 18h1.7L6.4 3.9H4.6L17.7 20z"/></svg>
        <span className="hidden sm:inline">X</span>
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9V7c0-.9.6-1 1-1h2.5V2H14c-3 0-4 2.2-4 4.4V9H7.5v4H10v9h4v-9h3l.5-4H14z"/></svg>
        <span className="hidden sm:inline">Facebook</span>
      </a>
      <a className={btn} href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
        <span className="hidden sm:inline">Email</span>
      </a>
      <button type="button" onClick={copy} className={btn} aria-live="polite">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>
        {copied ? "Copied" : <span className="hidden sm:inline">Copy link</span>}
      </button>
    </div>
  );
}
