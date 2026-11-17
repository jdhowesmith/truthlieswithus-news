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

## Daily upkeep: scores, streaming, weather

### Sports: last night's scores (`content/scores/YYYY-MM-DD.json`)
- Name the file for the **game date** (games played Mon Nov 16 → `2026-11-16.json`). The Sports page always shows the newest file.
- For each league (`NFL`, `NHL`), list every final: `away` / `home` with `name`, `abbr`, `score`, `record`, plus `status` (`Final`, `Final/OT`, `Final/SO`), `venue`, `links` (NHL.com GameCenter, ESPN recap or box score) and optional `story` (slug of our article).
- Check every score against two sources. Quick checks:
  - NHL: `https://api-web.nhle.com/v1/score/YYYY-MM-DD` (official; `gameOutcome.lastPeriodType` is `REG`, `OT` or `SO`), plus box scores at `https://api-web.nhle.com/v1/gamecenter/<id>/boxscore`.
  - NFL/NHL: `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=YYYYMMDD` (swap in `hockey/nhl`).
  - If sources disagree on a stat, use the league's official number and say so.
- `underReported`: one or two real, lesser-covered facts per league, each with `headline`, `text` and `sources`. Only facts a source states, and nothing invented.
- If a league had no games, keep the league with `"games": []`.
- Write the big NFL and NHL stories as normal articles with `section: sports`.

### Culture: streaming (`content/streaming/YYYY-MM-DD.json`)
- Name the file for the publish date. The Culture page shows the newest file.
- `outToday` and `recent` items need `title`, `type`, `service`, `availability` (say clearly when Canada or Crave isn't confirmed), `date`, `summary` and the official `url`.
- `charts`: Netflix Top 10 from the official data at `https://www.netflix.com/tudum/top10/data/all-weeks-countries.tsv` (Canada) and `all-weeks-global.tsv`. Use the newest published week and label it.

### Weather (`/weather`)
- Live forecasts load in the browser from Open-Meteo (free, no key). Places, alert links and official forecast links are in `src/lib/locations.ts`.
- Daily weather stories still go in `content/articles/` with `section: weather-alerts`. They appear on the Weather page automatically.

### Wording
- This is a public news site. Refer to the Shuswap and Fort Myers Beach as communities we cover, never as "our homes", "both homes" or anything that suggests the publisher lives in either place.

## Where today's stories came from

The first edition (Nov. 17, 2026) was built from the News & Events bot's daily brief (`/workspace/news-brief-2026-11-17/FINAL-BRIEF-2026-11-17.md`). Key facts were checked against the original reporting linked in each story.

## Before launch on truthlieswithus.com

- Set `NEXT_PUBLIC_SITE_URL` in Vercel, attach the domain, and change `src/app/robots.ts` and the `robots` metadata in `src/app/layout.tsx` to allow indexing. The preview is deliberately hidden from search engines.

## Deploying

- **GitHub Pages preview (current):** `scripts/deploy-pages.sh` builds a static copy and pushes it to the `gh-pages` branch. Live at https://jdhowesmith.github.io/truthlieswithus-news/
- **Vercel (recommended for launch):** import this repo at vercel.com/new (framework: Next.js, no settings needed), then attach truthlieswithus.com. Every push to `main` then redeploys automatically.
