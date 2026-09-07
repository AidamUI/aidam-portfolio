import { ACADEMIC, PRIOR_SCHOOL } from "@/content/academic";
import { PROFILE } from "@/content/profile";
import { PROFESSIONAL_ROLES } from "@/content/roles";
import { SITE, SOCIALS } from "@/content/site";

/**
 * JSON-LD `Person`, per tech-plan.md §5. Tells a search engine that "Aidam
 * Kaila", "Muhammad Kaila Aidam Riyan" and this site are the same entity —
 * the old site had no such markup and was invisible for his own name.
 *
 * Built from the content modules rather than written out, so a job change edits
 * one file and the structured data follows.
 *
 * Deliberately absent: email, which is lightly obfuscated on the page and would
 * be handed over in plain text here; and any date of birth, phone number or
 * address, none of which belong on the site at all.
 */
export function PersonSchema() {
  const current = PROFESSIONAL_ROLES.find((role) => role.end === null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    alternateName: `${PROFILE.goesBy} Kaila`,
    url: SITE.url,
    description: PROFILE.shortBio,
    jobTitle: current?.title,
    worksFor: current
      ? { "@type": "Organization", name: current.org }
      : undefined,
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: ACADEMIC.institution,
        department: ACADEMIC.faculty,
      },
      { "@type": "EducationalOrganization", name: PRIOR_SCHOOL.name },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    knowsLanguage: ["en", "id", "ar"],
    sameAs: SOCIALS.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from local content modules, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
