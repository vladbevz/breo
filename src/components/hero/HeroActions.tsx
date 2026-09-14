import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { TikTokGlitchIcon } from "@/components/icons/TikTokGlitchIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { SocialButton } from "@/components/social/SocialButton";
import type { HeroContent } from "./hero-content";

type HeroActionsProps = {
  primaryCta: HeroContent["primaryCta"];
  tiktokCta: HeroContent["tiktokCta"];
  instagramCta: HeroContent["instagramCta"];
  actionsVariants: Variants;
};

export function HeroActions({ primaryCta, tiktokCta, instagramCta, actionsVariants }: HeroActionsProps) {
  return (
    <motion.div variants={actionsVariants} className="mt-10 flex flex-wrap items-center gap-5">
      <Link
        href={primaryCta.href}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02]"
      >
        <span className="absolute inset-0 rule-signature" aria-hidden="true" />
        <span className="relative">{primaryCta.label}</span>
      </Link>

      <SocialButton href={tiktokCta.href} label={tiktokCta.label} icon={<TikTokGlitchIcon />} />
      <SocialButton
        href={instagramCta.href}
        label={instagramCta.label}
        icon={<InstagramIcon className="h-4 w-4 shrink-0" gradient={Boolean(instagramCta.href)} />}
      />
    </motion.div>
  );
}
