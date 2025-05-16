
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, CalendarDays, MapPin, CheckCircle } from 'lucide-react';
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
];

export default function ExperienceSection() {
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.24}px) translateX(${scrollProgress * 0.04}px) rotate(-${scrollProgress * 0.01}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.14}px) translateX(-${scrollProgress * 0.03}px) rotate(${scrollProgress * 0.007}deg)`;
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
      id="experience"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5" 
    >
      {/* Background Gradient Circles - increased opacity and blur */}
      <div ref={circle1Ref} className="absolute -z-10 top-[15%] right-[-20%] w-[28rem] h-[28rem] md:w-[45rem] md:h-[45rem] bg-primary/20 rounded-full filter blur-[140px] md:blur-[200px] opacity-50 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[10%] left-[-15%] w-[26rem] h-[26rem] md:w-[40rem] md:h-[40rem] bg-accent/25 rounded-full filter blur-[130px] md:blur-[190px] opacity-60 transition-transform duration-500 ease-out"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-16">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💼 Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className="space-y-10 md:space-y-12">
          {experienceData.map((exp, index) => (
            <AnimatedSection 
              key={exp.id} 
              animationType={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
              delay={`delay-${(index * 150) + 200}` as `delay-${number}`}
            >
              <Card className="shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out overflow-hidden bg-card/90 backdrop-blur-md border-secondary/30">
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
                <CardContent className="p-6 pt-0 space-y-3">
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
        </div>
      </div>
    </section>
  );
}
