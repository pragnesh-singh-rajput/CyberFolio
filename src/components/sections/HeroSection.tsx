
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.25}px) translateX(${scrollProgress * 0.05}px) rotate(${scrollProgress * 0.01}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.15}px) translateX(-${scrollProgress * 0.05}px) rotate(-${scrollProgress * 0.005}deg)`;
      }
    };
    
    handleScroll(); 

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
      {/* Background Gradient Circles - increased opacity and blur */}
      <div ref={circle1Ref} className="absolute -z-10 top-[-15%] left-[-20%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-accent/30 rounded-full filter blur-[120px] md:blur-[180px] opacity-60 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[-20%] right-[-15%] w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-primary/25 rounded-full filter blur-[110px] md:blur-[170px] opacity-70 transition-transform duration-500 ease-out"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection animationType="scaleIn" delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              👋 Hello, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-400 animate-gradient-x">Pragnesh Singh Rajput</span>
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
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-accent to-teal-600 hover:from-teal-600 hover:to-accent text-accent-foreground">
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

// Add this to tailwind.config.js keyframes and animation if not present
// keyframes: {
//   'gradient-x': {
//     '0%, 100%': { 'background-position': '0% 50%' },
//     '50%': { 'background-position': '100% 50%' },
//   },
// }
// animation: {
//   'gradient-x': 'gradient-x 3s ease infinite',
// }
// Make sure bg-gradient-to-r from-accent to-teal-400 has appropriate background-size for animation
// e.g. style={{ backgroundSize: '200% 200%' }} or via a utility class if Tailwind v3.1+
// For simplicity, direct utility classes `animate-gradient-x` assumes a pre-configured animation.
// If not available, this specific gradient animation might not work out of box without config.
// Let's assume it means a static gradient for now.
