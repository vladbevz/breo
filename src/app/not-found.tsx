import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="flex-1">
      <section className="grain relative isolate flex min-h-[70vh] flex-col justify-center overflow-hidden px-6 py-24 sm:px-10 lg:py-32 lg:pr-28">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
            <span className="h-px w-8 rule-signature" aria-hidden="true" />
            Erreur 404
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
            Cette page n&apos;existe pas.
          </h1>
          <p className="mt-6 font-body text-base text-bone-dim">
            Le lien est peut-être expiré ou mal orthographié. Repartez de l&apos;accueil pour retrouver votre chemin.
          </p>

          <Link
            href="/"
            className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
          >
            <span className="absolute inset-0 rule-signature" aria-hidden="true" />
            <span className="relative">Retour à l&apos;accueil</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
