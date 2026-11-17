import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";
export const metadata = { title: "About" };
export default function About() {
  return (
    <Prose title="About Truth Lies With Us">
      <p>Truth Lies With Us is an independent daily news site covering two communities closely, the Shuswap in British Columbia and Fort Myers Beach in Southwest Florida, plus everything happening in Canada, the United States and the world in between.</p>
      <p>Every morning we start from a sourced briefing of the day&rsquo;s news, check the facts against the original reporting and official records, and write each story up in plain language. Then we add a short, clearly labelled <strong>Our Take</strong>: what the story means for everyday people, snowbirds, families and small businesses.</p>
      <h2>What we promise</h2>
      <ul>
        <li>Facts are attributed and linked to the outlet or agency that reported them.</li>
        <li>We never invent quotes, numbers or people.</li>
        <li>Analysis is always labelled as analysis.</li>
        <li>No ads, no sponsored stories, no paywall.</li>
      </ul>
      <p>Stories are written and edited by the {SITE.byline}. Questions, tips or corrections: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </Prose>
  );
}
