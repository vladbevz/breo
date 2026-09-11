import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDesign } from "@/lib/designs";
import { GARMENT_PALETTE } from "@/components/configurator/state/palette";
import { QuantitySelector } from "./QuantitySelector";

export const metadata: Metadata = {
  title: "Votre modèle",
  description: "Récapitulatif de votre modèle personnalisé avant demande de devis.",
};

type ModelePretPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ModelePretPage({ params }: ModelePretPageProps) {
  const { id } = await params;
  const design = await getDesign(id);

  if (!design) notFound();

  const colorLabel = GARMENT_PALETTE.find((color) => color.hex === design.tshirt_color)?.label ?? design.tshirt_color;

  return (
    <main className="flex-1">
      <section className="grain relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <Link
          href="/configurateur"
          className="font-body text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
        >
          ← Retour au configurateur
        </Link>

        <div className="mt-8 max-w-5xl lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
              <span className="h-px w-8 rule-signature" aria-hidden="true" />
              Votre modèle
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">Prêt à personnaliser</h1>
            <p className="mt-6 font-body text-base text-bone-dim">Couleur : {colorLabel}</p>

            {design.preview_url ? (
              <div className="relative mt-6 aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-bone/10 bg-ink-soft">
                <Image
                  src={design.preview_url}
                  alt="Aperçu de votre modèle personnalisé"
                  fill
                  sizes="(min-width: 640px) 384px, 100vw"
                  className="object-contain"
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <QuantitySelector designId={design.id} initialQuantity={design.quantity} />
          </div>
        </div>
      </section>
    </main>
  );
}
