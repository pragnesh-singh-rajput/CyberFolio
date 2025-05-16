
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

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.2}px)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.1}px)`;
      }
    };
    
    handleScroll(); // Initial call

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8"
    >
      {/* Background Gradient Circles */}
      <div ref={circle1Ref} className="absolute -z-10 top-[-10%] left-[-15%] w-[25rem] h-[25rem] md:w-[35rem] md:h-[35rem] bg-accent/30 rounded-full filter blur-[100px] md:blur-[150px] opacity-50"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[-15%] right-[-10%] w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] bg-primary/20 rounded-full filter blur-[90px] md:blur-[140px] opacity-60"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection animationType="scaleIn" delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              👋 Hello, I&apos;m <span className="text-accent">Pragnesh Singh Rajput</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay="delay-300" className="max-w-3xl">
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              A passionate 4th-year B.Tech CSE student specializing in Cyber Security.
              I am dedicated to exploring the intricacies of digital defense, threat analysis, and secure system design.
              My goal is to leverage cutting-edge technology and innovative strategies to contribute to a safer digital world.
            </p>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInUp" delay="delay-500" className="mt-8">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="#contact">
                🚀 Get In Touch
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
