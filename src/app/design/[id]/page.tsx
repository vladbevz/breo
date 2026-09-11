import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicDesignFields } from "@/lib/designs";
import { GARMENT_PALETTE } from "@/components/configurator/state/palette";

export const metadata: Metadata = {
  title: "Un modèle Flocage By Breo",
  description: "Découvrez ce modèle personnalisé créé avec le configurateur 3D Flocage By Breo.",
};

type DesignPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DesignPage({ params }: DesignPageProps) {
  const { id } = await params;
  const design = await getPublicDesignFields(id);

  if (!design) notFound();

  const colorLabel = GARMENT_PALETTE.find((color) => color.hex === design.tshirt_color)?.label ?? design.tshirt_color;

  return (
    <main className="flex-1">
      <section className="grain relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <div className="max-w-4xl lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-center">
          {design.preview_url ? (
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-bone/10 bg-ink-soft lg:col-span-6">
              <Image src={design.preview_url} alt="Aperçu du modèle partagé" fill className="object-contain" />
            </div>
          ) : null}

          <div className="mt-10 lg:col-span-6 lg:mt-0">
            <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
              <span className="h-px w-8 rule-signature" aria-hidden="true" />
              Modèle personnalisé
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">Un modèle flocé sur mesure</h1>
            <p className="mt-6 font-body text-base text-bone-dim">
              Couleur : {colorLabel}
              {design.quantity ? ` — quantité envisagée : ${design.quantity}` : ""}
            </p>

            <Link
              href={`/devis/${design.id}`}
              className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
            >
              <span className="absolute inset-0 rule-signature" aria-hidden="true" />
              <span className="relative">Demander ce modèle</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
