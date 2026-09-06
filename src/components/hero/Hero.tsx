"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  getHeroActionsVariants,
  getHeroContainerVariants,
  getHeroLineVariants,
  getHeroMarkVariants,
} from "@/lib/motion";
import { HERO_CONTENT } from "./hero-content";
import { HeroHeadline } from "./HeroHeadline";
import { HeroActions } from "./HeroActions";
import { HeroMark } from "./HeroMark";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const markY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -90]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -28]);

  const containerVariants = getHeroContainerVariants(shouldReduceMotion);
  const lineVariants = getHeroLineVariants(shouldReduceMotion);
  const actionsVariants = getHeroActionsVariants(shouldReduceMotion);
  const markVariants = getHeroMarkVariants(shouldReduceMotion);

  return (
    <section
      ref={heroRef}
      className="grain relative isolate overflow-hidden px-6 pt-28 pb-24 sm:px-10 lg:grid lg:min-h-[92vh] lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-32"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
        className="lg:col-span-7 lg:col-start-1"
      >
        <HeroHeadline content={HERO_CONTENT} lineVariants={lineVariants} />
        <HeroActions
          primaryCta={HERO_CONTENT.primaryCta}
          tiktokCta={HERO_CONTENT.tiktokCta}
          actionsVariants={actionsVariants}
        />
      </motion.div>

      <div className="lg:col-span-6 lg:col-start-8 lg:-mr-10 xl:-mr-24">
        <motion.div style={{ y: markY }}>
          <HeroMark
            graphicVariants={markVariants}
            shouldReduceMotion={shouldReduceMotion}
            trustLine={HERO_CONTENT.trustLine}
          />
        </motion.div>
      </div>
    </section>
  );
}
