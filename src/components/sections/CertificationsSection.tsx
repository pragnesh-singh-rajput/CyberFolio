
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Certification } from '@/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Award, CalendarDays, ExternalLink, Building } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const certificationsData: Certification[] = [
  {
    id: 'cert1',
    name: 'Certified Ethical Hacker (CEH) - Mock',
    issuingOrganization: 'EC-Council (Example)',
    issueDate: 'Jan 2024',
    credentialUrl: '#', 
    logoUrl: 'https://placehold.co/100x50.png',
    imageHint: 'EC-Council logo',
    description: 'Demonstrates knowledge of assessing the security of computer systems by looking for weaknesses and vulnerabilities.'
  },
  {
    id: 'cert2',
    name: 'CompTIA Security+ - Mock',
    issuingOrganization: 'CompTIA (Example)',
    issueDate: 'Mar 2023',
    credentialUrl: '#',
    logoUrl: 'https://placehold.co/100x50.png',
    imageHint: 'CompTIA logo',
    description: 'Validates baseline skills necessary to perform core security functions and pursue an IT security career.'
  },
  {
    id: 'cert3',
    name: 'AWS Certified Cloud Practitioner - Mock',
    issuingOrganization: 'Amazon Web Services (Example)',
    issueDate: 'Nov 2023',
    credentialUrl: '#',
    logoUrl: 'https://placehold.co/100x50.png',
    imageHint: 'AWS logo',
    description: 'Foundational understanding of AWS Cloud, services, and terminology.'
  },
];

const MAX_CONTENT_ROTATION = 3;
const MAX_CIRCLE_MOUSE_OFFSET = 8;

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxFrameIdRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  const applyTransforms = useCallback(() => {
    if (isMobile || !sectionRef.current) return;

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
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.25)`;
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !scrollContainer || !circle1Ref.current || !circle2Ref.current) return;
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.42}`);
        circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.13}`);
        circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.025}`);
        
        circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.28}`);
        circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.16}`);
        circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * -0.02}`);
        applyTransforms();
      });
    };

    handleScroll();
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    };
  }, [scrollContainer, applyTransforms, isMobile]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isMobile || !sectionRef.current || !contentWrapperRef.current) return;

    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    parallaxFrameIdRef.current = requestAnimationFrame(() => {
      if (!sectionRef.current || !contentWrapperRef.current) return;
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
      applyTransforms();
    });
  }, [applyTransforms, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if(isMobile || !contentWrapperRef.current) return;
    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    if (contentWrapperRef.current) {
      contentWrapperRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (circle1Ref.current) {
      circle1Ref.current.style.setProperty('--mouse-x-1', '0');
      circle1Ref.current.style.setProperty('--mouse-y-1', '0');
    }
    if (circle2Ref.current) {
      circle2Ref.current.style.setProperty('--mouse-x-2', '0');
      circle2Ref.current.style.setProperty('--mouse-y-2', '0');
    }
    applyTransforms();
  }, [applyTransforms, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop =>
        circle1Ref.current?.style.setProperty(prop, '0')
    );
    ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop =>
        circle2Ref.current?.style.setProperty(prop, '0')
    );
    applyTransforms();
  }, [applyTransforms, isMobile]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background [transform-style:preserve-3d]"
    >
      {!isMobile && (
        <>
          <div
            ref={circle1Ref}
            className="absolute -z-10 top-[-5%] left-[-30%] w-[70rem] h-[80rem] md:w-[85rem] md:h-[95rem] bg-[hsl(270_60%_65%_/_0.15)] dark:bg-[hsl(270_60%_70%_/_0.1)] rounded-[50%/60%] filter blur-[300px] md:blur-[370px] opacity-50 dark:opacity-40"
          ></div>
          <div
            ref={circle2Ref}
            className="absolute -z-10 bottom-[0%] right-[-25%] w-[60rem] h-[70rem] md:w-[75rem] md:h-[85rem] bg-primary/10 dark:bg-primary/5 rounded-[60%/50%] filter blur-[290px] md:blur-[360px] opacity-45 dark:opacity-35"
          ></div>
        </>
      )}

      <div
        ref={contentWrapperRef}
        className={cn(
          "container mx-auto px-4 md:px-6 py-16",
          !isMobile && "transition-transform duration-150 ease-out"
        )}
        style={!isMobile ? { transformStyle: "preserve-3d" } : {}}
      >
        <AnimatedSection animationType="fadeInRight" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">📜 Licenses & Certifications</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My professional accreditations and qualifications.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certificationsData.map((cert, index) => (
            <AnimatedSection key={cert.id} animationType="fadeInUp" delay={`delay-${200 + index * 100}` as `delay-${number}`}>
              <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-md border-border/40 group">
                <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                        {cert.logoUrl && (
                            <div className="relative h-12 w-24 flex-shrink-0 bg-muted/30 p-1 rounded overflow-hidden border border-border/30">
                                <Image src={cert.logoUrl} alt={`${cert.issuingOrganization} logo`} layout="fill" objectFit="contain" data-ai-hint={cert.imageHint || 'logo certification'}/>
                            </div>
                        )}
                        <div className="flex-grow">
                            <CardTitle className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">{cert.name}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                                <Building className="h-4 w-4 text-muted-foreground/70" /> {cert.issuingOrganization}
                            </CardDescription>
                        </div>
                         <Award className="h-8 w-8 text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  {cert.description && <p className="text-sm text-foreground/80 leading-relaxed">{cert.description}</p>}
                  {cert.issueDate && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 text-accent" />
                      <span>Issued: {cert.issueDate}</span>
                      {cert.expirationDate && <span>(Expires: {cert.expirationDate})</span>}
                    </div>
                  )}
                  {cert.credentialId && (
                     <p className="text-xs text-muted-foreground">ID: {cert.credentialId}</p>
                  )}
                </CardContent>
                {cert.credentialUrl && cert.credentialUrl !== '#' && (
                  <CardFooter className="pt-3">
                    <Button variant="outline" size="sm" asChild className="w-full text-xs hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors">
                      <Link href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-3.5 w-3.5" />
                        Verify Credential
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}


    