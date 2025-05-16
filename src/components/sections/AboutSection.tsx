
"use client";

import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.4}px) translateX(${scrollProgress * 0.1}px) rotate(${scrollProgress * 0.022}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.25}px) translateX(-${scrollProgress * 0.12}px) rotate(-${scrollProgress * 0.014}deg)`;
      }
      animationFrameIdRef.current = null;
    };

    const handleScroll = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(performParallaxUpdate);
    };

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
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8"
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[0%] right-[-25%] w-[50rem] h-[40rem] md:w-[65rem] md:h-[50rem] bg-accent/30 dark:bg-accent/40 rounded-full filter blur-[140px] md:blur-[190px] opacity-50 dark:opacity-60 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[5%] left-[-20%] w-[35rem] h-[45rem] md:w-[45rem] md:h-[60rem] bg-foreground/10 dark:bg-foreground/15 rounded-full filter blur-[130px] md:blur-[180px] opacity-40 dark:opacity-50 transition-transform duration-500 ease-out"
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
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
