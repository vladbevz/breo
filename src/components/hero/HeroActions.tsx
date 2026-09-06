import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import type { HeroContent } from "./hero-content";

type HeroActionsProps = {
  primaryCta: HeroContent["primaryCta"];
  tiktokCta: HeroContent["tiktokCta"];
  actionsVariants: Variants;
};

export function HeroActions({ primaryCta, tiktokCta, actionsVariants }: HeroActionsProps) {
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
    </motion.div>
  );
}
