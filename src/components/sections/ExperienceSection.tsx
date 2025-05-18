
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, CalendarDays, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ExperienceItem } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const experienceData: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Cyber Security Analyst Intern',
    company: 'Cyber Crime Cell, CID Crime',
    duration: 'November 2024 - May 2025 (Expected)',
    location: 'Gandhinagar, Gujarat (On-Site)',
    logoUrl: '/CID.jpg',
    imageHint: 'CID Crime Gujarat logo',
    description: [
      'Assisted senior analysts in monitoring network traffic and identifying potential security breaches using SIEM tools (e.g., Splunk, QRadar).',
      'Conducted vulnerability assessments and penetration testing (VAPT) on web applications and internal networks, documenting findings and recommending remediation.',
      'Contributed to the development and refinement of incident response plans and security awareness materials.',
      'Gained hands-on experience with digital forensics tools and techniques for data acquisition and analysis under supervision.',
      'Researched emerging cyber threats, attack vectors, and mitigation strategies, presenting findings to the team.',
      'Utilized tools such as Wireshark, Nmap, Metasploit, Burp Suite, and various forensic toolkits in a law enforcement context.'
    ],
  },
  // {
  //   id: 'exp2',
  //   title: 'IT Support Volunteer',
  //   company: 'Community Tech Hub',
  //   duration: 'Jan 2022 - May 2022',
  //   location: 'Bhopal, MP',
  //   logoUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'organization tech',
  //   description: [
  //     'Provided technical support and troubleshooting for hardware and software issues to community members.',
  //     'Assisted in setting up, configuring, and maintaining local network infrastructure.',
  //     'Educated users on fundamental cybersecurity best practices and digital safety.',
  //   ],
  // },
  // {
  //   id: 'exp3',
  //   title: 'Freelance Web Developer (Part-time)',
  //   company: 'Self-Employed',
  //   duration: 'Sep 2022 - Dec 2022',
  //   location: 'Remote',
  //   logoUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'freelance code computer',
  //   description: [
  //     'Developed and maintained responsive websites for small businesses using HTML, CSS, JavaScript, and PHP.',
  //     'Integrated third-party APIs and services as per client requirements.',
  //     'Managed project timelines and communicated effectively with clients to deliver satisfactory results.',
  //   ],
  // },
];

