# Truth Lies With Us — news site

Next.js 15 (App Router) + Tailwind CSS v4. Every story is a Markdown file, so publishing a new story is just adding a file and pushing.

- Local dev: `npm install && npm run dev` → http://localhost:3000
- Production build: `npm run build`
- Deploys automatically on Vercel when `main` is pushed.

## Add a story (daily)

1. Copy `content/articles/_TEMPLATE.md` to `content/articles/<short-slug>.md`. The file name becomes the URL: `/news/<short-slug>`. Files starting with `_` are ignored.
2. Fill in the frontmatter:
   - `section`: one of `shuswap-bc`, `florida`, `canada`, `us`, `world`, `business`, `weather-alerts`, `sports`, `culture` (see `src/lib/sections.ts`). `alsoIn` lists extra sections.
   - `priority`: the highest-priority story from the newest day is the homepage lead. 7 or more also appears in Top Stories.
   - `date`: ISO date with offset, in B.C. time (`-07:00`).
   - `keyPoints`: facts only. `ourTake`: the labelled analysis/opinion box.
   - `sources`: every outlet or agency used. Never add a quote or number that isn't in a source.
3. Write the body in Markdown below the `---`.
4. Run `npm run build` to check, then commit and push.

## Images

- Put image files in `public/images/YYYY/MM/` as JPEG about 1600px wide (quality 80), plus an 800px copy named `name-800.jpg` for story cards.
- Register them in `content/images.json` with `src`, `width`, `height`, `alt`, `credit`, `creditUrl`, `license`, `licenseUrl`. Then use the key in the story: `image: my-key`.
- Or put a full object straight into the story frontmatter (`image: { src: ..., width: ..., ... }`).
- Only use freely licensed photos (Wikimedia Commons, public-domain government/NASA/NOAA/U.S. military images, official press-kit photos with credit). Add `illustrative: true` for generated or illustrative art; the caption then says "Illustrative image."
- Say "File photo." in `imageCaption` when the photo shows the place, not the event.

## Video

Add a `video` block with a YouTube ID from the outlet's official channel. Embeds are click-to-play (no YouTube code loads until the reader presses play), so pages stay fast.

## Where today's stories came from

The first edition (Nov. 17, 2026) was built from the News & Events bot's daily brief (`/workspace/news-brief-2026-11-17/FINAL-BRIEF-2026-11-17.md`). Key facts were checked against the original reporting linked in each story.

## Before launch on truthlieswithus.com

- Set `NEXT_PUBLIC_SITE_URL` in Vercel, attach the domain, and change `src/app/robots.ts` and the `robots` metadata in `src/app/layout.tsx` to allow indexing. The preview is deliberately hidden from search engines.

## Deploying

- **GitHub Pages preview (current):** `scripts/deploy-pages.sh` builds a static copy and pushes it to the `gh-pages` branch. Live at https://jdhowesmith.github.io/truthlieswithus-news/
- **Vercel (recommended for launch):** import this repo at vercel.com/new (framework: Next.js, no settings needed), then attach truthlieswithus.com. Every push to `main` then redeploys automatically.
