
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const MAX_CONTENT_ROTATION = 3;
const MAX_CIRCLE_MOUSE_OFFSET = 8;

export default function EducationSection() {
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

  const applyCircleTransforms = useCallback(() => {
    if (isMobile || !sectionRef.current) return;

    const scrollY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-y-1') || '0');
    const scrollX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-x-1') || '0');
    const scrollRotate1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-rotate-1') || '0');
    const mouseX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-x-1') || '0');
    const mouseY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-y-1') || '0');
    if (circle1Ref.current) {
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.15)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.1)`;
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

        circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.52}`);
        circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * -0.11}`);
        circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.023}`);
        
        circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.33}`);
        circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * 0.13}`);
        circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * -0.015}`);
        applyCircleTransforms();
      });
    };

    handleScroll(); 
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    };
  }, [scrollContainer, applyCircleTransforms, isMobile]);

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
            contentWrapperRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
        
        if (circle1Ref.current) {
            circle1Ref.current.style.setProperty('--mouse-x-1', `${normalizedMouseX * MAX_CIRCLE_MOUSE_OFFSET}`);
            circle1Ref.current.style.setProperty('--mouse-y-1', `${normalizedMouseY * MAX_CIRCLE_MOUSE_OFFSET}`);
        }
        if (circle2Ref.current) {
            circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
            circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
        }
        applyCircleTransforms();
    });
  }, [applyCircleTransforms, isMobile]);

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
    applyCircleTransforms();
  }, [applyCircleTransforms, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop => 
        circle1Ref.current?.style.setProperty(prop, '0')
    );
    ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop => 
        circle2Ref.current?.style.setProperty(prop, '0')
    );
    applyCircleTransforms();
  }, [applyCircleTransforms, isMobile]);

  return (
    <section
      id="education"
      ref={sectionRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background [transform-style:preserve-3d]"
    >
      {!isMobile && (
        <>
          <div 
            ref={circle1Ref} 
            className="absolute -z-10 top-[5%] left-[-30%] w-[60rem] h-[80rem] bg-accent/15 dark:bg-[hsl(45,80%,60%)]/10 rounded-[55%/45%] filter blur-[280px] opacity-40 dark:opacity-35 transition-transform duration-300 ease-out"
          ></div>
          <div 
            ref={circle2Ref} 
            className="absolute -z-10 bottom-[0%] right-[-25%] w-[70rem] h-[65rem] bg-primary/10 dark:bg-[hsl(230,60%,25%)]/5 rounded-[45%/55%] filter blur-[270px] opacity-40 dark:opacity-30 transition-transform duration-300 ease-out"
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
        <AnimatedSection animationType="fadeInLeft" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">📚 My Education</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            My academic journey in the field of computer science and cyber security.
          </p>
        </AnimatedSection>
        <div className="flex justify-center">
          <AnimatedSection animationType="scaleIn" delay="delay-300" className="w-full max-w-3xl">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out bg-card/90 backdrop-blur-md border-primary/20 transform hover:scale-[1.03]">
              <CardHeader className="flex flex-col items-center text-center gap-4 pb-4">
                <div className="bg-accent p-4 rounded-full shadow-lg">
                  <GraduationCap className="h-10 w-10 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-semibold text-primary sm:text-3xl">
                    Bachelor of Technology (B.Tech)
                  </CardTitle>
                  <CardDescription className="text-md text-muted-foreground mt-1 flex items-center justify-center gap-2">
                     <ShieldCheck className="h-5 w-5 text-accent"/> Computer Science & Engineering (Cyber Security)
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Parul Institute of Engineering and Technology, Parul University, Vadodara, Gujarat</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  <span>2022 - Expected May 2026 (Currently in Final Year)</span>
                </div>
                <p className="text-foreground/90 pt-3 text-base leading-relaxed">
                  Pursuing a comprehensive B.Tech in Computer Science with a specialization in Cybersecurity at Parul University.
                  Coursework includes advanced topics in network security, cryptography, ethical hacking, digital forensics,
                  and secure software development. Actively participating in coding competitions, technical workshops,
                  and cybersecurity awareness programs. Committed to continuous learning and staying updated with the latest industry trends.
                </p>
                {/* <p className="text-md text-accent font-semibold pt-2 text-center sm:text-left">CGPA: 8.1 / 10.0</p> */}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
    

    