const MAX_CONTENT_ROTATION = 4; 
const MAX_CIRCLE_MOUSE_OFFSET = 10;

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null); 
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxFrameIdRef = useRef<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollUpdateRafId = useRef<number | null>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setParallaxScrollContainer(mainElement);
    cardRefs.current = cardRefs.current.slice(0, experienceData.length);
  }, []);
  
  const applyParallaxTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const scrollY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-y-1') || '0');
    const scrollX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-x-1') || '0');
    const scrollRotate1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-rotate-1') || '0');
    const mouseX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-x-1') || '0');
    const mouseY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-y-1') || '0');
    if (circle1Ref.current) {
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.3)`;
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
  
  const updateScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const threshold = 5; 
      setCanScrollLeft(scrollLeft > threshold);
      setCanScrollRight(scrollWidth - clientWidth - scrollLeft > threshold);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(experienceData.length > 1); 
    }
  }, [experienceData.length]);
  
  const scrollToCard = useCallback((index: number) => {
    if (index < 0 || index >= experienceData.length || !scrollContainerRef.current || !cardRefs.current[index]) return;
    
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'center', 
        block: 'nearest'
      });
      setActiveIndex(index);
    }
  }, [experienceData.length]); 

  useEffect(() => {
     if (isMountedRef.current && experienceData.length > 0) {
      const timeoutId = setTimeout(() => updateScrollability(), 360); 
      return () => clearTimeout(timeoutId);
    }
  }, [activeIndex, experienceData.length, updateScrollability]);


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScrollEvent = () => {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          if (scrollUpdateRafId.current) cancelAnimationFrame(scrollUpdateRafId.current);
          scrollUpdateRafId.current = requestAnimationFrame(updateScrollability);
        }, 60); 
      };

      container.addEventListener('scroll', handleScrollEvent, { passive: true });
      const initialScrollUpdate = setTimeout(updateScrollability, 350);
      return () => {
        container.removeEventListener('scroll', handleScrollEvent);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        if (scrollUpdateRafId.current) cancelAnimationFrame(scrollUpdateRafId.current);
        clearTimeout(initialScrollUpdate);
      };
    }
  }, [updateScrollability]);
  
   useEffect(() => {
    const container = scrollContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;

    const debouncedUpdate = () => {
      if (scrollUpdateRafId.current) cancelAnimationFrame(scrollUpdateRafId.current);
      scrollUpdateRafId.current = requestAnimationFrame(() => {
        updateScrollability();
        // No auto-scroll on resize to prevent jumpiness
      });
    };

    if (container) {
      resizeObserver = new ResizeObserver(debouncedUpdate);
      resizeObserver.observe(container);
      
      const initialLayoutTimeout = setTimeout(debouncedUpdate, 350); 

      return () => {
        if (resizeObserver && container) resizeObserver.unobserve(container);
        if (scrollUpdateRafId.current) cancelAnimationFrame(scrollUpdateRafId.current);
        clearTimeout(initialLayoutTimeout);
      };
    }
  }, [updateScrollability, experienceData.length]);
  
  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;

    const handleParallaxScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !parallaxScrollContainer) return; 
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        if (circle1Ref.current) {
          circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.4}`);
          circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.1}`);
          circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * -0.018}`);
        }
        if (circle2Ref.current) {
          circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.22}`);
          circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.12}`);
          circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * 0.014}`);
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

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !contentWrapperRef.current || !circle1Ref.current || !circle2Ref.current) return;
    
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
  }, [applyParallaxTransforms]);

  const handleMouseLeave = useCallback(() => {
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
  }, [applyParallaxTransforms]);

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
      id="experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5 [transform-style:preserve-3d]" 
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-10%] right-[-30%] w-[80rem] h-[90rem] bg-[hsl(220_70%_50%_/_0.2)] dark:bg-[hsl(220_70%_50%_/_0.15)] rounded-[60%/45%] filter blur-[220px] md:blur-[290px] opacity-50 dark:opacity-45 transition-transform duration-300 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-20%] left-[-35%] w-[90rem] h-[80rem] bg-primary/20 dark:bg-primary/15 rounded-[50%/65%] filter blur-[210px] md:blur-[280px] opacity-45 dark:opacity-40 transition-transform duration-300 ease-out"
      ></div>
      
      <div 
        ref={contentWrapperRef}
        className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full transition-transform duration-150 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💼 Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className="relative w-full mt-6">
           <div className="overflow-hidden w-full"> {/* Outer wrapper for button positioning */}
             {experienceData.length > 1 && (
               <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollToCard(activeIndex - 1)}
                  disabled={!canScrollLeft}
                  aria-label="Scroll experience left"
                  className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                    "disabled:border-muted disabled:text-foreground/60 disabled:cursor-not-allowed disabled:opacity-70"
                  )}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollToCard(activeIndex + 1)}
                  disabled={!canScrollRight}
                  aria-label="Scroll experience right"
                  className={cn(
                      "absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                      "disabled:border-muted disabled:text-foreground/60 disabled:cursor-not-allowed disabled:opacity-70"
                    )}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
               </>
             )}
          
            <div className="overflow-hidden w-full [transform-style:preserve-3d] [perspective:1200px]"> 
              <div 
                ref={scrollContainerRef}
                className={cn(
                  "flex flex-row gap-4 md:gap-6 py-4 px-2 -mx-2 overflow-x-auto",
                   experienceData.length === 1 && "justify-center" 
                )}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }} 
              >
                {experienceData.map((exp, index) => (
                  <div
                    key={exp.id}
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={cn(
                      "group flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[420px] h-full py-2", 
                    )}
                  >
                    <AnimatedSection 
                      animationType="scaleIn" 
                      delay={`delay-${100}` as `delay-${number}`} 
                    >
                      <Card className={cn(
                        "flex flex-col h-full shadow-xl overflow-hidden bg-card/90 backdrop-blur-md border-secondary/30",
                        "transition-all duration-500 ease-out",
                        index === activeIndex 
                          ? "opacity-100 scale-100 shadow-2xl border-accent/50" 
                          : "opacity-50 scale-85 hover:opacity-70 hover:scale-[0.88]",
                        "group-hover:rotate-x-[8deg] group-hover:rotate-y-[-8deg] group-hover:scale-105 group-hover:translate-z-4 group-hover:shadow-2xl"
                      )}>
                        <CardHeader className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-5 md:p-6">
                          {exp.logoUrl && (
                            <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden border-2 border-accent/30 shadow-md flex-shrink-0 bg-background/70 p-1.5">
                              <Image
                                src={exp.logoUrl}
                                alt={`${exp.company} logo`}
                                fill
                                sizes="(max-width: 768px) 4rem, 5rem"
                                className="object-contain"
                                data-ai-hint={exp.imageHint || "company logo"}
                              />
                            </div>
                          )}
                          <div className="flex-grow pt-1 md:pt-0">
                            <CardTitle className="text-lg md:text-xl font-semibold text-primary group-hover:text-accent transition-colors">{exp.title}</CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                              <Building2 className="h-4 w-4 text-accent" />
                              <span className="font-medium text-foreground/90 text-sm">{exp.company}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                              <CalendarDays className="h-3 w-3 text-accent" />
                              <span>{exp.duration}</span>
                            </div>
                            {exp.location && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                <MapPin className="h-3 w-3 text-accent" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-5 md:p-6 pt-0 space-y-2.5 flex-grow">
                          <h4 className="text-sm font-semibold text-foreground/90 mb-1.5">Key Responsibilities & Achievements:</h4>
                          <ul className="space-y-2 list-inside">
                            {exp.description.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-foreground/80 text-xs leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
    
