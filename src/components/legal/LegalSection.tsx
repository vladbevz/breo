export type LegalSectionContent = {
  heading: string;
  paragraphs: string[];
};

export function LegalSection({ heading, paragraphs }: LegalSectionContent) {
  return (
    <div className="border-t border-bone/10 pt-8">
      <h2 className="font-display text-xl font-semibold">{heading}</h2>
      <div className="mt-4 flex flex-col gap-4 font-body text-sm text-bone-dim">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
