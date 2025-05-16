
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
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
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainerEl, setScrollContainerEl] = useState<HTMLElement | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setScrollContainerEl(mainElement);
  }, []);

  useEffect(() => {
    if (!scrollContainerEl || !sectionRef.current) return;

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

    scrollContainerEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainerEl.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerEl]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScrollability = () => {
      if (container) {
        const isOverflowing = container.scrollWidth > container.clientWidth;
        if (!isOverflowing) {
          setCanScrollLeft(false);
          setCanScrollRight(false);
          return;
        }
        setCanScrollLeft(container.scrollLeft > 5); // Add a small threshold
        setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth - 5)); // Add a small threshold
      }
    };

    checkScrollability();
    container.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);

    // Observe changes in children that might affect scrollWidth (e.g., if images load and change size)
    // This is more robust for dynamic content, though projectsData dependency also helps.
    const resizeObserver = new ResizeObserver(checkScrollability);
    Array.from(container.children).forEach(child => resizeObserver.observe(child));


    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
      resizeObserver.disconnect();
    };
  }, [projectsData]); // Re-run if projectsData changes (e.g., more projects added)


  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll by 80% of visible width
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background" 
    >
      <div ref={circle1Ref} className="absolute -z-10 top-[-5%] left-[-10%] w-[32rem] h-[32rem] md:w-[48rem] md:h-[48rem] bg-accent/30 rounded-full filter blur-[170px] md:blur-[230px] opacity-40 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[0%] right-[-18%] w-[30rem] h-[30rem] md:w-[42rem] md:h-[42rem] bg-secondary/35 rounded-full filter blur-[160px] md:blur-[220px] opacity-55 transition-transform duration-500 ease-out"></div>

      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-6 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security.
          </p>
        </AnimatedSection>
        
        <div className="flex justify-end gap-3 mb-6 px-4 md:px-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll projects left"
            className="rounded-full border-accent/70 text-accent hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground transition-all duration-200 ease-in-out"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll projects right"
            className="rounded-full border-accent/70 text-accent hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground transition-all duration-200 ease-in-out"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex flex-row gap-6 md:gap-8 overflow-x-auto py-4 px-4 md:px-0 scrollbar-thin scrollbar-thumb-accent/70 scrollbar-track-transparent -mx-4 md:-mx-0"
          >
            {projectsData.map((project, index) => (
              <AnimatedSection 
                key={project.id} 
                animationType="scaleIn" 
                delay={`delay-${(index * 100) + 200}` as `delay-${number}`}
                className="flex-none w-[calc(100%-2rem)] sm:w-96 md:w-[400px] h-full group"
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
            {/* Padding elements to ensure last items can be scrolled fully into view if needed for snapping, not strictly necessary without snap */}
            <div className="flex-none w-1 md:w-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

