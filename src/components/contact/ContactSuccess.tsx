import { motion, type Variants } from "framer-motion";
import type { ContactContent } from "./contact-content";

type ContactSuccessProps = {
  content: ContactContent["success"];
  checkmarkVariants: Variants;
};

export function ContactSuccess({ content, checkmarkVariants }: ContactSuccessProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
        <defs>
          <linearGradient id="contact-success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="52%" stopColor="#d6318f" />
            <stop offset="100%" stopColor="#ff8a3c" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="29" fill="none" stroke="rgba(242,239,233,0.15)" strokeWidth="3" />
        <motion.circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke="url(#contact-success-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          variants={checkmarkVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M20 33 L28 41 L45 24"
          fill="none"
          stroke="url(#contact-success-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkmarkVariants}
          initial="hidden"
          animate="visible"
        />
      </svg>

      <div>
        <p className="font-display text-2xl font-semibold">{content.heading}</p>
        <p className="mt-2 max-w-sm font-body text-sm text-bone-dim">{content.body}</p>
      </div>
    </div>
  );
}
