
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
