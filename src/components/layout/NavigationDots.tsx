
"use client";

import { useState, useEffect, useRef } from 'react';
// Link import removed as it's not used directly for navigation here
import { navItems } from './Header'; 
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState<string | null>(navItems.length > 0 ? navItems[0].id : null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // Effect to find the scroll container element
  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    if (mainElement) {
      setScrollContainer(mainElement);
    }
  }, []); // Runs once on component mount to find the container

  useEffect(() => {
    if (!scrollContainer || navItems.length === 0) {
      return; 
    }

    sectionRefs.current = navItems.map(item => document.getElementById(item.id));
    
    const callback: IntersectionObserverCallback = (entries) => {
      let newActiveSectionId: string | null = null;
      let highestIntersectionRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > highestIntersectionRatio) {
            highestIntersectionRatio = entry.intersectionRatio;
            newActiveSectionId = entry.target.id;
          }
        }
      });

      // If we found an intersecting section with the highest ratio, and that ratio is significant enough
      if (newActiveSectionId && highestIntersectionRatio >= 0.1) { // Activate if at least 10% visible in the rootMargin-defined area
        setActiveSection(newActiveSectionId);
      }
    };

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(callback, {
      root: scrollContainer, // Use the found scroll container as the root
      threshold: 0.1, // Trigger when 10% of the section is visible within the rootMargin
      rootMargin: "-20% 0px -20% 0px" // Observe a central band (middle 60%) of the viewport
    });

    const currentObserver = observerRef.current;

    sectionRefs.current.forEach(sectionEl => {
      if (sectionEl) {
        currentObserver.observe(sectionEl);
      }
    });

    return () => {
      sectionRefs.current.forEach(sectionEl => {
        if (sectionEl && currentObserver) {
          currentObserver.unobserve(sectionEl);
        }
      });
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [scrollContainer]); 

  const handleDotClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId); // Immediately update for responsiveness on click
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 p-2 bg-card/30 backdrop-blur-sm rounded-full border border-border/50 shadow-lg">
        {navItems.map((item) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <button
                onClick={() => handleDotClick(item.id)}
                aria-label={`Scroll to ${item.label}`}
                className={cn(
                  "h-3 w-3 rounded-full border-2 transition-all duration-300 ease-in-out",
                  "hover:bg-accent hover:border-accent",
                  activeSection === item.id
                    ? "bg-accent border-accent scale-125"
                    : "bg-muted/50 border-muted-foreground/50"
                )}
                data-cursor-interactive
              />
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-card/80 backdrop-blur-md text-foreground border-border/70 shadow-md">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
}
