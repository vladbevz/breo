import Link from "next/link";
import type { ConfiguratorContent } from "../configurator-content";
import { ColorPicker } from "./ColorPicker";
import { LogoUploader } from "./LogoUploader";
import { TransformControls } from "./TransformControls";

type ControlPanelProps = {
  content: ConfiguratorContent;
};

export function ControlPanel({ content }: ControlPanelProps) {
  return (
    <div className="flex w-full flex-col gap-8 lg:w-80 lg:shrink-0">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-xs text-bone-dim underline decoration-bone-dim underline-offset-4 transition-colors duration-300 hover:decoration-orange"
        >
          ← Retour à l&apos;accueil
        </Link>

        <p className="mt-6 flex items-center gap-3 font-body text-xs tracking-[0.3em] text-bone-dim uppercase">
          <span className="h-px w-8 rule-signature" aria-hidden="true" />
          {content.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl leading-[1.05] font-semibold sm:text-4xl">
          {content.title}
        </h1>
        <p className="mt-3 font-body text-sm text-bone-dim">{content.instructions}</p>
      </div>

      <ColorPicker />
      <LogoUploader />
      <TransformControls />
    </div>
  );
}
