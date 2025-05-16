
"use client";
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  useEffect(() => {
    // On initial mount, scroll to the top/hero section.
    // This helps override browser's scroll restoration to ensure a consistent starting point.
    if (typeof window !== 'undefined') {
      const homeElement = document.getElementById('home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'auto' }); // 'auto' for an instant jump
      } else {
        // Fallback if #home is somehow not found
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      <Header />
      <main 
        className="flex-1 overflow-y-auto scroll-pt-16 parallax-scroll-container"
      >
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
