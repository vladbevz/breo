import type { ContactContent } from "./contact-content";

type ContactIntroProps = {
  content: Pick<ContactContent, "eyebrow" | "heading" | "intro" | "reassurance">;
};

export function ContactIntro({ content }: ContactIntroProps) {
  return (
    <div>
      <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
        <span className="h-px w-8 rule-signature" aria-hidden="true" />
        {content.eyebrow}
      </p>

      <h2 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">
        {content.heading.map((segment, index) => (
          <span key={index} className={segment.accent ? "text-signature" : undefined}>
            {segment.text}
          </span>
        ))}
      </h2>

      <p className="mt-6 max-w-sm font-body text-base text-bone-dim">{content.intro}</p>

      <ul className="mt-8 flex flex-col gap-3">
        {content.reassurance.map((line) => (
          <li key={line} className="flex items-start gap-3 font-body text-sm text-bone-dim">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full rule-signature" aria-hidden="true" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
