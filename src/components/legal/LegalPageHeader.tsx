type LegalPageHeaderProps = {
  eyebrow: string;
  heading: string;
  intro: string;
};

export function LegalPageHeader({ eyebrow, heading, intro }: LegalPageHeaderProps) {
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
        <span className="h-px w-8 rule-signature" aria-hidden="true" />
        {eyebrow}
      </p>

      <h1 className="mt-6 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl">{heading}</h1>

      <p className="mt-6 font-body text-base text-bone-dim">{intro}</p>
    </div>
  );
}
