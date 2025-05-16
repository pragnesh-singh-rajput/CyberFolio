
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, CalendarDays, MapPin, CheckCircle } from 'lucide-react';
import type { ExperienceItem } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';

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
      'Assisted in monitoring security alerts and responding to incidents.',
      'Conducted vulnerability assessments on web applications.',
      'Contributed to the development of security awareness materials.',
      'Gained hands-on experience with SIEM tools and threat intelligence platforms.',
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
      'Provided technical support to community members.',
      'Helped set up and maintain network infrastructure.',
      'Educated users on basic cybersecurity best practices.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen scroll-snap-align-start flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/10"
    >
      {/* Background Gradient Circles */}
      <div className="absolute -z-10 top-[15%] right-[-20%] w-[26rem] h-[26rem] md:w-[42rem] md:h-[42rem] bg-primary/20 rounded-full filter blur-[120px] md:blur-[180px] opacity-40"></div>
      <div className="absolute -z-10 bottom-[10%] left-[-15%] w-[24rem] h-[24rem] md:w-[38rem] md:h-[38rem] bg-accent/25 rounded-full filter blur-[100px] md:blur-[150px] opacity-45"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Professional Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            My journey and contributions in the professional cyber security landscape.
          </p>
        </AnimatedSection>

        <div className="space-y-12 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
          {experienceData.map((exp, index) => (
            <AnimatedSection 
              key={exp.id} 
              animationType={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
              delay={`delay-${(index * 150) + 200}` as `delay-${number}`}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-6">
                  {exp.logoUrl && (
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-md overflow-hidden border shadow-sm flex-shrink-0 bg-background/50">
                      <Image
                        src={exp.logoUrl}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain p-1"
                        data-ai-hint={exp.imageHint || "company logo"}
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <CardTitle className="text-xl md:text-2xl font-semibold text-primary">{exp.title}</CardTitle>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <Building2 className="h-5 w-5" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{exp.duration}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <h4 className="text-md font-semibold text-foreground/90">Key Responsibilities & Achievements:</h4>
                  <ul className="space-y-2 list-inside">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{item}</span>
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
