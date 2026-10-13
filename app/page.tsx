import { About } from "@/components/about/About";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/contact/Footer";
import { CircuitTimeline } from "@/components/experience/CircuitTimeline";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { PageMotion } from "@/components/motion/PageMotion";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StackExplorer } from "@/components/stack/StackExplorer";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stats } from "@/components/ui/Stats";
import { BentoGrid } from "@/components/work/BentoGrid";
import { CaseFileController } from "@/components/work/CaseFile";
import { HackathonRun } from "@/components/work/HackathonRun";
import { featured } from "@/content/projects";
import { publicAsset } from "@/lib/assets";

const container = "mx-auto max-w-6xl px-4 sm:px-6";
const section = `${container} scroll-mt-16 py-24 sm:py-32`;

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main id="top">
        <div className={container}>
          <Hero />
          <Stats />
        </div>
        <div className="mt-16">
          <Marquee />
        </div>

        <section id="work" className={section}>
          <SectionLabel index={1} label="work" title="Selected work" annotation="← 3 of 6 builds" />
          <BentoGrid />
          <HackathonRun />
        </section>

        <section id="experience" className={section}>
          <SectionLabel index={2} label="experience" title="Where I've shipped" />
          <CircuitTimeline />
        </section>

        <section id="stack" className={section}>
          <SectionLabel index={3} label="stack" title="Toolbox" />
          <StackExplorer />
        </section>

        <section id="about" className={section}>
          <SectionLabel index={4} label="about" title="About" />
          <About />
        </section>

        <section id="contact" className={section}>
          <SectionLabel index={5} label="contact" />
          <Contact />
        </section>
      </main>
      <Footer />
      <CaseFileController projects={featured.map((p) => ({ ...p, imageSrc: publicAsset(p.image) }))} />
      <PageMotion />
    </>
  );
}
