
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
    imageHint: 'company logo',
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
    location: 'Local Town, ST',
    logoUrl: 'https://placehold.co/100x100.png',
    imageHint: 'organization logo',
    description: [
      'Provided technical support to community members.',
      'Helped set up and maintain network infrastructure.',
      'Educated users on basic cybersecurity best practices.',
    ],
  },
  // Add more experiences here
];

export default function ExperienceSection() {
  return (
    <div id="experience" className="py-16 md:py-24 bg-secondary/30 rounded-lg my-8">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection delay="delay-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Professional Experience</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              My journey and contributions in the professional cyber security landscape.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-12">
          {experienceData.map((exp, index) => (
            <AnimatedSection key={exp.id} delay={`delay-${(index + 1) * 200}` as `delay-${number}`}>
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-6 bg-card">
                  {exp.logoUrl && (
                    <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-md overflow-hidden border shadow-sm flex-shrink-0">
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
                    <CardTitle className="text-2xl font-semibold text-primary">{exp.title}</CardTitle>
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
    </div>
  );
}
