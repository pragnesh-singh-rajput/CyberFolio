
"use client";
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import TechStackSection from '@/components/sections/TechStackSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import NavigationDots from '@/components/layout/NavigationDots';

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Prevent browser from automatically restoring scroll position
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Scroll the main content area to the top
      const mainScrollContainer = document.querySelector('.parallax-scroll-container');
      if (mainScrollContainer) {
        mainScrollContainer.scrollTop = 0;
      } else {
        // Fallback if the specific container isn't found immediately
        window.scrollTo(0, 0);
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground relative">
      <Header />
      <NavigationDots />
      <main
        className="flex-1 overflow-y-auto scroll-pt-16 parallax-scroll-container"
      >
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <TechStackSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
