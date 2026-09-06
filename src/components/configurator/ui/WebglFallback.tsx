import Link from "next/link";

export function WebglFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-2xl font-semibold">Aperçu 3D indisponible sur cet appareil</p>
      <p className="max-w-md font-body text-sm text-bone-dim">
        Votre navigateur ne prend pas en charge l&apos;affichage 3D. Contactez-nous directement pour
        finaliser votre projet de flocage.
      </p>
      <Link
        href="/#contact"
        className="group relative mt-2 inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.02]"
      >
        <span className="absolute inset-0 rule-signature" aria-hidden="true" />
        <span className="relative">Nous contacter</span>
      </Link>
    </div>
  );
}
