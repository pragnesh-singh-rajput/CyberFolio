
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'; // Added missing import
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const projectsData: Project[] = [
  {
    id: 'proj-cyberconnect',
    title: 'CyberConnect-AI',
    description: 'An AI-powered tool for targeted cold mailing campaigns and scraping recruiter information from LinkedIn, enhancing job outreach efficiency. Built with Next.js and Python.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ai outreach',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/CyberConnect-AI',
    tags: ['AI', 'Recruitment', 'Web Scraping', 'Next.js', 'Python', 'Automation'],
  },
  {
    id: 'proj-absconders',
    title: 'Absconders Portal',
    description: 'A web portal designed for law enforcement or security agencies to track and manage information about absconders, enhancing operational efficiency.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'security law',
    repoUrl: "https://github.com/pragnesh-singh-rajput/absconders-portal",
    tags: ['Web App', 'PHP', 'MySQL', 'Data Management', 'Security'],
  },
  {
    id: 'proj-sharencrypt',
    title: 'Sharencrypt P2P File Sharing',
    description: 'A secure peer-to-peer file sharing application developed with Python, focusing on data encryption and user privacy during transit.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'p2p security',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Sharenrypt-p2p-file-sharing',
    tags: ['P2P', 'File Sharing', 'Python', 'Encryption', 'Networking', 'Security'],
  },
  {
    id: 'proj-twitterbot',
    title: 'Twitter News Bot',
    description: 'An automated Python bot that fetches news from various sources and tweets updates, utilizing the Twitter API and web scraping techniques.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'twitter news bot',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Twitter-News-Bot',
    tags: ['Bot', 'Python', 'Twitter API', 'Web Scraping', 'Automation'],
  },
  {
    id: 'proj-awsrekognition',
    title: 'Image & Video Rekognition with AWS',
    description: 'A project leveraging AWS Rekognition for advanced image and video analysis, demonstrating cloud-based computer vision capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'aws cloud vision',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/image-and-video-rekognition-with-aws',
    tags: ['AWS', 'Rekognition', 'Cloud AI', 'Computer Vision', 'Python'],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website (This one!)',
    description: 'My personal portfolio built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI, featuring smooth animations, parallax effects, and a custom cursor.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'portfolio web design',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Portfolio',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'ShadCN UI', 'React', 'Framer Motion'],
  },
];

const duplicatedProjects = [...projectsData, ...projectsData];

