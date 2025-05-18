
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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

const duplicatedProjects = [...projectsData, ...projectsData, ...projectsData]; 

const baseAutoScrollSpeed = 1.0; 
const hoverInducedSpeed = 2.0; 
const neutralZonePercentage = 0.2; 

const MAX_CONTENT_ROTATION = 3;
const MAX_CIRCLE_MOUSE_OFFSET = 8;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxFrameIdRef = useRef<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollFrameIdRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const scrollSpeedRef = useRef(baseAutoScrollSpeed);
  const currentScrollLeftRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setParallaxScrollContainer(mainElement);
  }, []);

  const applyParallaxTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const scrollY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-y-1') || '0');
    const scrollX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-x-1') || '0');
    const scrollRotate1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-rotate-1') || '0');
    const mouseX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-x-1') || '0');
    const mouseY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-y-1') || '0');
    if (circle1Ref.current) {
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.35)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.3)`;
    }
  }, []);

  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;

    const handleParallaxScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !parallaxScrollContainer) return;
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        if (circle1Ref.current) {
          circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.55}`);
          circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.25}`);
          circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.025}`);
        }
        if (circle2Ref.current) {
          circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.32}`);
          circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.20}`);
          circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * -0.019}`);
        }
        applyParallaxTransforms();
      });
    };

    if (parallaxScrollContainer){
        handleParallaxScroll();
        parallaxScrollContainer.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }
    return () => {
      if (parallaxScrollContainer) parallaxScrollContainer.removeEventListener('scroll', handleParallaxScroll);
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    };
  }, [parallaxScrollContainer, applyParallaxTransforms]);

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
      
      const currentAppliedSpeed = isHoveringRef.current && !isMobile ? scrollSpeedRef.current : baseAutoScrollSpeed;
      currentScrollLeftRef.current += currentAppliedSpeed;
      
      const singleSetWidth = scrollElement.scrollWidth / 3; 

      if (currentAppliedSpeed > 0 && currentScrollLeftRef.current >= singleSetWidth * 2 && singleSetWidth > 0) { 
        currentScrollLeftRef.current -= singleSetWidth;
        scrollElement.scrollLeft = currentScrollLeftRef.current; 
      } else if (currentAppliedSpeed < 0 && currentScrollLeftRef.current <= singleSetWidth && singleSetWidth > 0) { 
        currentScrollLeftRef.current += singleSetWidth;
        scrollElement.scrollLeft = currentScrollLeftRef.current; 
      }
      
      scrollElement.scrollLeft = currentScrollLeftRef.current;
      if (autoScrollFrameIdRef.current) cancelAnimationFrame(autoScrollFrameIdRef.current); 
      autoScrollFrameIdRef.current = requestAnimationFrame(animateScroll);
    };
    
    if (scrollElement.scrollWidth > 0 && currentScrollLeftRef.current === 0) {
        currentScrollLeftRef.current = scrollElement.scrollWidth / 3;
        scrollElement.scrollLeft = currentScrollLeftRef.current;
    }


    if (autoScrollFrameIdRef.current) cancelAnimationFrame(autoScrollFrameIdRef.current); 
    autoScrollFrameIdRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (autoScrollFrameIdRef.current) {
        cancelAnimationFrame(autoScrollFrameIdRef.current);
      }
    };
  }, [duplicatedProjects.length, isMobile]); // Added isMobile dependency

  const handleMouseMoveSection = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isMobile ||!sectionRef.current || !contentWrapperRef.current || !circle1Ref.current || !circle2Ref.current) return;
    
    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !contentWrapperRef.current || !circle1Ref.current || !circle2Ref.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const mouseXInSection = event.clientX - rect.left;
        const mouseYInSection = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normalizedMouseX = (mouseXInSection - centerX) / centerX; 
        const normalizedMouseY = (mouseYInSection - centerY) / centerY; 

        if (contentWrapperRef.current) {
            const rotateX = normalizedMouseY * -MAX_CONTENT_ROTATION;
            const rotateY = normalizedMouseX * MAX_CONTENT_ROTATION;
            contentWrapperRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        }
        
        if (circle1Ref.current) {
            circle1Ref.current.style.setProperty('--mouse-x-1', `${normalizedMouseX * MAX_CIRCLE_MOUSE_OFFSET}`);
            circle1Ref.current.style.setProperty('--mouse-y-1', `${normalizedMouseY * MAX_CIRCLE_MOUSE_OFFSET}`);
        }
        if (circle2Ref.current) {
            circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
            circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
        }
        applyParallaxTransforms();
    });
  }, [applyParallaxTransforms, isMobile]);

  const handleMouseEnterCarousel = useCallback(() => {
    if (isMobile) return;
    isHoveringRef.current = true;
  }, [isMobile]);

  const handleMouseLeaveCarousel = useCallback(() => {
    if (isMobile) return;
    isHoveringRef.current = false;
    scrollSpeedRef.current = baseAutoScrollSpeed; 
  }, [isMobile]);

  const handleMouseMoveCarousel = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !scrollContainerRef.current) return;
    const carouselRect = scrollContainerRef.current.getBoundingClientRect();
    const mouseXInCarousel = event.clientX - carouselRect.left;
    
    const neutralZoneWidth = carouselRect.width * neutralZonePercentage;
    const neutralZoneStart = (carouselRect.width - neutralZoneWidth) / 2;
    const neutralZoneEnd = neutralZoneStart + neutralZoneWidth;

    if (mouseXInCarousel >= neutralZoneStart && mouseXInCarousel <= neutralZoneEnd) {
      scrollSpeedRef.current = 0; 
    } else if (mouseXInCarousel < neutralZoneStart) {
      scrollSpeedRef.current = -hoverInducedSpeed; 
    } else {
      scrollSpeedRef.current = hoverInducedSpeed; 
    }
  }, [isMobile]);


  const handleMouseLeaveSection = useCallback(() => {
    if (isMobile) return;
    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    if (contentWrapperRef.current) {
      contentWrapperRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (circle1Ref.current) {
        circle1Ref.current.style.setProperty('--mouse-x-1', `0`);
        circle1Ref.current.style.setProperty('--mouse-y-1', `0`);
    }
    if (circle2Ref.current) {
        circle2Ref.current.style.setProperty('--mouse-x-2', `0`);
        circle2Ref.current.style.setProperty('--mouse-y-2', `0`);
    }
    applyParallaxTransforms();
    
    isHoveringRef.current = false;
    scrollSpeedRef.current = baseAutoScrollSpeed; 
  }, [applyParallaxTransforms, isMobile]);

  useEffect(() => {
    ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop => 
        circle1Ref.current?.style.setProperty(prop, '0')
    );
    ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop => 
        circle2Ref.current?.style.setProperty(prop, '0')
    );
    applyParallaxTransforms();
  }, [applyParallaxTransforms]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      onMouseMove={!isMobile ? handleMouseMoveSection : undefined} 
      onMouseLeave={!isMobile ? handleMouseLeaveSection : undefined}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background [transform-style:preserve-3d]"
    >
      <div
        ref={circle1Ref}
        className="absolute -z-10 top-[-15%] left-[-25%] w-[90rem] h-[110rem] bg-purple-600/15 dark:bg-[hsl(270_60%_55%_/_0.1)] rounded-[60%/45%] filter blur-[330px] md:blur-[400px] opacity-70 dark:opacity-60 transition-transform duration-300 ease-out"
      ></div>
      <div
        ref={circle2Ref}
        className="absolute -z-10 bottom-[-20%] right-[-30%] w-[100rem] h-[95rem] bg-accent/10 dark:bg-accent/5 rounded-[55%/60%] filter blur-[320px] md:blur-[390px] opacity-65 dark:opacity-55 transition-transform duration-300 ease-out"
      ></div>

      <div 
        ref={contentWrapperRef}
        className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full transition-transform duration-150 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💡 My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A selection of projects I&apos;ve worked on, showcasing my skills in cyber security and software development.
          </p>
        </AnimatedSection>
        
        <div
          className="relative w-full mt-6 [transform-style:preserve-3d] [perspective:1200px]"
          onMouseEnter={!isMobile ? handleMouseEnterCarousel : undefined}
          onMouseLeave={!isMobile ? handleMouseLeaveCarousel : undefined}
          onMouseMove={!isMobile ? handleMouseMoveCarousel : undefined}
        >
           <div className="overflow-hidden w-full">
            <div
              ref={scrollContainerRef}
              className="flex flex-row gap-4 md:gap-6 overflow-x-auto py-4 px-2 -mx-2 scrollbar-thin"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`} // Unique key for duplicated items
                  className={cn(
                    "group flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[400px] h-full py-2" 
                  )}
                >
                    <Card className={cn(
                      "flex flex-col h-full overflow-hidden shadow-xl bg-card/80 backdrop-blur-md border-border/40",
                      "transition-all duration-300 ease-out",
                      !isMobile && "group-hover:rotate-x-[8deg] group-hover:rotate-y-[-8deg] group-hover:scale-105 group-hover:translate-z-8 group-hover:shadow-2xl"
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
    
