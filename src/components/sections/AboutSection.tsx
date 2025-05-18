
"use client";

import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';

const MAX_CONTENT_ROTATION = 4;
const MAX_CIRCLE_MOUSE_OFFSET = 10;

export default function AboutSection() {
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
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.1)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.05)`;
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !scrollContainer) return;
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        if (circle1Ref.current) {
          circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.5}`);
          circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.12}`);
          circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.025}`);
        }
        if (circle2Ref.current) {
          circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.3}`);
          circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.15}`);
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
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8 [transform-style:preserve-3d]"
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[0%] right-[-25%] w-[50rem] h-[40rem] md:w-[65rem] md:h-[50rem] bg-primary/20 dark:bg-primary/15 rounded-[50%/40%] filter blur-[160px] md:blur-[210px] opacity-50 dark:opacity-40 transition-transform duration-300 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[5%] left-[-20%] w-[35rem] h-[45rem] md:w-[45rem] md:h-[60rem] bg-[hsl(220_70%_60%_/_0.15)] dark:bg-[hsl(220_70%_60%_/_0.1)] rounded-[60%/50%] filter blur-[150px] md:blur-[200px] opacity-40 dark:opacity-30 transition-transform duration-300 ease-out"
      ></div>
      
      <div 
        ref={contentWrapperRef}
        className="container mx-auto px-4 md:px-6 lg:px-8 py-16 transition-transform duration-150 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatedSection animationType="fadeInLeft" delay="delay-100" className="w-full mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl mb-6">🧐 About Me</h2>
        </AnimatedSection>
        <AnimatedSection animationType="fadeInRight" delay="delay-300" className="w-full">
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A highly motivated and detail-oriented B.Tech Computer Science student specializing in Cybersecurity, 
            with a strong foundation in network security, ethical hacking, and digital forensics. 
            Passionate about leveraging technical skills to develop robust security solutions and mitigate cyber threats. 
            Eager to contribute to a dynamic organization where I can apply my knowledge and continue to grow in the cybersecurity field.
            Actively seeking opportunities to expand practical experience in threat intelligence, incident response, and secure software development.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
    
