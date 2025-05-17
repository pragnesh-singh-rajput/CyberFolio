
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

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxAnimationFrameIdRef = useRef<number | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollUpdateRafId = useRef<number | null>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    setParallaxScrollContainer(mainElement);
    cardRefs.current = cardRefs.current.slice(0, experienceData.length);
  }, []);
  
  const updateScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const threshold = 2; 

      setCanScrollLeft(scrollLeft > threshold);
      setCanScrollRight(scrollWidth - clientWidth - scrollLeft > threshold);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);
  
  const scrollToCard = useCallback((index: number) => {
    if (index < 0 || index >= experienceData.length || !scrollContainerRef.current) return;
    
    const cardElement = cardRefs.current[index];
    if (cardElement) {
      let inlineOption: ScrollLogicalPosition = 'center';
      if (experienceData.length > 1) {
        if (index === 0) {
          inlineOption = 'start';
        } else if (index === experienceData.length - 1) {
          inlineOption = 'end';
        }
      }
      
      cardElement.scrollIntoView({
        behavior: 'smooth',
        inline: inlineOption,
        block: 'nearest'
      });
      setActiveIndex(index);
    }
  }, [experienceData.length]);

  // Effect for scroll event on the container
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        if (scrollUpdateRafId.current) {
          cancelAnimationFrame(scrollUpdateRafId.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          scrollUpdateRafId.current = requestAnimationFrame(() => {
            updateScrollability();
          });
        }, 60); // Debounce scroll events
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check after a short delay for layout
      const initialCheckTimeout = setTimeout(handleScroll, 150);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        if (scrollUpdateRafId.current) {
          cancelAnimationFrame(scrollUpdateRafId.current);
        }
        clearTimeout(initialCheckTimeout);
      };
    }
  }, [updateScrollability]);
  
  // Effect for activeIndex changes (e.g., after button click or data change)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (scrollUpdateRafId.current) {
        cancelAnimationFrame(scrollUpdateRafId.current);
      }
      scrollUpdateRafId.current = requestAnimationFrame(() => {
          updateScrollability();
      });
    }, 350); // Wait for smooth scroll to likely finish

    return () => {
      clearTimeout(timeoutId);
      if (scrollUpdateRafId.current) {
        cancelAnimationFrame(scrollUpdateRafId.current);
      }
    };
  }, [activeIndex, updateScrollability, experienceData.length]);
  
  // Effect for resize
   useEffect(() => {
    const container = scrollContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (container) {
      const handleResize = () => {
         if (scrollUpdateRafId.current) {
          cancelAnimationFrame(scrollUpdateRafId.current);
        }
        scrollUpdateRafId.current = requestAnimationFrame(() => {
          updateScrollability();
          if (cardRefs.current[activeIndex]) {
             scrollToCard(activeIndex);
          }
        });
      };
      
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      
      // Initial check on mount after layout
      const initialLayoutTimeout = setTimeout(handleResize, 250); 

      return () => {
        if (resizeObserver && container) {
          resizeObserver.unobserve(container);
        }
         if (scrollUpdateRafId.current) {
          cancelAnimationFrame(scrollUpdateRafId.current);
        }
        clearTimeout(initialLayoutTimeout);
      };
    }
  }, [activeIndex, scrollToCard, updateScrollability]); 
  
  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;

    const performParallaxUpdate = () => {
      if (!sectionRef.current || !parallaxScrollContainer) return; 
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.3}px) translateX(${scrollProgress * 0.08}px) rotate(-${scrollProgress * 0.014}deg) scale(1.1)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.18}px) translateX(-${scrollProgress * 0.07}px) rotate(${scrollProgress * 0.011}deg) scale(1.1)`;
      }
      parallaxAnimationFrameIdRef.current = null; 
    };

    const handleParallaxScroll = () => {
      if (parallaxAnimationFrameIdRef.current) { 
        cancelAnimationFrame(parallaxAnimationFrameIdRef.current);
      }
      parallaxAnimationFrameIdRef.current = requestAnimationFrame(performParallaxUpdate);
    };
    
    if (parallaxScrollContainer) {
      handleParallaxScroll(); 
      parallaxScrollContainer.addEventListener('scroll', handleParallaxScroll, { passive: true });
    }
    
    return () => {
      if (parallaxScrollContainer) {
        parallaxScrollContainer.removeEventListener('scroll', handleParallaxScroll);
      }
      if (parallaxAnimationFrameIdRef.current) { 
        cancelAnimationFrame(parallaxAnimationFrameIdRef.current);
      }
    };
  }, [parallaxScrollContainer]);


  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5" 
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-10%] right-[-35%] w-[75rem] h-[85rem] md:w-[90rem] md:h-[100rem] bg-blue-600/20 dark:bg-blue-700/25 rounded-[65%/45%] filter blur-[220px] md:blur-[280px] opacity-70 dark:opacity-60 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-20%] left-[-40%] w-[85rem] h-[70rem] md:w-[100rem] md:h-[85rem] bg-teal-500/15 dark:bg-teal-600/20 rounded-[45%/60%] filter blur-[210px] md:blur-[270px] opacity-70 dark:opacity-50 transition-transform duration-500 ease-out"
      ></div>
      
      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💼 Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className={cn("relative w-full mt-6")}>
          {experienceData.length > 0 && ( 
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
                  "flex-none w-[calc(100%-3rem)] sm:w-80 md:w-96 lg:w-[420px] h-full py-2", 
                  "transition-all duration-500 ease-in-out transform"
                )}
              >
                <AnimatedSection 
                  animationType="scaleIn" 
                  delay={`delay-${100}` as `delay-${number}`} 
                >
                  <Card className={cn(
                    "flex flex-col h-full shadow-xl transition-all duration-500 ease-out overflow-hidden bg-card/90 backdrop-blur-md border-secondary/30 group",
                    index === activeIndex 
                      ? "opacity-100 scale-100 shadow-2xl border-accent/50" 
                      : "opacity-50 scale-85 hover:opacity-70 hover:scale-[0.88]" 
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
    </section>
  );
}
    

    