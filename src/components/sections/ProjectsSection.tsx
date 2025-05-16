import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Network Intrusion Detection System',
    description: 'Developed a Python-based NIDS to monitor network traffic for suspicious activities and generate alerts. Utilized Scapy for packet manipulation and analysis.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'network security',
    repoUrl: '#',
    tags: ['Python', 'Scapy', 'Network Security', 'IDS'],
  },
  {
    id: '2',
    title: 'Secure Web Application Firewall (WAF)',
    description: 'Designed and implemented a WAF to protect web applications from common vulnerabilities like XSS and SQL injection. Focused on rule-based filtering and anomaly detection.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'web security firewall',
    repoUrl: '#',
    liveUrl: '#',
    tags: ['Web Security', 'WAF', 'XSS', 'SQL Injection'],
  },
  {
    id: '3',
    title: 'Malware Analysis Sandbox',
    description: 'Created a controlled environment for analyzing malware behavior. Implemented dynamic and static analysis techniques to understand threat capabilities.',
    // No image for this one to demonstrate layout flexibility
    imageHint: 'malware analysis',
    repoUrl: '#',
    tags: ['Malware Analysis', 'Reverse Engineering', 'Sandbox'],
  },
];

export default function ProjectsSection() {
  return (
    <div id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection delay="delay-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">My Projects</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A selection of projects I&apos;ve worked on, showcasing my skills in cyber security.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <AnimatedSection key={project.id} delay={`delay-${(index + 1) * 100}` as `delay-${number}`}>
              <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {project.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                      data-ai-hint={project.imageHint || "technology project"}
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground min-h-[3rem]">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-start gap-2 pt-4 border-t">
                  {project.repoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
