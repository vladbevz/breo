"use client";

import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/motion";
import { NAV_ITEMS } from "./nav-content";
import { useActiveSection } from "./useActiveSection";

const IDS = NAV_ITEMS.map((item) => item.id);

export function SideNav() {
  const activeId = useActiveSection(IDS);
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeId),
  );
  const fillHeight = NAV_ITEMS.length > 1 ? (activeIndex / (NAV_ITEMS.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Navigation de la page" className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 lg:block">
      <div className="relative flex flex-col items-end gap-8">
        <span className="absolute top-1 right-[3px] bottom-1 w-px bg-bone/15" aria-hidden="true" />
        <motion.span
          className="absolute top-1 right-[3px] w-px rule-signature"
          aria-hidden="true"
          initial={false}
          animate={{ height: `${fillHeight}%` }}
          transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
        />

        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <a key={item.id} href={item.href} className="group relative flex items-center gap-3">
              <span
                className={`font-body text-[11px] tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300 ${
                  isActive ? "text-signature" : "text-bone-dim group-hover:text-bone"
                }`}
              >
                {item.label}
              </span>
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full transition-transform duration-300 ${
                  isActive ? "rule-signature scale-125" : "bg-bone/30"
                }`}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
