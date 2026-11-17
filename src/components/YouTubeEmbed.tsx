"use client";
import Image from "next/image";
import { useState } from "react";

export default function YouTubeEmbed({ id, title, credit }: { id: string; title: string; credit: string }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
            <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill unoptimized sizes="(min-width: 768px) 720px, 100vw" className="object-cover opacity-90 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="absolute bottom-3 left-4 right-4 text-left text-sm font-medium text-white">{title}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Video: {credit}, via YouTube. Loads only when you press play.
      </figcaption>
    </figure>
  );
}
