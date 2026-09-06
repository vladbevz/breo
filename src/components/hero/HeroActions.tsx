import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import type { HeroContent } from "./hero-content";

type HeroActionsProps = {
  primaryCta: HeroContent["primaryCta"];
  secondaryCta?: HeroContent["secondaryCta"];
  trustLine?: HeroContent["trustLine"];
  actionsVariants: Variants;
};

export function HeroActions({
  primaryCta,
  secondaryCta,
  trustLine,
  actionsVariants,
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
      </div>

      {trustLine ? (
        <p className="font-body text-xs uppercase tracking-[0.2em] text-bone-dim">{trustLine}</p>
      ) : null}
    </motion.div>
  );
}
