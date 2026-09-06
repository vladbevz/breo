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
    <div className="relative mt-10 flex flex-col items-center text-center lg:mt-0">
      {/* w-fit : sans ça un span/p en display:block s'étire sur toute la largeur du
          conteneur, et le dégradé 0-100% se dilue sur cette largeur invisible au lieu
          de suivre le tracé réel du glyphe — d'où un rendu presque uniformément violet. */}
      <motion.span
        variants={graphicVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="text-signature pointer-events-none block w-fit select-none font-display text-[6rem] font-semibold leading-none sm:text-[7rem] lg:text-[8rem]"
      >
        F
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 0.5, ease: EASE_OUT_SOFT, delay: 0.45 }}
        className="text-signature -mt-2 w-fit font-display text-xl font-semibold uppercase tracking-[0.15em] sm:text-2xl lg:text-3xl"
      >
        by BREO
      </motion.p>

      <div className="mt-6 flex flex-col items-center">
        <FranceMap
          shouldReduceMotion={shouldReduceMotion}
          startDelay={0.65}
          className="h-32 w-auto sm:h-36 lg:h-40"
        />
        {trustLine ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 1.35 }}
            className="mt-3 text-center font-body text-xs uppercase tracking-[0.2em] text-bone-dim"
          >
            {trustLine}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}
