import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesign } from "@/lib/designs";
import { buildWhatsAppLink } from "./confirmation-content";
import { ResendEmailButton } from "./ResendEmailButton";

export const metadata: Metadata = {
  title: "Demande envoyée",
  description: "Votre demande de devis a bien été envoyée.",
};

type ConfirmationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = await params;
  const design = await getDesign(id);

  if (!design) notFound();

  const whatsAppLink = buildWhatsAppLink(design.id);

  return (
    <main className="flex-1">
      <section className="grain relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
            <span className="h-px w-8 rule-signature" aria-hidden="true" />
            Demande envoyée
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
            Merci{design.contact_name ? `, ${design.contact_name}` : ""} !
          </h1>
          <p className="mt-6 font-body text-base text-bone-dim">
            Votre demande a bien été reçue. Notre équipe revient vers vous sous 24h ouvrées avec un devis précis pour
            votre modèle (réf. {design.id}).
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {whatsAppLink ? (
              <Link
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
              >
                <span className="absolute inset-0 rule-signature" aria-hidden="true" />
                <span className="relative">Continuer sur WhatsApp</span>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Bientôt disponible"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-bone/15 px-7 py-3 font-body text-sm font-medium text-bone-dim/50"
              >
                Continuer sur WhatsApp
                <span className="rounded-full border border-bone/15 px-2 py-0.5 font-body text-[10px] font-semibold tracking-wide text-bone-dim/50 uppercase">
                  Bientôt
                </span>
              </span>
            )}

            <ResendEmailButton designId={design.id} />
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 font-body text-sm text-bone-dim underline decoration-bone-dim underline-offset-4 transition-colors duration-300 hover:decoration-orange"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
