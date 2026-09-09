import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { FranceMap } from "./FranceMap";
import logoMark from "../../../public/logo-mark.png";

type HeroMarkProps = {
  graphicVariants: Variants;
  shouldReduceMotion: boolean;
  trustLine?: string;
};

export function HeroMark({ graphicVariants, shouldReduceMotion, trustLine }: HeroMarkProps) {
  return (
    // Mobile (<lg) : F + carte côte à côte sur une ligne ; desktop (lg+) : empilement
    // vertical centré classique. `lg:contents` fait disparaître les deux wrappers en
    // lg+ pour que leurs enfants réintègrent directement le flow vertical du parent.
    <div className="relative mt-10 flex flex-row items-start justify-center gap-6 lg:mt-0 lg:flex-col lg:items-center lg:text-center">
      <div className="flex flex-1 flex-col items-center lg:contents">
        <motion.div
          variants={graphicVariants}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
          className="pointer-events-none w-fit select-none"
        >
          <Image
            src={logoMark}
            alt=""
            priority
            className="h-18 w-auto sm:h-24 lg:h-32"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: EASE_OUT_SOFT, delay: 0.45 }}
          className="text-signature -mt-1 w-fit font-display text-base font-semibold tracking-[0.1em] uppercase sm:text-xl lg:-mt-2 lg:text-3xl lg:tracking-[0.15em]"
        >
          by BREO
        </motion.p>
      </div>

      <div className="mt-1 flex flex-1 flex-col items-center lg:contents">
        <FranceMap
          shouldReduceMotion={shouldReduceMotion}
          startDelay={0.65}
          className="h-24 w-auto sm:h-28 lg:mt-6 lg:h-40"
        />
        {trustLine ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 1.35 }}
            className="mt-3 text-center font-body text-xs tracking-[0.2em] text-bone-dim uppercase"
          >
            {trustLine}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
