import { CONTACT_CONTENT } from "./contact-content";
import { ContactSection } from "./ContactSection";

export function Contact() {
  return (
    <section
      id="contact"
      className="grain relative isolate overflow-hidden bg-ink px-6 py-24 sm:px-10 lg:py-32 lg:pr-28"
    >
      <div className="max-w-6xl">
        <ContactSection content={CONTACT_CONTENT} />
      </div>
    </section>
  );
}
