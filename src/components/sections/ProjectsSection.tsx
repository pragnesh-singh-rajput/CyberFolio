
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

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
  {
    id: '4',
    title: 'Ethical Hacking Toolkit',
    description: 'A collection of scripts and tools for penetration testing and security auditing purposes. Includes port scanners, password crackers, and vulnerability scanners.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cybersecurity tools code',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/EthicalHackingToolkit',
    tags: ['Ethical Hacking', 'Python', 'Security Tools', 'Penetration Testing'],
  },
  {
    id: '5',
    title: 'Portfolio Website (This one!)',
    description: 'A personal portfolio built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI, featuring smooth animations and a custom cursor.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'portfolio website code',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Portfolio', 
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'ShadCN UI', 'React'],
  },
  {
    id: '6',
    title: 'Cloud Security Posture Management Tool',
    description: 'A conceptual tool designed to audit cloud configurations (AWS, Azure) for security misconfigurations and compliance violations. Features automated checks and reporting.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud security dashboard',
    tags: ['Cloud Security', 'CSPM', 'AWS', 'Azure', 'Compliance'],
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainerEl, setScrollContainerEl] = useState<HTMLElement | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setScrollContainerEl(mainElement);
    cardRefs.current = cardRefs.current.slice(0, projectsData.length);
  }, []);

  const scrollToCard = useCallback((index: number) => {
    if (index < 0 || index >= projectsData.length || !scrollContainerRef.current) return;
    
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveIndex(index);
    }
  }, []);

  const updateScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const isActuallyScrollable = container.scrollWidth > container.clientWidth;
      setCanScrollLeft(isActuallyScrollable && activeIndex > 0);
      setCanScrollRight(isActuallyScrollable && activeIndex < projectsData.length - 1);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [activeIndex, projectsData.length]);

  useEffect(() => {
    updateScrollability(); 
    const container = scrollContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (container) {
      const handleScrollEvent = () => updateScrollability();
      container.addEventListener('scroll', handleScrollEvent, { passive: true });
      resizeObserver = new ResizeObserver(updateScrollability);
      resizeObserver.observe(container);
      
      updateScrollability();
    }
    
    window.addEventListener('resize', updateScrollability);
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollability);
        if (resizeObserver) {
          resizeObserver.unobserve(container);
        }
      }
      window.removeEventListener('resize', updateScrollability);
    };
  }, [updateScrollability, activeIndex, projectsData.length]);

  useEffect(() => {
    if (!scrollContainerEl || !sectionRef.current) return;

    const handleParallaxScroll = () => {
      if (!sectionRef.current || !scrollContainerEl) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.19}px) translateX(${scrollProgress * 0.06}px) rotate(${scrollProgress * 0.01}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.09}px) translateX(-${scrollProgress * 0.03}px) rotate(-${scrollProgress * 0.005}deg)`;
      }
    };

    handleParallaxScroll(); 
    scrollContainerEl.addEventListener('scroll', handleParallaxScroll, { passive: true });
    return () => {
      if (scrollContainerEl) {
        scrollContainerEl.removeEventListener('scroll', handleParallaxScroll);
      }
    };
  }, [scrollContainerEl]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background" 
    >
      <div ref={circle1Ref} className="absolute -z-10 top-[-5%] left-[-10%] w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem] bg-accent/40 rounded-full filter blur-[190px] md:blur-[250px] opacity-50 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[0%] right-[-18%] w-[30rem] h-[30rem] md:w-[42rem] md:h-[42rem] bg-secondary/45 rounded-full filter blur-[180px] md:blur-[240px] opacity-60 transition-transform duration-500 ease-out"></div>

      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security.
          </p>
        </AnimatedSection>
        
        <div className="relative w-full mt-6">
           <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={!canScrollLeft}
            aria-label="Scroll projects left"
            className={cn(
                "absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                "disabled:border-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              )}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex flex-row gap-4 md:gap-6 overflow-x-auto py-4 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {projectsData.map((project, index) => (
              <div
                key={project.id} 
                ref={(el) => cardRefs.current[index] = el}
                className={cn(
                  "flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[400px] h-full py-2",
                  "transition-all duration-500 ease-in-out transform"
                )}
              >
                <AnimatedSection 
                  animationType="scaleIn" 
                  delay={`delay-${100}` as `delay-${number}`}
                >
                  <Card className={cn(
                    "flex flex-col h-full overflow-hidden shadow-xl transition-all duration-500 ease-out bg-card/90 backdrop-blur-md border-secondary/30 group",
                     index === activeIndex 
                       ? "opacity-100 scale-100 shadow-2xl border-accent/50" 
                       : "opacity-60 scale-90 hover:opacity-80 hover:scale-[0.92]"
                  )}>
                    {project.imageUrl && (
                      <div className="relative h-48 md:h-52 w-full overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 768px) 80vw, 400px"
                          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                          data-ai-hint={project.imageHint || "technology project"}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
                      </div>
                    )}
                    <CardHeader className="pb-2 pt-4 px-4 md:px-5">
                      <CardTitle className="text-lg md:text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground min-h-[3.75rem] mt-1 leading-relaxed line-clamp-3">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow pt-2 pb-3 px-4 md:px-5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-secondary/70 text-secondary-foreground/80 border-secondary/50 px-1.5 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2.5 pt-3 pb-4 px-4 md:px-5 border-t border-border/50">
                      {project.repoUrl && (
                        <Button variant="outline" size="sm" asChild className="text-xs px-2.5 py-1 h-auto hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-200">
                          <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1.5 h-3.5 w-3.5" />
                            GitHub
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="default" size="sm" asChild className="text-xs px-2.5 py-1 h-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-200">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </AnimatedSection>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={!canScrollRight}
            aria-label="Scroll projects right"
            className={cn(
                "absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                "disabled:border-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              )}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

