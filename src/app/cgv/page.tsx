import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageHeader } from "@/components/legal/LegalPageHeader";
import { LegalSection } from "@/components/legal/LegalSection";
import { CGV_CONTENT } from "@/components/legal/cgv-content";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente du site Flocage By Breo.",
};

export default function CgvPage() {
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
          <LegalPageHeader eyebrow={CGV_CONTENT.eyebrow} heading={CGV_CONTENT.heading} intro={CGV_CONTENT.intro} />
        </div>

        <div className="mt-12 flex max-w-2xl flex-col gap-8">
          {CGV_CONTENT.sections.map((section) => (
            <LegalSection key={section.heading} heading={section.heading} paragraphs={section.paragraphs} />
          ))}
        </div>
      </section>
    </main>
  );
}
