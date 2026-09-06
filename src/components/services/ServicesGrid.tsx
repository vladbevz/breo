"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { getServiceCardVariants, getServicesContainerVariants, getServicesHeadingVariants } from "@/lib/motion";
import type { PriceEntry, ServicesContent } from "./services-content";

type ServicesGridProps = {
  content: ServicesContent;
};

function PriceRow({ item, rowVariants }: { item: PriceEntry; rowVariants: Variants }) {
  return (
    <motion.li
      variants={rowVariants}
      className="group relative flex items-baseline justify-between gap-4 border-b border-bone/10 py-4 pl-4"
    >
      <span
        className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 rule-signature transition-transform duration-300 ease-out group-hover:scale-y-100"
        aria-hidden="true"
      />
      <span className="font-body text-base text-bone">{item.label}</span>
      <span className="bg-clip-text font-display text-lg font-semibold text-bone transition-colors duration-300 group-hover:bg-[linear-gradient(100deg,#8b5cf6_0%,#d6318f_52%,#ff8a3c_100%)] group-hover:text-transparent">
        {item.price}
      </span>
    </motion.li>
  );
}

export function ServicesGrid({ content }: ServicesGridProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const headingVariants = getServicesHeadingVariants(shouldReduceMotion);
  const containerVariants = getServicesContainerVariants(shouldReduceMotion);
  const rowVariants = getServiceCardVariants(shouldReduceMotion);

  const [textiles, logo] = content.categories;
  const midpoint = Math.ceil(textiles.items.length / 2);
  const textilesLeft = textiles.items.slice(0, midpoint);
  const textilesRight = textiles.items.slice(midpoint);

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
        className="mt-14 flex flex-col gap-16"
      >
        <div>
          <h3 className="font-display text-2xl font-semibold">{textiles.title}</h3>
          <span className="mt-2 block h-px w-10 rule-signature" aria-hidden="true" />

          <div className="mt-6 grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            <ul className="flex flex-col">
              {textilesLeft.map((item) => (
                <PriceRow key={item.label} item={item} rowVariants={rowVariants} />
              ))}
            </ul>
            <ul className="flex flex-col">
              {textilesRight.map((item) => (
                <PriceRow key={item.label} item={item} rowVariants={rowVariants} />
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-xl">
          <h3 className="font-display text-2xl font-semibold">{logo.title}</h3>
          <span className="mt-2 block h-px w-10 rule-signature" aria-hidden="true" />

          <ul className="mt-6 flex flex-col">
            {logo.items.map((item) => (
              <PriceRow key={item.label} item={item} rowVariants={rowVariants} />
            ))}
          </ul>

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
