import { Hero } from "@/components/hero/Hero";
import { ConfiguratorTeaser } from "@/components/configurator-teaser/ConfiguratorTeaser";
import { Services } from "@/components/services/Services";
import { Contact } from "@/components/contact/Contact";
import { SideNav } from "@/components/nav/SideNav";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SideNav />
      <Hero />
      <ConfiguratorTeaser />
      <Services />
      <Contact />
    </main>
  );
}
