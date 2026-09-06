import { motion, type Variants } from "framer-motion";
import { FRANCE_DEPARTMENTS, FRANCE_VIEWBOX } from "@/lib/france-map";
import { EASE_OUT_SOFT } from "@/lib/motion";

type FranceMapProps = {
  shouldReduceMotion: boolean;
  className?: string;
  startDelay?: number;
};

// Couleurs du dégradé signature dupliquées ici (les attributs de présentation SVG
// comme stop-color n'interprètent pas var(--...) issu de globals.css).
const GRADIENT_STOPS = [
  { offset: "0%", color: "#8b5cf6" },
  { offset: "52%", color: "#d6318f" },
  { offset: "100%", color: "#ff8a3c" },
];

const groupVariants = (shouldReduceMotion: boolean, startDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: shouldReduceMotion
      ? { duration: 0.4, ease: EASE_OUT_SOFT, delay: startDelay }
      : { staggerChildren: 0.004, delayChildren: startDelay },
  },
});

const departmentVariants = (shouldReduceMotion: boolean): Variants =>
  shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT_SOFT } },
      }
    : {
        hidden: { opacity: 0, scale: 0.86 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.32, ease: EASE_OUT_SOFT },
        },
      };

export function FranceMap({ shouldReduceMotion, className, startDelay = 0 }: FranceMapProps) {
  return (
    <svg viewBox={FRANCE_VIEWBOX} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="france-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          {GRADIENT_STOPS.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
      </defs>
      <motion.g
        initial="hidden"
        animate="visible"
        variants={groupVariants(shouldReduceMotion, startDelay)}
        stroke="#0a0a0d"
        strokeWidth={1.4}
        strokeLinejoin="round"
      >
        {FRANCE_DEPARTMENTS.map((department) => (
          <motion.path
            key={department.id}
            d={department.path}
            fill="url(#france-gradient)"
            variants={departmentVariants(shouldReduceMotion)}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </motion.g>
    </svg>
  );
}
