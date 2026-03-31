export interface Profile {
  name: string;
  avatar: string;
  birthDate: string;
  location: string;
  phone: string;
  email: string;
  university: string;
  major?: string;
  languages: { name: string; level?: string }[];
  linkedin?: string;
  github?: string;
  facebook?: string;
  tiktok?: string;
  instagram?: string;
  threads?: string;
  softSkills: string[];
  technicalSkills: string[];
  careerGoal?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  techStack?: string[];
  details?: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  repo?: string;
  details?: string[];
}
