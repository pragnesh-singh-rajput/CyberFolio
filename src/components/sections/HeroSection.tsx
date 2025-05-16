
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
      // scrollProgress will be positive when scrolling down and section is approaching/in view
      // and negative when section has been scrolled past (upwards).
      const scrollProgress = -sectionTopInViewport; 

      if (circle1Ref.current) {
        // More pronounced vertical parallax, subtle horizontal/rotation
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.25}px) translateX(${scrollProgress * 0.02}px) rotate(${scrollProgress * 0.01}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.15}px) translateX(-${scrollProgress * 0.03}px) rotate(-${scrollProgress * 0.005}deg)`;
      }
    };
    
    handleScroll(); // Initial call to set position

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
      <div ref={circle1Ref} className="absolute -z-10 top-[-15%] left-[-20%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-accent/40 rounded-full filter blur-[140px] md:blur-[200px] opacity-60 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[-20%] right-[-15%] w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-primary/35 rounded-full filter blur-[130px] md:blur-[190px] opacity-70 transition-transform duration-500 ease-out"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection animationType="scaleIn" delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="inline-block animate-pulse-subtle">👋</span> Hello, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-400" style={{backgroundSize: '200% 200%'}}>Pragnesh Singh Rajput</span>
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
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-accent to-teal-600 hover:from-teal-600 hover:to-accent text-accent-foreground group">
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
