import { useRef, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, type Variants } from "framer-motion";
import { usePointerFineHover } from "@/lib/usePointerFineHover";
import type { ServiceEntry } from "./services-content";

type ServiceCardProps = {
  service: ServiceEntry;
  cardVariants: Variants;
  shouldReduceMotion: boolean;
  className?: string;
};

const MAX_TILT_DEGREES = 6;

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord) return title;
  const index = title.indexOf(accentWord);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className="text-signature">{accentWord}</span>
      {title.slice(index + accentWord.length)}
    </>
  );
}

export function ServiceCard({ service, cardVariants, shouldReduceMotion, className }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerFine = usePointerFineHover();
  const interactive = pointerFine && !shouldReduceMotion;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 0.5 });

  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);
  const glowBackground = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgba(139,92,246,0.25), transparent 70%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 2 * MAX_TILT_DEGREES);
    rotateX.set(-(py - 0.5) * 2 * MAX_TILT_DEGREES);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function handlePointerEnter() {
    if (!interactive) return;
    glowOpacity.set(1);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  }

  const isFeatured = service.layout === "featured";
  const isWide = service.layout === "wide";
  const sizeClass = isFeatured
    ? "min-h-[280px] lg:min-h-[360px]"
    : isWide
      ? "min-h-[180px] lg:min-h-[200px]"
      : "min-h-[220px] lg:min-h-[260px]";

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      style={{
        perspective: 800,
        rotateX: interactive ? springRotateX : 0,
        rotateY: interactive ? springRotateY : 0,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft p-6 sm:p-8 ${sizeClass} ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="ring-signature pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
      />

      {interactive ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glowBackground, opacity: glowOpacity }}
        />
      ) : null}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 -right-2 select-none font-display text-[6rem] leading-none font-semibold text-bone/5 sm:text-[7rem] lg:text-[8rem]"
      >
        {service.index}
      </span>

      <div
        className={`relative z-10 flex h-full flex-col justify-between ${isWide ? "lg:flex-row lg:items-center lg:gap-8" : ""}`}
      >
        <div>
          <h3 className="font-display text-2xl font-semibold sm:text-3xl">
            {renderTitle(service.title, service.accentWord)}
          </h3>
          <p className="mt-3 max-w-md font-body text-sm text-bone-dim sm:text-base">
            {service.description}
          </p>
        </div>

        <div className={isWide ? "mt-6 lg:mt-0 lg:shrink-0" : "mt-6"}>
          <div className="flex flex-wrap gap-2">
            {service.techniques.map((technique) => (
              <span
                key={technique}
                className="rounded-full border border-bone/15 px-3 py-1 font-body text-xs text-bone-dim"
              >
                {technique}
              </span>
            ))}
          </div>
          {service.fabrics ? (
            <p className="mt-3 font-body text-xs tracking-[0.15em] text-bone-dim/70 uppercase">
              {service.fabrics}
            </p>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
