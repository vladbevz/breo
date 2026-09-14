"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getServicesHeadingVariants } from "@/lib/motion";
import { CONFIGURATOR_TEASER_CONTENT } from "./configurator-teaser-content";

export function ConfiguratorTeaser() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const headingVariants = getServicesHeadingVariants(shouldReduceMotion);
  const { eyebrow, heading, body, cta, caption } = CONFIGURATOR_TEASER_CONTENT;

  return (
    <section className="grain relative isolate overflow-hidden px-6 py-20 sm:px-10 lg:py-28 lg:pr-28">
      <div className="max-w-6xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headingVariants}
          className="lg:col-span-7"
        >
          <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
            <span className="h-px w-8 rule-signature" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
            {heading.map((segment, index) => (
              <span key={index} className={segment.accent ? "text-signature" : undefined}>
                {segment.text}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md font-body text-base text-bone-dim">{body}</p>

          <Link
            href={cta.href}
            className="group relative mt-8 inline-flex items-center gap-2 rounded-full border border-bone/20 px-7 py-3 font-body text-sm font-medium text-bone transition-colors duration-300 hover:border-transparent"
          >
            <span
              className="ring-signature pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="relative h-1.5 w-1.5 shrink-0 rounded-full rule-signature" aria-hidden="true" />
            <span className="relative">{cta.label}</span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={headingVariants}
          className="mt-14 flex flex-col items-center text-center lg:col-span-4 lg:col-start-9 lg:mt-0"
        >
          <span
            aria-hidden="true"
            className="text-signature block w-fit font-display text-[6rem] leading-none font-semibold sm:text-[8rem]"
          >
            3D
          </span>
          <p className="mt-3 font-body text-xs tracking-[0.2em] text-bone-dim uppercase">{caption}</p>
        </motion.div>
      </div>
    </section>
  );
}
