import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDesign } from "@/lib/designs";
import { DevisForm } from "./DevisForm";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Finalisez votre demande de devis pour votre modèle personnalisé.",
};

type DevisPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DevisPage({ params }: DevisPageProps) {
  const { id } = await params;
  const design = await getDesign(id);

  if (!design) notFound();

  return (
    <main className="flex-1">
      <section className="grain relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <div className="max-w-5xl lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
              <span className="h-px w-8 rule-signature" aria-hidden="true" />
              Demande de devis
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">Presque terminé</h1>
            <p className="mt-6 font-body text-base text-bone-dim">
              Laissez vos coordonnées, notre équipe revient vers vous sous 24h ouvrées avec un devis précis.
            </p>

            {design.preview_url ? (
              <div className="relative mt-6 aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-bone/10 bg-ink-soft">
                <Image
                  src={design.preview_url}
                  alt="Aperçu de votre modèle personnalisé"
                  fill
                  sizes="(min-width: 640px) 320px, 100vw"
                  className="object-contain"
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <DevisForm designId={design.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
