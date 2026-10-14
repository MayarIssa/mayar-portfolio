import { Certificates } from "@/components/Certificates";
import { Hero } from "@/components/Hero";
import { Contact, Experience, Process, SiteHeader, StackMarquee, VisitorCursor } from "@/components/Sections";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <VisitorCursor />
      <main>
        <Hero />
        <StackMarquee />
        <Work />
        <Process />
        <Experience />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
