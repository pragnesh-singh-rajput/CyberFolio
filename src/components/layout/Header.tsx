
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ShieldCheck, Home, User, GraduationCap, Briefcase, Mail, Building2 } from 'lucide-react';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#experience', label: 'Experience', icon: Building2 },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Effect to handle smooth scrolling for hash links, especially with scroll-snap
  useEffect(() => {
    const handleHashLinkClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        event.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
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
    // Render a simplified header or null during SSR to avoid hydration mismatch for Sheet
    // For scroll-snap, it's better to render something to maintain layout consistency
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm h-16">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <ShieldCheck className="h-7 w-7 text-accent" />
            <span>Pragnesh</span>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm h-16">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <span>Pragnesh</span>
        </Link>
        
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 px-3 py-2 rounded-md">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col gap-6">
                <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-primary">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  <span>Pragnesh</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose key={item.label} asChild>
                       <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
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
