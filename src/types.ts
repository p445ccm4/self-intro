export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  details: string[];
  githubLinks?: string[];
  youtubeLinks?: string[];
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  company: string;
  period: string;
  description: string;
  details: string[];
  tech: string[];
  githubLinks?: string[];
  youtubeLinks?: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Skills {
  genAI: string[];
  mlOps: string[];
  database: string[];
  web: string[];
  devOps: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  resume: string;
  summary: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  milestones?: Milestone[];
  skills: Skills;
}
