
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { TechSkill } from '@/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Code, Database, Settings, Shield, Brain } from 'lucide-react'; 
import { cn } from '@/lib/utils';

const techSkillsData: TechSkill[] = [
  { id: 'ts1', name: 'Python', category: 'Languages', icon: Code, proficiency: 90 },
  { id: 'ts2', name: 'JavaScript', category: 'Languages', icon: Code, proficiency: 85 },
  { id: 'ts3', name: 'Java', category: 'Languages', icon: Code, proficiency: 75 },
  { id: 'ts4', name: 'C/C++', category: 'Languages', icon: Code, proficiency: 70 },
  { id: 'ts5', name: 'Bash', category: 'Languages', icon: Code, proficiency: 80 },
  { id: 'ts6', name: 'React', category: 'Frameworks & Libraries', icon: Brain, proficiency: 80 },
  { id: 'ts7', name: 'Next.js', category: 'Frameworks & Libraries', icon: Brain, proficiency: 78 },
  { id: 'ts8', name: 'Node.js', category: 'Frameworks & Libraries', icon: Brain, proficiency: 70 },
  { id: 'ts9', name: 'Flask/Django', category: 'Frameworks & Libraries', icon: Brain, proficiency: 75 },
  { id: 'ts10', name: 'Tailwind CSS', category: 'Frameworks & Libraries', icon: Brain, proficiency: 85 },
  { id: 'ts11', name: 'SQL (MySQL, PostgreSQL)', category: 'Databases', icon: Database, proficiency: 80 },
  { id: 'ts12', name: 'MongoDB', category: 'Databases', icon: Database, proficiency: 70 },
  { id: 'ts13', name: 'Git & GitHub', category: 'Tools & Platforms', icon: Settings, proficiency: 90 },
  { id: 'ts14', name: 'Docker', category: 'Tools & Platforms', icon: Settings, proficiency: 70 },
  { id: 'ts15', name: 'AWS (EC2, S3, Lambda)', category: 'Tools & Platforms', icon: Settings, proficiency: 65 },
  { id: 'ts16', name: 'Linux OS', category: 'Tools & Platforms', icon: Settings, proficiency: 85 },
  { id: 'ts17', name: 'Nmap', category: 'Cybersecurity', icon: Shield, proficiency: 80 },
  { id: 'ts18', name: 'Wireshark', category: 'Cybersecurity', icon: Shield, proficiency: 75 },
  { id: 'ts19', name: 'Metasploit', category: 'Cybersecurity', icon: Shield, proficiency: 70 },
  { id: 'ts20', name: 'Burp Suite', category: 'Cybersecurity', icon: Shield, proficiency: 70 },
  { id: 'ts21', name: 'SIEM Tools (Splunk basics)', category: 'Cybersecurity', icon: Shield, proficiency: 60 },
];

const MAX_CONTENT_ROTATION = 3;
const MAX_CIRCLE_MOUSE_OFFSET = 8;

export default function TechStackSection() {
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
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.2)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.15)`;
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

        if (circle1Ref.current) {
            circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.45}`);
            circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * -0.12}`);
            circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.022}`);
        }
        if (circle2Ref.current) {
            circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.28}`);
            circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * 0.15}`);
            circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * -0.018}`);
        }
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
          circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.7)}`);
          circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.7)}`);
      }
      applyTransforms();
    });
  }, [applyTransforms, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !contentWrapperRef.current) return;
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
  
  const categories = Array.from(new Set(techSkillsData.map(skill => skill.category)));

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background [transform-style:preserve-3d]"
    >
      {!isMobile && (
        <>
          <div
            ref={circle1Ref}
            className="absolute -z-10 top-[10%] left-[-25%] w-[80rem] h-[70rem] md:w-[85rem] md:h-[75rem] bg-accent/15 dark:bg-accent/10 rounded-[60%/40%] filter blur-[300px] md:blur-[370px] opacity-70 dark:opacity-60"
          ></div>
          <div
            ref={circle2Ref}
            className="absolute -z-10 bottom-[5%] right-[-30%] w-[75rem] h-[80rem] md:w-[80rem] md:h-[85rem] bg-primary/10 dark:bg-primary/5 rounded-[40%/55%] filter blur-[290px] md:blur-[360px] opacity-65 dark:opacity-55"
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
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">💻 My Tech Arsenal</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            A glimpse into the technologies and tools I work with.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, catIndex) => (
            <AnimatedSection key={category} animationType="fadeInUp" delay={`delay-${200 + catIndex * 100}` as `delay-${number}`}>
              <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/90 backdrop-blur-md border-border/40">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-accent flex items-center gap-2">
                    {category === 'Languages' && <Code className="h-6 w-6" />}
                    {category === 'Frameworks & Libraries' && <Brain className="h-6 w-6" />}
                    {category === 'Databases' && <Database className="h-6 w-6" />}
                    {category === 'Tools & Platforms' && <Settings className="h-6 w-6" />}
                    {category === 'Cybersecurity' && <Shield className="h-6 w-6" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {techSkillsData.filter(skill => skill.category === category).map(skill => {
                    const IconComponent = skill.icon || Code; 
                    return (
                    <div key={skill.id} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-foreground/90 font-medium">{skill.name}</span>
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      {skill.proficiency && (
                        <Progress value={skill.proficiency} className="h-2 bg-primary/30" indicatorClassName="bg-gradient-to-r from-primary to-accent" />
                      )}
                    </div>
                  )})}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

    