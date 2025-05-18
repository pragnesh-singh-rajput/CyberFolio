
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
      let currentMostVisibleId: string | null = null;
      let maxRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Consider the section that has the largest intersection area
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            currentMostVisibleId = entry.target.id;
          }
        }
      });

      // Only update if a section is significantly visible (e.g., >= 40% of it is in the "detection zone")
      // and it's different from the current active section
      if (currentMostVisibleId && maxRatio >= 0.4) { 
        if (activeSection !== currentMostVisibleId) {
          setActiveSection(currentMostVisibleId);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: scrollContainer, // Use the found scroll container as the root
      threshold: [0.4, 0.5, 0.6, 0.7, 0.8], // Array of thresholds for more granular updates
      rootMargin: "-40% 0px -40% 0px" // Observe a central band of the viewport
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
  }, [scrollContainer]); // Rerun when scrollContainer is found. navItems is static.

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
