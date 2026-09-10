import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { LegalSection } from "@/components/legal/LegalSection";
import { MENTIONS_LEGALES_CONTENT } from "@/components/legal/mentions-legales-content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Flocage By Breo.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="flex-1">
      <section className="grain relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <Link
          href="/"
          className="font-body text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
        >
          ← Retour à l&apos;accueil
        </Link>

        <div className="mt-8">
          <LegalPageHeader
            eyebrow={MENTIONS_LEGALES_CONTENT.eyebrow}
            heading={MENTIONS_LEGALES_CONTENT.heading}
            intro={MENTIONS_LEGALES_CONTENT.intro}
          />
        </div>

        <div className="mt-12 flex max-w-2xl flex-col gap-8">
          {MENTIONS_LEGALES_CONTENT.sections.map((section) => (
            <LegalSection key={section.heading} heading={section.heading} paragraphs={section.paragraphs} />
          ))}
        </div>
      </section>
    </main>
  );
}
