import { motion, type Variants } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { FranceMap } from "./FranceMap";

type HeroMarkProps = {
  graphicVariants: Variants;
  shouldReduceMotion: boolean;
  trustLine?: string;
};

export function HeroMark({ graphicVariants, shouldReduceMotion, trustLine }: HeroMarkProps) {
  return (
    <div className="relative mt-16 lg:mt-0">
      <motion.span
        variants={graphicVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="text-signature pointer-events-none block select-none font-display text-[9rem] font-semibold leading-none sm:text-[12rem] lg:text-[14rem]"
      >
        F
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: EASE_OUT_SOFT, delay: 0.45 }}
        className="text-signature -mt-4 font-display text-2xl font-semibold uppercase tracking-[0.15em] sm:text-3xl lg:text-4xl"
      >
        by BREO
      </motion.p>

      <div className="mt-10">
        <FranceMap
          shouldReduceMotion={shouldReduceMotion}
          startDelay={0.65}
          className="h-48 w-auto sm:h-56 lg:h-64"
        />
        {trustLine ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 1.35 }}
            className="mt-4 font-body text-xs uppercase tracking-[0.2em] text-bone-dim"
          >
            {trustLine}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
