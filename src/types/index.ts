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
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}
