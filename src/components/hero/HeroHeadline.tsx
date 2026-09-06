import { motion, type Variants } from "framer-motion";
import type { HeroContent } from "./hero-content";

type HeroHeadlineProps = {
  content: Pick<HeroContent, "eyebrow" | "headline" | "subheadline">;
  lineVariants: Variants;
};

export function HeroHeadline({ content, lineVariants }: HeroHeadlineProps) {
  return (
    <div>
      <p className="flex items-center gap-3 font-body text-xs uppercase tracking-[0.3em] text-bone-dim">
        <span className="h-px w-8 rule-signature" aria-hidden="true" />
        {content.eyebrow}
      </p>

      <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
        {content.headline.map((line, lineIndex) => (
          <span key={lineIndex} className="block overflow-hidden">
            <motion.span variants={lineVariants} className="block">
              {line.map((segment, segmentIndex) => (
                <span key={segmentIndex} className={segment.accent ? "text-signature" : undefined}>
                  {segment.text}
                </span>
              ))}
            </motion.span>
          </span>
        ))}
      </h1>

      <p className="mt-6 max-w-md font-body text-lg text-bone-dim">{content.subheadline}</p>
    </div>
  );
}
