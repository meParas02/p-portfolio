import resume from "@/data/resume.json";
import type { NavSection, Resume } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const data = resume as Resume;

export default function Home() {
  const sections = [
    data.experience.length > 0 && { id: "experience", label: "Experience" },
    data.projects.length > 0 && { id: "projects", label: "Work" },
    data.skills.length > 0 && { id: "skills", label: "Stack" },
    (data.education.length > 0 || data.certifications.length > 0) && {
      id: "education",
      label: "Education",
    },
    { id: "contact", label: "Contact" },
  ].filter((s): s is NavSection => Boolean(s));

  return (
    <>
      <Navbar name={data.personal.name} sections={sections} resumeUrl={data.personal.resumeUrl} />
      <main>
        <Hero personal={data.personal} />
        <Experience items={data.experience} strengths={data.coreStrengths} />
        <Projects items={data.projects} />
        <Skills groups={data.skills} />
        <Education
          items={data.education}
          certifications={data.certifications}
          achievements={data.achievements}
        />
        <Contact personal={data.personal} socials={data.socials} />
      </main>
      <Footer personal={data.personal} />
    </>
  );
}
