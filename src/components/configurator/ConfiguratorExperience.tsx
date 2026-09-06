"use client";

import dynamic from "next/dynamic";
import { ConfiguratorErrorBoundary } from "./ConfiguratorErrorBoundary";
import { CONFIGURATOR_CONTENT } from "./configurator-content";
import { useHasWebGL } from "./hooks/useHasWebGL";
import { ConfiguratorProvider } from "./state/configurator-context";
import { ControlPanel } from "./ui/ControlPanel";
import { WebglFallback } from "./ui/WebglFallback";

const Canvas3D = dynamic(() => import("./scene/Canvas3D").then((mod) => mod.Canvas3D), {
  ssr: false,
  loading: () => null,
});

export function ConfiguratorExperience() {
  const hasWebGL = useHasWebGL();

  return (
    <section className="grain relative isolate overflow-hidden bg-ink px-6 py-10 sm:px-10 lg:py-14">
      <ConfiguratorProvider>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
          <ControlPanel content={CONFIGURATOR_CONTENT} />
          <div className="relative h-85 w-full overflow-hidden rounded-3xl border border-bone/10 sm:h-105 lg:h-120">
            {hasWebGL ? (
              <ConfiguratorErrorBoundary>
                <Canvas3D />
              </ConfiguratorErrorBoundary>
            ) : (
              <WebglFallback />
            )}
          </div>
        </div>
      </ConfiguratorProvider>
    </section>
  );
}
