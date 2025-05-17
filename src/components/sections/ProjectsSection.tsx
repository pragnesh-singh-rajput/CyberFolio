
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
    tags: ["https://github.com/pragnesh-singh-rajput/absconders-portal"],
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
    imageHint: 'twitter bot',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Twitter-News-Bot',
    tags: ['Bot', 'Python', 'Twitter API', 'Web Scraping', 'Automation'],
  },
  {
    id: 'proj-awsrekognition',
    title: 'Image & Video Rekognition with AWS',
    description: 'A project leveraging AWS Rekognition for advanced image and video analysis, demonstrating cloud-based computer vision capabilities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'aws vision',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/image-and-video-rekognition-with-aws',
    tags: ['AWS', 'Rekognition', 'Cloud AI', 'Computer Vision', 'Python'],
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website (This one!)',
    description: 'My personal portfolio built with Next.js, TypeScript, Tailwind CSS, and ShadCN UI, featuring smooth animations, parallax effects, and a custom cursor.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'portfolio design',
    repoUrl: 'https://github.com/pragnesh-singh-rajput/Portfolio',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'ShadCN UI', 'React', 'Framer Motion'],
  },
];

// Duplicate projects for infinite scroll illusion
const duplicatedProjects = [...projectsData, ...projectsData];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxAnimationFrameIdRef = useRef<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const scrollSpeed = 0.5; // Adjust for desired speed

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setParallaxScrollContainer(mainElement);
  }, []);

  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;

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
      parallaxAnimationFrameIdRef.current = null;
    };

    const handleParallaxScroll = () => {
      if (parallaxAnimationFrameIdRef.current) cancelAnimationFrame(parallaxAnimationFrameIdRef.current);
      parallaxAnimationFrameIdRef.current = requestAnimationFrame(performParallaxUpdate);
    };
    
    if (parallaxScrollContainer){
        handleParallaxScroll(); 
        parallaxScrollContainer.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }
    return () => {
      if (parallaxScrollContainer) parallaxScrollContainer.removeEventListener('scroll', handleParallaxScroll);
      if (parallaxAnimationFrameIdRef.current) cancelAnimationFrame(parallaxAnimationFrameIdRef.current);
    };
  }, [parallaxScrollContainer]);

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (!scrollElement) return;

    let currentScrollLeft = scrollElement.scrollLeft;

    const animateScroll = () => {
      if (!isHoveringRef.current && scrollElement) {
        currentScrollLeft += scrollSpeed;
        
        const loopPoint = scrollElement.scrollWidth / 2; 

        if (currentScrollLeft >= loopPoint) {
          currentScrollLeft -= loopPoint; 
          scrollElement.scrollLeft = currentScrollLeft;
        }
        scrollElement.scrollLeft = currentScrollLeft;
      }
      animationFrameIdRef.current = requestAnimationFrame(animateScroll);
    };

    animationFrameIdRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [scrollSpeed]);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background" 
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-20%] left-[-30%] w-[100rem] h-[80rem] md:w-[120rem] md:h-[90rem] bg-purple-500/25 dark:bg-purple-600/20 rounded-[60%/45%] filter blur-[240px] md:blur-[320px] opacity-40 dark:opacity-30 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-25%] right-[-35%] w-[90rem] h-[90rem] md:w-[110rem] md:h-[105rem] bg-sky-500/20 dark:bg-sky-600/15 rounded-[55%/60%] filter blur-[230px] md:blur-[310px] opacity-45 dark:opacity-25 transition-transform duration-500 ease-out"
      ></div>

      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security and software development.
          </p>
        </AnimatedSection>
        
        <div 
          className="relative w-full mt-6"
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => { isHoveringRef.current = false; }}
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
                    "flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[400px] h-full py-2", 
                    "transition-all duration-500 ease-in-out transform"
                  )}
                >
                    <Card className={cn(
                      "flex flex-col h-full overflow-hidden shadow-xl transition-all duration-300 ease-out bg-card/80 backdrop-blur-md border-border/40 group"
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
                        {project.repoUrl && !project.tags.includes(project.repoUrl) && ( 
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

