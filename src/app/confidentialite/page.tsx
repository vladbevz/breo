import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { LegalSection } from "@/components/legal/LegalSection";
import { CONFIDENTIALITE_CONTENT } from "@/components/legal/confidentialite-content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Flocage By Breo.",
};

export default function ConfidentialitePage() {
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
            eyebrow={CONFIDENTIALITE_CONTENT.eyebrow}
            heading={CONFIDENTIALITE_CONTENT.heading}
            intro={CONFIDENTIALITE_CONTENT.intro}
          />
        </div>

        <div className="mt-12 flex max-w-2xl flex-col gap-8">
          {CONFIDENTIALITE_CONTENT.sections.map((section) => (
            <LegalSection key={section.heading} heading={section.heading} paragraphs={section.paragraphs} />
          ))}
        </div>
      </section>
    </main>
  );
}
