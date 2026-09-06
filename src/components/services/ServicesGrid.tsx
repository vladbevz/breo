"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { getServiceCardVariants, getServicesContainerVariants, getServicesHeadingVariants } from "@/lib/motion";
import type { PriceCategory, ServicesContent } from "./services-content";

type ServicesGridProps = {
  content: ServicesContent;
};

function PriceList({ category, rowVariants }: { category: PriceCategory; rowVariants: Variants }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold">{category.title}</h3>
      <span className="mt-2 block h-px w-10 rule-signature" aria-hidden="true" />

      <ul className="mt-6 flex flex-col">
        {category.items.map((item) => (
          <motion.li
            key={item.label}
            variants={rowVariants}
            className="flex items-baseline justify-between gap-4 border-b border-bone/10 py-4"
          >
            <span className="font-body text-base text-bone">{item.label}</span>
            <span className="font-display text-lg font-semibold text-bone">{item.price}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesGrid({ content }: ServicesGridProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const headingVariants = getServicesHeadingVariants(shouldReduceMotion);
  const containerVariants = getServicesContainerVariants(shouldReduceMotion);
  const rowVariants = getServiceCardVariants(shouldReduceMotion);

  const [textiles, logo] = content.categories;

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={headingVariants}
      >
        <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
          <span className="h-px w-8 rule-signature" aria-hidden="true" />
          {content.eyebrow}
        </p>
        <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
          {content.heading.map((segment, index) => (
            <span key={index} className={segment.accent ? "text-signature" : undefined}>
              {segment.text}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-md font-body text-lg text-bone-dim">{content.intro}</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <PriceList category={textiles} rowVariants={rowVariants} />
        </div>

        <div className="lg:col-span-5">
          <PriceList category={logo} rowVariants={rowVariants} />

          <div className="mt-10 flex flex-col gap-3">
            {content.footnotes.map((note) => (
              <p key={note} className="flex items-start gap-3 font-body text-sm text-bone-dim">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full rule-signature" aria-hidden="true" />
                {note}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
