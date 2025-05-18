
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const MAX_CONTENT_ROTATION = 7; 
const MAX_CIRCLE_MOUSE_OFFSET = 20; 

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  
  const scrollParallaxFrameIdRef = useRef<number | null>(null);
  const mouseParallaxFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  const applyCircleTransforms = useCallback(() => {
    if (circle1Ref.current) {
        const scrollY1 = parseFloat(circle1Ref.current.style.getPropertyValue('--scroll-y-1') || '0');
        const scrollX1 = parseFloat(circle1Ref.current.style.getPropertyValue('--scroll-x-1') || '0');
        const scrollRotate1 = parseFloat(circle1Ref.current.style.getPropertyValue('--scroll-rotate-1') || '0');
        const mouseX1 = parseFloat(circle1Ref.current.style.getPropertyValue('--mouse-x-1') || '0');
        const mouseY1 = parseFloat(circle1Ref.current.style.getPropertyValue('--mouse-y-1') || '0');
        circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.35)`;
    }
    if (circle2Ref.current) {
        const scrollY2 = parseFloat(circle2Ref.current.style.getPropertyValue('--scroll-y-2') || '0');
        const scrollX2 = parseFloat(circle2Ref.current.style.getPropertyValue('--scroll-x-2') || '0');
        const scrollRotate2 = parseFloat(circle2Ref.current.style.getPropertyValue('--scroll-rotate-2') || '0');
        const mouseX2 = parseFloat(circle2Ref.current.style.getPropertyValue('--mouse-x-2') || '0');
        const mouseY2 = parseFloat(circle2Ref.current.style.getPropertyValue('--mouse-y-2') || '0');
        circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.3)`;
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;
    const parallaxUpdateRef = scrollParallaxFrameIdRef;

    const performScrollParallaxUpdate = () => {
      if (!sectionRef.current || !scrollContainer) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.45}`);
        circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.15}`);
        circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * 0.025}`);
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.3}`);
        circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.16}`);
        circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * -0.018}`);
      }
      applyCircleTransforms();
      parallaxUpdateRef.current = null;
    };
    
    const handleScroll = () => {
      if (parallaxUpdateRef.current) cancelAnimationFrame(parallaxUpdateRef.current);
      parallaxUpdateRef.current = requestAnimationFrame(performScrollParallaxUpdate);
    };
    
    if (scrollContainer) {
      handleScroll(); 
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      if (parallaxUpdateRef.current) cancelAnimationFrame(parallaxUpdateRef.current);
    };
  }, [scrollContainer, applyCircleTransforms]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current || !contentWrapperRef.current || !circle1Ref.current || !circle2Ref.current) return;
    if (mouseParallaxFrameIdRef.current) cancelAnimationFrame(mouseParallaxFrameIdRef.current);
    const mouseUpdateRef = mouseParallaxFrameIdRef;

    mouseUpdateRef.current = requestAnimationFrame(() => {
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
            contentWrapperRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
        
        if (circle1Ref.current) {
            circle1Ref.current.style.setProperty('--mouse-x-1', `${normalizedMouseX * MAX_CIRCLE_MOUSE_OFFSET}`);
            circle1Ref.current.style.setProperty('--mouse-y-1', `${normalizedMouseY * MAX_CIRCLE_MOUSE_OFFSET}`);
        }
        if (circle2Ref.current) {
            circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.7)}`);
            circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.7)}`);
        }
        applyCircleTransforms();
    });
  };

  const handleMouseLeave = () => {
    if (mouseParallaxFrameIdRef.current) cancelAnimationFrame(mouseParallaxFrameIdRef.current);
    if (contentWrapperRef.current) {
      contentWrapperRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (circle1Ref.current) {
        circle1Ref.current.style.setProperty('--mouse-x-1', `0`);
        circle1Ref.current.style.setProperty('--mouse-y-1', `0`);
    }
    if (circle2Ref.current) {
        circle2Ref.current.style.setProperty('--mouse-x-2', `0`);
        circle2Ref.current.style.setProperty('--mouse-y-2', `0`);
    }
    applyCircleTransforms();
  };
  
  useEffect(() => {
    if (circle1Ref.current) {
        ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop => 
            circle1Ref.current!.style.setProperty(prop, '0')
        );
    }
    if (circle2Ref.current) {
         ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop => 
            circle2Ref.current!.style.setProperty(prop, '0')
        );
    }
    applyCircleTransforms(); 
  }, [applyCircleTransforms]);


  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8 [transform-style:preserve-3d] bg-background"
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-25%] left-[-30%] w-[70rem] h-[60rem] md:w-[80rem] md:h-[70rem] bg-pink-500/60 dark:bg-pink-700/50 rounded-[60%/45%] filter blur-[250px] md:blur-[320px] opacity-80 dark:opacity-70 transition-transform duration-300 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-30%] right-[-25%] w-[60rem] h-[70rem] md:w-[70rem] md:h-[80rem] bg-purple-500/50 dark:bg-purple-800/45 rounded-[45%/55%] filter blur-[240px] md:blur-[310px] opacity-75 dark:opacity-65 transition-transform duration-300 ease-out"
      ></div>

      <div
        ref={contentWrapperRef}
        className="container mx-auto px-4 md:px-6 transition-transform duration-150 ease-out" 
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection animationType="scaleIn" delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="inline-block group-hover:animate-pulse-subtle">👋</span> Hello, I&apos;m{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-500 bg-[length:200%_auto] animate-gradient-x"
              >
                PK Singh
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay="delay-300" className="max-w-3xl">
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl">
              A passionate 4th-year B.Tech CSE student specializing in Cyber Security.
              I am dedicated to exploring the intricacies of digital defense, threat analysis, and secure system design.
              My goal is to leverage cutting-edge technology and innovative strategies to contribute to a safer digital world.
            </p>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay="delay-500" className="mt-10">
             <Button 
              asChild 
              size="lg" 
              className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-accent via-teal-500 to-emerald-600 text-accent-foreground group bg-[length:200%_auto]"
            >
              <Link href="#contact">
                🚀 Get In Touch
                <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