const baseAutoScrollSpeed = 1.0;
const hoverInducedSpeed = 2.0;
const neutralZonePercentage = 0.2; // 20% of the container width

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxAnimationFrameIdRef = useRef<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollFrameIdRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const scrollSpeedRef = useRef(baseAutoScrollSpeed);
  const currentScrollLeftRef = useRef(0);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setParallaxScrollContainer(mainElement);
  }, []);

  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;
    const parallaxUpdateRef = parallaxAnimationFrameIdRef;

    const performParallaxUpdate = () => {
      if (!sectionRef.current || !parallaxScrollContainer) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.45}px) translateX(${scrollProgress * 0.22}px) rotate(${scrollProgress * 0.022}deg) scale(1.35)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.28}px) translateX(-${scrollProgress * 0.18}px) rotate(-${scrollProgress * 0.016}deg) scale(1.3)`;
      }
      parallaxUpdateRef.current = null;
    };
    const handleParallaxScroll = () => {
      if (parallaxUpdateRef.current) cancelAnimationFrame(parallaxUpdateRef.current);
      parallaxUpdateRef.current = requestAnimationFrame(performParallaxUpdate);
    };
    if (parallaxScrollContainer){
        handleParallaxScroll();
        parallaxScrollContainer.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }
    return () => {
      if (parallaxScrollContainer) parallaxScrollContainer.removeEventListener('scroll', handleParallaxScroll);
      if (parallaxUpdateRef.current) cancelAnimationFrame(parallaxUpdateRef.current);
    };
  }, [parallaxScrollContainer]);

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement || duplicatedProjects.length === 0) return;

    currentScrollLeftRef.current = scrollElement.scrollLeft;

    const animateScroll = () => {
      if (!scrollElement) {
        if (autoScrollFrameIdRef.current) cancelAnimationFrame(autoScrollFrameIdRef.current);
        autoScrollFrameIdRef.current = requestAnimationFrame(animateScroll);
        return;
      }
      
      const currentAppliedSpeed = isHoveringRef.current ? scrollSpeedRef.current : baseAutoScrollSpeed;
      currentScrollLeftRef.current += currentAppliedSpeed;
      
      const singleSetWidth = scrollElement.scrollWidth / 2;

      if (currentAppliedSpeed > 0 && currentScrollLeftRef.current >= singleSetWidth && singleSetWidth > 0) {
        currentScrollLeftRef.current -= singleSetWidth;
      } else if (currentAppliedSpeed < 0 && currentScrollLeftRef.current <= 0 && singleSetWidth > 0) {
        currentScrollLeftRef.current += singleSetWidth;
      }
      
      scrollElement.scrollLeft = currentScrollLeftRef.current;
      if (autoScrollFrameIdRef.current) cancelAnimationFrame(autoScrollFrameIdRef.current);
      autoScrollFrameIdRef.current = requestAnimationFrame(animateScroll);
    };

    if (autoScrollFrameIdRef.current) cancelAnimationFrame(autoScrollFrameIdRef.current);
    autoScrollFrameIdRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (autoScrollFrameIdRef.current) {
        cancelAnimationFrame(autoScrollFrameIdRef.current);
      }
    };
  }, [duplicatedProjects.length]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isHoveringRef.current = true;
    const container = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    
    const neutralZoneWidth = rect.width * neutralZonePercentage;
    const neutralZoneStart = (rect.width - neutralZoneWidth) / 2;
    const neutralZoneEnd = neutralZoneStart + neutralZoneWidth;

    if (mouseX >= neutralZoneStart && mouseX <= neutralZoneEnd) {
      scrollSpeedRef.current = 0; // Stop in the neutral zone
    } else if (mouseX < neutralZoneStart) {
      scrollSpeedRef.current = -hoverInducedSpeed; // Scroll left
    } else {
      scrollSpeedRef.current = hoverInducedSpeed; // Scroll right
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };
  
  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    scrollSpeedRef.current = baseAutoScrollSpeed; // Revert to base speed
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background"
    >
      <div
        ref={circle1Ref}
        className="absolute -z-10 top-[-15%] left-[-25%] w-[90rem] h-[110rem] bg-purple-600/35 dark:bg-purple-800/30 rounded-[60%/45%] filter blur-[320px] opacity-50 transition-transform duration-500 ease-out"
      ></div>
      <div
        ref={circle2Ref}
        className="absolute -z-10 bottom-[-20%] right-[-30%] w-[100rem] h-[95rem] bg-sky-700/30 dark:bg-sky-900/25 rounded-[55%/60%] filter blur-[310px] opacity-45 transition-transform duration-500 ease-out"
      ></div>

      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security and software development.
          </p>
        </AnimatedSection>
        
        <div
          className="relative w-full mt-6 [transform-style:preserve-3d] [perspective:1200px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
           <div className="overflow-hidden w-full">
            <div
              ref={scrollContainerRef}
              className="flex flex-row gap-4 md:gap-6 overflow-x-auto py-4 px-2 -mx-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className={cn(
                    "group flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[400px] h-full py-2" 
                  )}
                >
                    <Card className={cn(
                      "flex flex-col h-full overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-border/40",
                      "transition-all duration-300 ease-out",
                      "group-hover:rotate-x-[8deg] group-hover:rotate-y-[-8deg] group-hover:scale-105 group-hover:translate-z-8 group-hover:shadow-2xl"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
    

    
