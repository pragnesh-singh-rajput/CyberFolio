
"use client";
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: `delay-${number}`; // e.g., 'delay-200'
  id?: string;
  animationType?: AnimationType;
}

export default function AnimatedSection({
  children,
  className,
  delay,
  id,
  animationType = 'fadeInUp', // Default animation
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Set visibility based on intersection status
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible/hidden
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const getAnimationClasses = () => {
    if (isVisible) {
      switch (animationType) {
        case 'fadeInLeft':
          return 'opacity-100 translate-x-0';
        case 'fadeInRight':
          return 'opacity-100 translate-x-0';
        case 'scaleIn':
          return 'opacity-100 scale-100';
        case 'fadeInUp':
        default:
          return 'opacity-100 translate-y-0';
      }
    } else {
      // These are the "initial" or "exit" states
      switch (animationType) {
        case 'fadeInLeft':
          return 'opacity-0 -translate-x-20';
        case 'fadeInRight':
          return 'opacity-0 translate-x-20';
        case 'scaleIn':
          return 'opacity-0 scale-95';
        case 'fadeInUp':
        default:
          return 'opacity-0 translate-y-10';
      }
    }
  };

  return (
    <div
      id={id}
      ref={sectionRef}
      className={cn(
        'transition-all duration-1000 ease-in-out transform', // Duration applies to both enter and exit
        getAnimationClasses(),
        delay, // Tailwind delay class for transition-delay (applies on enter)
        className
      )}
    >
      {children}
    </div>
  );
}
