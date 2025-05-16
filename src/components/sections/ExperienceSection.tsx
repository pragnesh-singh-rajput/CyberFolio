
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
    company: 'CyberGuard Solutions', // Placeholder, update if needed
    duration: 'June 2023 - August 2023',
    location: 'Remote',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'company security',
    description: [
      'Monitored and analyzed security alerts using SIEM tools, contributing to incident identification.',
      'Performed vulnerability assessments on web applications and network infrastructure, identifying potential risks.',
      'Assisted in developing security documentation, including incident response procedures.',
      'Collaborated with senior analysts on threat intelligence gathering and analysis.',
      'Gained practical experience with various security tools and technologies.',
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
  //   title: 'Freelance Web Developer',
  //   company: 'Self-Employed',
  //   duration: 'Sep 2022 - Dec 2022',
  //   location: 'Remote',
  //   logoUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'freelance code computer',
  //   description: [
  //     'Developed and maintained websites for small businesses using HTML, CSS, and JavaScript.',
  //     'Implemented responsive designs to ensure optimal viewing across all devices.',
  //     'Collaborated with clients to understand requirements and deliver solutions.',
  //   ],
  // },
  // {
  //   id: 'exp4',
  //   title: 'Jr. Security Researcher (Hypothetical)',
  //   company: 'CyberDef Innovations',
  //   duration: 'Sep 2024 - Present',
  //   location: 'Remote',
  //   logoUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'research lab tech',
  //   description: [
  //     'Exploring new threat vectors and defensive strategies in IoT security.',
  //     'Contributing to research papers and security publications.',
  //     'Developing proof-of-concept exploits for educational purposes.',
  //   ],
  // },
  // {
  //   id: 'exp5',
  //   title: 'Lead Security Engineer (Future Goal)',
  //   company: 'Global Cyber Corp',
  //   duration: 'Jan 2028 - Present',
  //   location: 'New York, USA',
  //   logoUrl: 'https://placehold.co/100x100.png',
  //   imageHint: 'corporate security future',
  //   description: [
  //     'Leading a team of security professionals to protect enterprise assets.',
  //     'Designing and implementing next-generation security architectures.',
  //     'Overseeing threat intelligence and incident response operations globally.',
  //   ],
  // }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [parallaxScrollContainer, setParallaxScrollContainer] = useState<HTMLElement | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
      const isActuallyScrollable = container.scrollWidth > container.clientWidth;
      setCanScrollLeft(isActuallyScrollable && activeIndex > 0);
      setCanScrollRight(isActuallyScrollable && activeIndex < experienceData.length - 1);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [activeIndex, experienceData.length]);
  
  const scrollToCard = useCallback((index: number) => {
    if (index < 0 || index >= experienceData.length || !scrollContainerRef.current) return;
    
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
    updateScrollability();
    const container = scrollContainerRef.current;
    let resizeObserver: ResizeObserver | null = null;

    if (container) {
      const handleScrollEvent = () => updateScrollability(); // Re-check on manual scroll
      container.addEventListener('scroll', handleScrollEvent, { passive: true });
      
      resizeObserver = new ResizeObserver(updateScrollability);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', handleScrollEvent);
        if (resizeObserver) {
          resizeObserver.unobserve(container);
        }
      };
    }
    
    window.addEventListener('resize', updateScrollability);
    return () => {
      window.removeEventListener('resize', updateScrollability);
    };
  }, [updateScrollability, experienceData.length]); // Removed activeIndex, scrollToCard from deps
  
  useEffect(() => {
    // Ensure updateScrollability is called when activeIndex changes,
    // especially important if scrollToCard is not called on initial mount.
    updateScrollability();
  }, [activeIndex, updateScrollability]);
  
  useEffect(() => {
    if (!parallaxScrollContainer || !sectionRef.current) return;

    const handleParallaxScroll = () => {
      if (!sectionRef.current || !parallaxScrollContainer) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        // More dynamic parallax: adjust multiplier, add horizontal shift, and rotation
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.38}px) translateX(${scrollProgress * 0.1}px) rotate(-${scrollProgress * 0.022}deg)`;
      }
      if (circle2Ref.current) {
        // Different speed and direction for the second circle
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.22}px) translateX(-${scrollProgress * 0.08}px) rotate(${scrollProgress * 0.016}deg)`;
      }
    };

    handleParallaxScroll(); 
    parallaxScrollContainer.addEventListener('scroll', handleParallaxScroll, { passive: true });
    return () => {
      if (parallaxScrollContainer) {
        parallaxScrollContainer.removeEventListener('scroll', handleParallaxScroll);
      }
    };
  }, [parallaxScrollContainer]);


  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/10" 
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[10%] right-[-25%] w-[45rem] h-[70rem] md:w-[55rem] md:h-[85rem] bg-primary/50 rounded-full filter blur-[140px] md:blur-[200px] opacity-70 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[5%] left-[-20%] w-[55rem] h-[40rem] md:w-[70rem] md:h-[50rem] bg-accent/60 rounded-full filter blur-[130px] md:blur-[190px] opacity-75 transition-transform duration-500 ease-out"
      ></div>
      
      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-10 md:mb-12 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💼 Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className="relative w-full mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={!canScrollLeft}
            aria-label="Scroll experience left"
            className={cn(
                "absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                "disabled:border-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" 
              )}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div 
            ref={scrollContainerRef}
            className="flex flex-row gap-4 md:gap-6 overflow-x-auto py-4 px-2 -mx-2"
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
                      : "opacity-60 scale-90 hover:opacity-80 hover:scale-[0.92]"
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

          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={!canScrollRight}
            aria-label="Scroll experience right"
            className={cn(
                "absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border-accent/70 text-accent bg-background/50 hover:bg-accent/20 transition-all duration-200 ease-in-out h-10 w-10 sm:h-12 sm:w-12",
                "disabled:border-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              )}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

