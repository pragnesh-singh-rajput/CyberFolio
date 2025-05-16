
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, CalendarDays, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ExperienceItem } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

const experienceData: ExperienceItem[] = [
  {
    id: 'exp1',
    title: 'Cyber Security Analyst Intern',
    company: 'TechSecure Solutions',
    duration: 'June 2023 - Aug 2023',
    location: 'Remote',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'company security',
    description: [
      'Assisted in monitoring security alerts and responding to incidents using advanced SIEM tools.',
      'Conducted comprehensive vulnerability assessments on web applications, identifying critical flaws.',
      'Contributed to the development and dissemination of engaging security awareness materials.',
      'Gained hands-on experience with threat intelligence platforms and incident response protocols.',
    ],
  },
  {
    id: 'exp2',
    title: 'IT Support Volunteer',
    company: 'Community Tech Hub',
    duration: 'Jan 2022 - May 2022',
    location: 'Bhopal, MP',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'organization tech',
    description: [
      'Provided technical support and troubleshooting for hardware and software issues to community members.',
      'Assisted in setting up, configuring, and maintaining local network infrastructure.',
      'Educated users on fundamental cybersecurity best practices and digital safety.',
    ],
  },
  {
    id: 'exp3',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    duration: 'Sep 2022 - Dec 2022',
    location: 'Remote',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'freelance code computer',
    description: [
      'Developed and maintained websites for small businesses using HTML, CSS, and JavaScript.',
      'Implemented responsive designs to ensure optimal viewing across all devices.',
      'Collaborated with clients to understand requirements and deliver solutions.',
    ],
  },
  {
    id: 'exp4',
    title: 'Jr. Security Researcher (Hypothetical)',
    company: 'CyberDef Innovations',
    duration: 'Sep 2024 - Present',
    location: 'Remote',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'research lab tech',
    description: [
      'Exploring new threat vectors and defensive strategies in IoT security.',
      'Contributing to research papers and security publications.',
      'Developing proof-of-concept exploits for educational purposes.',
    ],
  },
];

export default function ExperienceSection() {
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

    const handleParallaxScroll = () => {
      if (!sectionRef.current) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.24}px) translateX(${scrollProgress * 0.04}px) rotate(-${scrollProgress * 0.01}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.14}px) translateX(-${scrollProgress * 0.03}px) rotate(${scrollProgress * 0.007}deg)`;
      }
    };

    handleParallaxScroll(); 
    scrollContainerEl.addEventListener('scroll', handleParallaxScroll, { passive: true });
    return () => {
      scrollContainerEl.removeEventListener('scroll', handleParallaxScroll);
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
    
    const resizeObserver = new ResizeObserver(checkScrollability);
    Array.from(container.children).forEach(child => resizeObserver.observe(child));

    return () => {
      container.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
      resizeObserver.disconnect();
    };
  }, [experienceData]);


  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };


  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5" 
    >
      <div ref={circle1Ref} className="absolute -z-10 top-[15%] right-[-20%] w-[28rem] h-[28rem] md:w-[45rem] md:h-[45rem] bg-primary/30 rounded-full filter blur-[160px] md:blur-[220px] opacity-50 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[10%] left-[-15%] w-[26rem] h-[26rem] md:w-[40rem] md:h-[40rem] bg-accent/35 rounded-full filter blur-[150px] md:blur-[210px] opacity-60 transition-transform duration-500 ease-out"></div>
      
      <div className="container mx-auto px-0 md:px-6 py-16 flex flex-col w-full">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-6 px-4">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💼 Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className="flex justify-end gap-3 mb-6 px-4 md:px-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll experience left"
              className="rounded-full border-accent/70 text-accent hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground transition-all duration-200 ease-in-out"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll experience right"
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
            {experienceData.map((exp, index) => (
              <AnimatedSection 
                key={exp.id} 
                animationType={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
                delay={`delay-${(index * 100) + 200}` as `delay-${number}`}
                className="flex-none w-[calc(100%-2rem)] sm:w-96 md:w-[450px] h-full"
              >
                <Card className="flex flex-col h-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden bg-card/90 backdrop-blur-md border-secondary/30">
                  <CardHeader className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-6">
                    {exp.logoUrl && (
                      <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-lg overflow-hidden border-2 border-accent/30 shadow-md flex-shrink-0 bg-background/70 p-2">
                        <Image
                          src={exp.logoUrl}
                          alt={`${exp.company} logo`}
                          fill
                          className="object-contain"
                          data-ai-hint={exp.imageHint || "company logo"}
                        />
                      </div>
                    )}
                    <div className="flex-grow pt-2 md:pt-0">
                      <CardTitle className="text-xl md:text-2xl font-semibold text-primary">{exp.title}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1.5">
                        <Building2 className="h-5 w-5 text-accent" />
                        <span className="font-medium text-foreground/90">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <CalendarDays className="h-4 w-4 text-accent" />
                        <span>{exp.duration}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-3 flex-grow">
                    <h4 className="text-md font-semibold text-foreground/90 mb-2">Key Responsibilities & Achievements:</h4>
                    <ul className="space-y-2.5 list-inside">
                      {exp.description.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2.5 mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
            <div className="flex-none w-1 md:w-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

