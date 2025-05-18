
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Menu, ShieldCheck, Home, User, GraduationCap, Briefcase, Mail, Building2, Cpu, Star, Award } from 'lucide-react';
import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { id: 'home', href: '#home', label: 'Home', icon: Home },
  { id: 'about', href: '#about', label: 'About', icon: User },
  { id: 'education', href: '#education', label: 'Education', icon: GraduationCap },
  { id: 'experience', href: '#experience', label: 'Experience', icon: Building2 },
  { id: 'tech-stack', href: '#tech-stack', label: 'Tech Stack', icon: Cpu },
  { id: 'skills', href: '#skills', label: 'Skills', icon: Star },
  { id: 'projects', href: '#projects', label: 'Projects', icon: Briefcase },
  { id: 'certifications', href: '#certifications', label: 'Certs', icon: Award },
  { id: 'contact', href: '#contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const elementId = href.substring(1);
        const element = document.getElementById(elementId);
        const mainScrollContainer = document.querySelector('.parallax-scroll-container');

        if (element && mainScrollContainer) {
          const headerOffset = document.querySelector('header')?.offsetHeight || 0;
          const elementPosition = element.offsetTop - headerOffset;
          
          mainScrollContainer.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        } else if (element) { // Fallback if main scroll container not found immediately
           element.scrollIntoView({ behavior: 'smooth' });
        }

        if (isSheetOpen) {
          setIsSheetOpen(false);
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleHashLinkClick as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleHashLinkClick as EventListener);
      });
    };
  }, [isSheetOpen]);


  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm h-16">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <ShieldCheck className="h-7 w-7 text-accent" />
            <span>CyberFolio</span>
          </div>
          <div> 
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50 shadow-md h-16">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors duration-300 ease-in-out group">
          <ShieldCheck className="h-7 w-7 text-accent group-hover:animate-pulse" />
          <span>PK Singh</span>
        </Link>

        <div> 
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent/10 focus:ring-2 focus:ring-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background/95 backdrop-blur-md p-6 border-l-accent/50">
              <div className="flex flex-col gap-6">
                <SheetTitle asChild>
                  <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-primary group" onClick={() => setIsSheetOpen(false)}>
                    <ShieldCheck className="h-6 w-6 text-accent group-hover:animate-pulse" />
                    <span>PK Singh</span>
                  </Link>
                </SheetTitle>
                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <SheetClose key={item.label} asChild>
                       <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-md p-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 ease-in-out text-base"
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
