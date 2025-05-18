
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { OtherSkill } from '@/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Lightbulb, Network, ShieldAlert, Users, BrainCog, ShieldCheck, Shield } from 'lucide-react'; // Example icons

const skillsData: OtherSkill[] = [
  { id: 'os1', name: 'Network Security', description: 'Implementing and managing security measures for computer networks.' },
  { id: 'os2', name: 'Ethical Hacking & Penetration Testing', description: 'Identifying vulnerabilities by simulating cyberattacks.' },
  { id: 'os3', name: 'Incident Response', description: 'Managing and mitigating security breaches and cyber threats.' },
  { id: 'os4', name: 'Cryptography', description: 'Applying cryptographic principles to secure data.' },
  { id: 'os5', name: 'Risk Assessment & Management', description: 'Identifying, evaluating, and mitigating security risks.' },
  { id: 'os6', name: 'Digital Forensics', description: 'Investigating cybercrimes and recovering digital evidence.' },
  { id: 'os7', name: 'Security Auditing & Compliance', description: 'Ensuring adherence to security standards and regulations.' },
  { id: 'os8', name: 'Problem Solving', description: 'Analytical approach to identifying and resolving complex issues.' },
  { id: 'os9', name: 'Team Collaboration', description: 'Working effectively within a team to achieve common goals.' },
  { id: 'os10', name: 'Vulnerability Assessment', description: 'Identifying and quantifying security weaknesses.' },
];

const MAX_CONTENT_ROTATION = 4;
const MAX_CIRCLE_MOUSE_OFFSET = 10;

const skillIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Network Security': Network,
  'Ethical Hacking & Penetration Testing': ShieldAlert,
  'Incident Response': ShieldCheck,
  'Cryptography': Shield, // Using generic shield
  'Risk Assessment & Management': BrainCog,
  'Digital Forensics': Lightbulb, // Placeholder
  'Security Auditing & Compliance': ShieldCheck,
  'Problem Solving': Lightbulb,
  'Team Collaboration': Users,
  'Vulnerability Assessment': ShieldAlert,
};


export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  const applyTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const scrollY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-y-1') || '0');
    const scrollX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-x-1') || '0');
    const scrollRotate1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-rotate-1') || '0');
    const mouseX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-x-1') || '0');
    const mouseY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-y-1') || '0');
    if (circle1Ref.current) {
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.25)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.2)`;
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !scrollContainer || !circle1Ref.current || !circle2Ref.current) return;
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.35}`);
        circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.2}`);
        circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * -0.018}`);
        
        circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.22}`);
        circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.15}`);
        circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * 0.013}`);
        applyTransforms();
      });
    };

    handleScroll();
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    };
  }, [scrollContainer, applyTransforms]);

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
      
      circle1Ref.current.style.setProperty('--mouse-x-1', `${normalizedMouseX * MAX_CIRCLE_MOUSE_OFFSET}`);
      circle1Ref.current.style.setProperty('--mouse-y-1', `${normalizedMouseY * MAX_CIRCLE_MOUSE_OFFSET}`);
      circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.75)}`);
      circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.75)}`);
      applyTransforms();
    });
  }, [applyTransforms]);

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
    applyTransforms();
  }, [applyTransforms]);

  useEffect(() => {
    ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop =>
        circle1Ref.current?.style.setProperty(prop, '0')
    );
    ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop =>
        circle2Ref.current?.style.setProperty(prop, '0')
    );
    applyTransforms();
  }, [applyTransforms]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background [transform-style:preserve-3d]"
    >
      <div
        ref={circle1Ref}
        className="absolute -z-10 top-[5%] right-[-20%] w-[55rem] h-[70rem] md:w-[70rem] md:h-[85rem] bg-primary/15 dark:bg-primary/10 rounded-[45%/55%] filter blur-[220px] md:blur-[290px] opacity-40 dark:opacity-30"
      ></div>
      <div
        ref={circle2Ref}
        className="absolute -z-10 bottom-[-10%] left-[-25%] w-[65rem] h-[60rem] md:w-[80rem] md:h-[75rem] bg-accent/10 dark:bg-accent/5 rounded-[55%/40%] filter blur-[200px] md:blur-[270px] opacity-50 dark:opacity-40"
      ></div>

      <div
        ref={contentWrapperRef}
        className="container mx-auto px-4 md:px-6 py-16 transition-transform duration-150 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatedSection animationType="fadeInLeft" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">🌟 Core Competencies</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Key skills and expertise I bring to the table.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillsData.map((skill, index) => {
            const IconComponent = skillIcons[skill.name] || Lightbulb;
            return (
            <AnimatedSection key={skill.id} animationType="scaleIn" delay={`delay-${200 + index * 50}` as `delay-${number}`}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-md border-border/40 p-1 group">
                 <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="p-3 bg-accent/10 rounded-full mb-4 group-hover:bg-accent/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-accent group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{skill.name}</h3>
                    {skill.description && <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>}
                 </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
        </div>
      </div>
    </section>
  );
}
