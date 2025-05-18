
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  repoUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export interface NavItem {
  id: string; // Added id for easier mapping and observation
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  duration: string;
  location?: string;
  description: string[];
  logoUrl?: string;
  imageHint?: string;
}

export interface TechSkill {
  id: string;
  name: string;
  icon?: React.ComponentType<{ className?: string }>;
  category: string; // e.g., 'Languages', 'Frameworks & Libraries', 'Databases', 'Tools & Platforms', 'Cybersecurity'
  proficiency?: number; // Optional: 1-100 for a progress bar
}

export interface OtherSkill {
  id: string;
  name: string;
  description?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate?: string;
  expirationDate?: string; // Optional
  credentialId?: string; // Optional
  credentialUrl?: string; // Optional
  logoUrl?: string; // Optional
  imageHint?: string;
  description?: string; // Added description field
}

