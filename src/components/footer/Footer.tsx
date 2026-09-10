"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { getFooterVariants } from "@/lib/motion";
import { FOOTER_CONTENT } from "./footer-content";
import logoMark from "../../../public/logo-mark.png";

export function Footer() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const footerVariants = getFooterVariants(shouldReduceMotion);
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
      className="grain relative isolate overflow-hidden bg-ink-soft px-6 py-16 sm:px-10 lg:pr-28"
    >
      <div className="max-w-6xl lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <Image src={logoMark} alt="Flocage By Breo" className="h-10 w-auto" />
          <p className="mt-5 max-w-xs font-body text-sm text-bone-dim">{FOOTER_CONTENT.tagline}</p>
          <Link
            href={FOOTER_CONTENT.tiktokHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 font-body text-sm font-medium text-bone transition-colors duration-300 hover:text-signature"
          >
            <span className="relative inline-flex h-4 w-4 shrink-0" aria-hidden="true">
              <TikTokIcon className="absolute inset-0 h-4 w-4 translate-x-[-1.5px] -translate-y-px text-[#25f4ee]" />
              <TikTokIcon className="absolute inset-0 h-4 w-4 translate-x-[1.5px] translate-y-px text-[#fe2c55]" />
              <TikTokIcon className="relative h-4 w-4 text-bone" />
            </span>
            Suivez-nous sur TikTok
          </Link>
        </div>

        <nav aria-label="Navigation" className="mt-12 lg:col-span-3 lg:col-start-7 lg:mt-0">
          <p className="font-body text-xs tracking-[0.3em] text-bone-dim/70 uppercase">Navigation</p>
          <ul className="mt-5 flex flex-col gap-3">
            {FOOTER_CONTENT.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales" className="mt-12 lg:col-span-3 lg:col-start-10 lg:mt-0">
          <p className="font-body text-xs tracking-[0.3em] text-bone-dim/70 uppercase">Légal</p>
          <ul className="mt-5 flex flex-col gap-3">
            {FOOTER_CONTENT.legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-16 max-w-6xl border-t border-bone/10 pt-6">
        <div className="flex flex-col gap-2 font-body text-xs text-bone-dim/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Flocage By Breo. Tous droits réservés.</p>
          <Link
            href={FOOTER_CONTENT.mapCredit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-bone-dim"
          >
            {FOOTER_CONTENT.mapCredit.label}
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
