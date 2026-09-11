import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import type { HeroContent } from "./hero-content";

type HeroActionsProps = {
  primaryCta: HeroContent["primaryCta"];
  tiktokCta: HeroContent["tiktokCta"];
  instagramCta: HeroContent["instagramCta"];
  configuratorCta: HeroContent["configuratorCta"];
  actionsVariants: Variants;
};

export function HeroActions({
  primaryCta,
  tiktokCta,
  instagramCta,
  configuratorCta,
  actionsVariants,
}: HeroActionsProps) {
  return (
    <motion.div variants={actionsVariants} className="mt-10 flex flex-wrap items-center gap-5">
      <Link
        href={primaryCta.href}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
      >
        <span className="absolute inset-0 rule-signature" aria-hidden="true" />
        <span className="relative">{primaryCta.label}</span>
      </Link>

      <Link
        href={tiktokCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-3 font-body text-sm font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.02]"
      >
        <span className="relative inline-flex h-4 w-4 shrink-0" aria-hidden="true">
          <TikTokIcon className="absolute inset-0 h-4 w-4 translate-x-[-1.5px] -translate-y-px text-[#25f4ee]" />
          <TikTokIcon className="absolute inset-0 h-4 w-4 translate-x-[1.5px] translate-y-px text-[#fe2c55]" />
          <TikTokIcon className="relative h-4 w-4 text-white" />
        </span>
        {tiktokCta.label}
      </Link>

      {instagramCta.href ? (
        <Link
          href={instagramCta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-7 py-3 font-body text-sm font-medium text-white transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          <InstagramIcon className="h-4 w-4 shrink-0" />
          {instagramCta.label}
        </Link>
      ) : (
        <span
          aria-disabled="true"
          title="Bientôt disponible"
          className="inline-flex cursor-not-allowed items-center justify-center gap-3 rounded-full bg-black/40 px-7 py-3 font-body text-sm font-medium text-white/40"
        >
          <InstagramIcon className="h-4 w-4 shrink-0" />
          {instagramCta.label}
          <span className="font-body text-xs text-white/30">(bientôt)</span>
        </span>
      )}

      <Link
        href={configuratorCta.href}
        className="group relative inline-flex items-center gap-2 rounded-full border border-bone/20 px-7 py-3 font-body text-sm font-medium text-bone transition-colors duration-300 hover:border-transparent"
      >
        <span
          className="ring-signature pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
        <span className="relative h-1.5 w-1.5 shrink-0 rounded-full rule-signature" aria-hidden="true" />
        <span className="relative">{configuratorCta.label}</span>
      </Link>
    </motion.div>
  );
}
