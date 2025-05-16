
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, CalendarDays, MapPin } from 'lucide-react';
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
      id="education"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5"
    >
      {/* Background Gradient Circles */}
      <div ref={circle1Ref} className="absolute -z-10 top-[10%] left-[-20%] w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-accent/20 rounded-full filter blur-[110px] md:blur-[170px] opacity-40"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[5%] right-[-15%] w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem] bg-primary/15 rounded-full filter blur-[100px] md:blur-[160px] opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection animationType="fadeInLeft" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">My Education</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            My academic journey in the field of computer science and cyber security.
          </p>
        </AnimatedSection>
        <div className="flex justify-center">
          <AnimatedSection animationType="fadeInRight" delay="delay-300" className="w-full max-w-2xl">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="bg-accent p-3 rounded-full">
                  <GraduationCap className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-semibold text-primary">
                    Bachelor of Technology (B.Tech) in Computer Science & Engineering
                  </CardTitle>
                  <CardDescription className="text-md text-muted-foreground">
                    Specialization in Cyber Security
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Sagar Institute of Science and Technology, Bhopal</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>Expected May 2025 - Currently in 4th Year</span>
                </div>
                <p className="text-foreground/90 pt-2">
                  Pursuing a comprehensive curriculum focused on core computer science principles with an advanced specialization in cyber security. Coursework includes network security, cryptography, ethical hacking, digital forensics, and secure software development. Actively involved in technical communities and coding challenges.
                </p>
                 <p className="text-sm text-accent font-medium">CGPA: 8.1/10.0</p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
