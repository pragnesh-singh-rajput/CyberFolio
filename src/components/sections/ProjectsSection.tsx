
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'Network Intrusion Detection System',
    description: 'Developed a Python-based NIDS to monitor network traffic for suspicious activities and generate alerts. Utilized Scapy for packet manipulation and analysis.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'network security',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/NIDS',
    tags: ['Python', 'Scapy', 'Network Security', 'IDS'],
  },
  {
    id: '2',
    title: 'Secure Web Application Firewall (WAF)',
    description: 'Designed and implemented a WAF to protect web applications from common vulnerabilities like XSS and SQL injection. Focused on rule-based filtering and anomaly detection.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'web security firewall',
    tags: ['Web Security', 'WAF', 'XSS', 'SQL Injection', 'Python'],
  },
  {
    id: '3',
    title: 'Malware Analysis Sandbox',
    description: 'Created a controlled environment for analyzing malware behavior. Implemented dynamic and static analysis techniques to understand threat capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'malware analysis cyber',
    tags: ['Malware Analysis', 'Reverse Engineering', 'Sandbox', 'Virtualization'],
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.2}px)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.1}px)`;
      }
    };

    handleScroll(); // Initial call

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5"
    >
      {/* Background Gradient Circles */}
      <div ref={circle1Ref} className="absolute -z-10 top-[-5%] left-[-10%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-accent/25 rounded-full filter blur-[110px] md:blur-[170px] opacity-35"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[0%] right-[-18%] w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] bg-secondary/30 rounded-full filter blur-[100px] md:blur-[160px] opacity-45"></div>

      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent pr-2">
          {projectsData.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              animationType="scaleIn" 
              delay={`delay-${(index * 100) + 200}` as `delay-${number}`}
            >
              <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
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
                  <CardDescription className="text-sm text-muted-foreground min-h-[4.5rem]">{project.description}</CardDescription>
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
    </section>
  );
}
