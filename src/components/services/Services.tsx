import { ServicesGrid } from "./ServicesGrid";
import { SERVICES_CONTENT } from "./services-content";

export function Services() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink-soft px-6 py-24 sm:px-10 lg:py-32">
      <ServicesGrid content={SERVICES_CONTENT} />
    </section>
  );
}
