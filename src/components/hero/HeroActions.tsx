import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { FranceMap } from "./FranceMap";
import type { HeroContent } from "./hero-content";

type HeroActionsProps = {
  primaryCta: HeroContent["primaryCta"];
  secondaryCta?: HeroContent["secondaryCta"];
  tiktok?: HeroContent["tiktok"];
  trustLine?: HeroContent["trustLine"];
  actionsVariants: Variants;
  shouldReduceMotion: boolean;
};

export function HeroActions({
  primaryCta,
  secondaryCta,
  tiktok,
  trustLine,
  actionsVariants,
  shouldReduceMotion,
}: HeroActionsProps) {
  return (
    <motion.div
      variants={actionsVariants}
      className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center"
    >
      <div className="flex flex-wrap items-center gap-5">
        <Link
          href={primaryCta.href}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          <span className="absolute inset-0 rule-signature" aria-hidden="true" />
          <span className="relative">{primaryCta.label}</span>
        </Link>

        {secondaryCta ? (
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center gap-2 font-body text-sm font-medium text-bone underline decoration-bone-dim underline-offset-4 transition-colors duration-300 hover:decoration-orange"
          >
            {secondaryCta.label}
          </Link>
        ) : null}

        {tiktok ? (
          <Link
            href={tiktok.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tiktok.label}
            className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-bone-dim/30 text-bone transition-colors duration-300 hover:border-transparent hover:text-ink"
          >
            <span
              className="absolute inset-0 scale-0 rule-signature transition-transform duration-300 group-hover:scale-100"
              aria-hidden="true"
            />
            <TikTokIcon className="relative h-4 w-4" />
          </Link>
        ) : null}
      </div>

      {trustLine ? (
        <div className="flex items-center gap-3">
          <FranceMap shouldReduceMotion={shouldReduceMotion} className="h-8 w-auto shrink-0" />
          <p className="font-body text-xs uppercase tracking-[0.2em] text-bone-dim">{trustLine}</p>
        </div>
      ) : null}
    </motion.div>
  );
}
