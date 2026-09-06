"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  getServiceCardVariants,
  getServicesContainerVariants,
  getServicesHeadingVariants,
} from "@/lib/motion";
import { ServiceCard } from "./ServiceCard";
import type { ServicesContent } from "./services-content";

type ServicesGridProps = {
  content: ServicesContent;
};

export function ServicesGrid({ content }: ServicesGridProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const headingVariants = getServicesHeadingVariants(shouldReduceMotion);
  const containerVariants = getServicesContainerVariants(shouldReduceMotion);
  const cardVariants = getServiceCardVariants(shouldReduceMotion);

  const byId = Object.fromEntries(content.services.map((service) => [service.id, service]));

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={headingVariants}
        className="lg:grid lg:grid-cols-12 lg:items-end lg:gap-6"
      >
        <div className="lg:col-span-8">
          <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
            <span className="h-px w-8 rule-signature" aria-hidden="true" />
            {content.eyebrow}
          </p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            {content.heading.map((segment, index) => (
              <span key={index} className={segment.accent ? "text-signature" : undefined}>
                {segment.text}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-xl font-body text-lg text-bone-dim">{content.intro}</p>
        </div>

        <div className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:text-right">
          <span className="ml-auto block h-px w-12 rule-signature" aria-hidden="true" />
          <p className="mt-4 font-body text-sm text-bone-dim">{content.note}</p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6"
      >
        <ServiceCard
          service={byId.flocage}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-7"
        />
        <ServiceCard
          service={byId.flex}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-5"
        />
        <ServiceCard
          service={byId.sublimation}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-5"
        />
        <ServiceCard
          service={byId.broderie}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-4"
        />
        <ServiceCard
          service={byId.travail}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-3"
        />
        <ServiceCard
          service={byId.evenementiel}
          cardVariants={cardVariants}
          shouldReduceMotion={shouldReduceMotion}
          className="lg:col-span-12"
        />
      </motion.div>
    </>
  );
}
