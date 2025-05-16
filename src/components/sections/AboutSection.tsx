
"use client";

import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

export default function AboutSection() {
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.28}px) translateX(${scrollProgress * 0.05}px) rotate(${scrollProgress * 0.018}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.18}px) translateX(-${scrollProgress * 0.06}px) rotate(-${scrollProgress * 0.01}deg)`;
      }
    };

    handleScroll(); 

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
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
        className="absolute -z-10 top-[0%] right-[-20%] w-[40rem] h-[30rem] md:w-[55rem] md:h-[40rem] bg-secondary/45 rounded-full filter blur-[120px] md:blur-[180px] opacity-65 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[5%] left-[-15%] w-[25rem] h-[38rem] md:w-[35rem] md:h-[50rem] bg-primary/35 rounded-full filter blur-[110px] md:blur-[170px] opacity-75 transition-transform duration-500 ease-out"
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16">
        <AnimatedSection animationType="fadeInLeft" delay="delay-100" className="w-full mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl mb-6">🧐 About Me</h2>
        </AnimatedSection>
        <AnimatedSection animationType="fadeInRight" delay="delay-300" className="w-full">
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground sm:text-xl">
            As a dedicated Cyber Security enthusiast currently in my final year of B.Tech in Computer Science and Engineering,
            I am deeply invested in the ever-evolving landscape of digital security. My academic journey has equipped me with a strong foundation
            in network protocols, cryptography, ethical hacking, and secure software development practices. I am passionate about identifying vulnerabilities,
            mitigating risks, and architecting robust security solutions. I thrive on challenges and continuously seek opportunities to expand my knowledge and practical skills
            in areas like threat intelligence, incident response, and cloud security. My objective is to contribute meaningfully to creating a more secure and resilient digital infrastructure.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
