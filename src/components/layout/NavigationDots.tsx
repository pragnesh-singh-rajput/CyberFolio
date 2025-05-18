
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { navItems } from './Header'; // Reuse navItems from Header
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mainScrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mainContainer = document.querySelector('.parallax-scroll-container') as HTMLElement | null;
    if (mainContainer) {
      mainScrollContainerRef.current = mainContainer;
    }

    sectionRefs.current = navItems.map(item => document.getElementById(item.id));
    
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(callback, {
      root: mainScrollContainerRef.current, // Observe within the main scrolling container
      threshold: 0.5, // Trigger when 50% of the section is visible
      rootMargin: "-40% 0px -40% 0px" // Adjust rootMargin to bias towards the center of the viewport
    });

    sectionRefs.current.forEach(section => {
      if (section) {
        observerRef.current?.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) {
          observerRef.current?.unobserve(section);
        }
      });
      observerRef.current?.disconnect();
    };
  }, []);

  const handleDotClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && mainScrollContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
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
