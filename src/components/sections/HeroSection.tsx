
"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const performParallaxUpdate = () => {
      if (!sectionRef.current) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport; 

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.45}px) translateX(${scrollProgress * 0.15}px) rotate(${scrollProgress * 0.025}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.3}px) translateX(-${scrollProgress * 0.16}px) rotate(-${scrollProgress * 0.018}deg)`;
      }
      animationFrameIdRef.current = null;
    };
    
    const handleScroll = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(performParallaxUpdate);
    };
    
    // Initial call to set position based on current scroll
    handleScroll(); 

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [scrollContainer]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8"
    >
      {/* Background Gradient Ellipses */}
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-25%] left-[-30%] w-[50rem] h-[40rem] md:w-[65rem] md:h-[50rem] bg-accent/40 dark:bg-accent/50 rounded-full filter blur-[130px] md:blur-[180px] opacity-60 dark:opacity-70 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-30%] right-[-25%] w-[40rem] h-[50rem] md:w-[55rem] md:h-[65rem] bg-primary/20 dark:bg-primary/30 rounded-full filter blur-[120px] md:blur-[170px] opacity-50 dark:opacity-60 transition-transform duration-500 ease-out"
      ></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection animationType="scaleIn" delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="inline-block group-hover:animate-pulse-subtle">👋</span> Hello, I&apos;m{' '}
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-teal-400 to-emerald-500" 
                style={{backgroundSize: '200% auto'}}
              >
                PragneshKumar Singh
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
              className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-accent via-teal-500 to-emerald-600 text-accent-foreground group"
              style={{backgroundSize: '200% auto'}}
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
