import Link from "next/link";
import type { ReactNode } from "react";

type SocialButtonProps = {
  href: string | null;
  label: string;
  icon: ReactNode;
};

// Bouton pilule noir partagé par la ligne d'actions du Hero et le footer, pour que
// TikTok/Instagram (et toute future plateforme) rendent exactement pareil aux deux
// endroits au lieu de divergences copiées-collées. `href: null` = pas encore de
// compte/lien fourni par le client -> état visiblement désactivé ("Bientôt") plutôt
// qu'un lien fabriqué.
export function SocialButton({ href, label, icon }: SocialButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-3 font-body text-sm font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.02]"
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <span
      aria-disabled="true"
      title="Bientôt disponible"
      className="inline-flex cursor-not-allowed items-center gap-3 rounded-full bg-black px-7 py-3 font-body text-sm font-medium text-white/50"
    >
      {icon}
      {label}
      <span className="rounded-full border border-white/15 px-2 py-0.5 font-body text-[10px] font-semibold tracking-wide text-white/40 uppercase">
        Bientôt
      </span>
    </span>
  );
}
