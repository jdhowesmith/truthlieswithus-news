import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";
export const metadata = { title: "Editorial standards" };
export default function Standards() {
  return (
    <Prose title="Editorial standards & disclaimer">
      <h2>Facts versus analysis</h2>
      <p>Each story has three parts. <strong>The facts at a glance</strong> and <strong>The reporting</strong> summarize what credible outlets and official agencies have reported, with every source linked at the bottom. <strong>Our Take</strong> is analysis and opinion, written to explain what the news may mean for readers. It is always labelled.</p>
      <h2>Sourcing</h2>
      <p>We rely on established news organizations, government agencies and primary documents. When a claim is unconfirmed, we say so. We do not publish quotes we cannot trace to a published source.</p>
      <h2>Images and video</h2>
      <p>Photos are freely licensed (mostly from Wikimedia Commons, with the photographer and licence credited) or public-domain government images. Where a photo shows a general place rather than the event itself, the caption says so. Videos are embedded from the outlets that published them and load only when you press play.</p>
      <h2>Corrections</h2>
      <p>If we get something wrong we fix it and note the change. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      <h2>Disclaimer</h2>
      <p>Content on this site is for general information. It is not legal, financial, tax, medical or safety advice. For emergencies, follow instructions from local officials, Environment Canada, the U.S. National Weather Service and emergency alerts.</p>
    </Prose>
  );
}
