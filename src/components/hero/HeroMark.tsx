import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";

type HeroMarkProps = {
  graphicVariants: Variants;
};

export function HeroMark({ graphicVariants }: HeroMarkProps) {
  return (
    <div className="relative mt-16 lg:mt-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.1 }}
        className="flex items-center gap-4"
      >
        <Image
          src="/logo.jpg"
          alt="Logo Flocage By Breo"
          width={180}
          height={160}
          quality={100}
          priority
          className="h-auto w-[130px] sm:w-[150px]"
        />
      </motion.div>

      <motion.span
        variants={graphicVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        className="text-signature pointer-events-none mt-2 block select-none font-display text-[11rem] font-semibold leading-none sm:text-[15rem] lg:text-[18rem]"
      >
        F
      </motion.span>
    </div>
  );
}
