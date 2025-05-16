
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
    imageHint: 'network security abstract',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/NIDS',
    tags: ['Python', 'Scapy', 'Network Security', 'IDS'],
  },
  {
    id: '2',
    title: 'Secure Web Application Firewall (WAF)',
    description: 'Designed and implemented a WAF to protect web applications from common vulnerabilities like XSS and SQL injection. Focused on rule-based filtering and anomaly detection.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'web security firewall tech',
    tags: ['Web Security', 'WAF', 'XSS', 'SQLi', 'Python'],
  },
  {
    id: '3',
    title: 'Malware Analysis Sandbox',
    description: 'Created a controlled environment for analyzing malware behavior. Implemented dynamic and static analysis techniques to understand threat capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'malware analysis code',
    tags: ['Malware Analysis', 'Reverse Engineering', 'Sandbox', 'Virtualization', 'Security Tools'],
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.21}px) translateX(${scrollProgress * 0.05}px) rotate(${scrollProgress * 0.009}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.11}px) translateX(-${scrollProgress * 0.02}px) rotate(-${scrollProgress * 0.004}deg)`;
      }
    };

    handleScroll(); 

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background" // Changed bg slightly
    >
      {/* Background Gradient Circles - increased opacity and blur */}
      <div ref={circle1Ref} className="absolute -z-10 top-[-5%] left-[-10%] w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem] bg-accent/20 rounded-full filter blur-[150px] md:blur-[210px] opacity-40 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[0%] right-[-18%] w-[30rem] h-[30rem] md:w-[42rem] md:h-[42rem] bg-secondary/25 rounded-full filter blur-[140px] md:blur-[200px] opacity-55 transition-transform duration-500 ease-out"></div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-accent/60 hover:scrollbar-thumb-accent/80 scrollbar-track-transparent pr-2 md:pr-3">
          {projectsData.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              animationType="scaleIn" 
              delay={`delay-${(index * 100) + 200}` as `delay-${number}`}
              className="h-full"
            >
              <Card className="flex flex-col h-full overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out bg-card/90 backdrop-blur-md border-secondary/30">
                {project.imageUrl && (
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      data-ai-hint={project.imageHint || "technology project"}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                )}
                <CardHeader className="pb-3 pt-5">
                  <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground min-h-[4.5rem] mt-1 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pt-2 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-secondary/70 text-secondary-foreground/80 border-secondary/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-start gap-3 pt-4 pb-5 border-t border-border/50">
                  {project.repoUrl && (
                    <Button variant="outline" size="sm" asChild className="hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-200">
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-200">
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
