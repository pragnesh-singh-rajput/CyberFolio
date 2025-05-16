
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { useEffect, useRef, useState } from 'react';

export default function EducationSection() {
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
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.32}px) translateX(-${scrollProgress * 0.06}px) rotate(${scrollProgress * 0.018}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.22}px) translateX(${scrollProgress * 0.07}px) rotate(-${scrollProgress * 0.01}deg)`;
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
      id="education"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-background"
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[5%] left-[-25%] w-[35rem] h-[50rem] md:w-[45rem] md:h-[65rem] bg-accent/55 rounded-full filter blur-[120px] md:blur-[170px] opacity-75 transition-transform duration-500 ease-out"
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[0%] right-[-20%] w-[40rem] h-[35rem] md:w-[55rem] md:h-[50rem] bg-foreground/20 rounded-full filter blur-[100px] md:blur-[160px] opacity-65 transition-transform duration-500 ease-out"
      ></div>

      <div className="container mx-auto px-4 md:px-6 py-16">
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
                  <span>Sagar Institute of Science and Technology, Bhopal</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  <span>Expected May 2025 - Currently in 4th Year</span>
                </div>
                <p className="text-foreground/90 pt-3 text-base leading-relaxed">
                  Pursuing a comprehensive curriculum focused on core computer science principles with an advanced specialization in cyber security. Coursework includes network security, cryptography, ethical hacking, digital forensics, and secure software development. Actively involved in technical communities and coding challenges.
                </p>
                 <p className="text-md text-accent font-semibold pt-2 text-center sm:text-left">CGPA: 8.1 / 10.0</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
