export interface Personal {
  name: string;
  title: string;
  tagline?: string;
  location: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
}

export interface Social {
  platform: string;
  url: string;
  icon: "linkedin" | "github" | "mail" | "twitter" | "globe";
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  companyNote?: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
  technologies?: string[];
}

export interface Project {
  name: string;
  category?: string;
  period?: string;
  description: string;
  url?: string;
  github?: string;
  technologies: string[];
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  detail?: string;
  startDate: string;
  endDate: string;
  location?: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface Resume {
  personal: Personal;
  socials: Social[];
  about: string;
  coreStrengths?: string[];
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  achievements: string[];
}
