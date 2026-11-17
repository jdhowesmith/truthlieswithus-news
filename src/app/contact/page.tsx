import Prose from "@/components/Prose";
import { SITE } from "@/lib/site";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <Prose title="Contact us">
      <p>We read every message.</p>
      <ul>
        <li><strong>News tips and story ideas:</strong> <a href={`mailto:${SITE.email}?subject=News%20tip`}>{SITE.email}</a></li>
        <li><strong>Corrections:</strong> <a href={`mailto:${SITE.email}?subject=Correction`}>{SITE.email}</a>. Please include the story link and what needs fixing.</li>
        <li><strong>Everything else:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
      </ul>
      <p>Please do not send us confidential documents by regular email if your safety could be at risk.</p>
    </Prose>
  );
}
