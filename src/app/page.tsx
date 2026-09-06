import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Services />
    </main>
  );
}
