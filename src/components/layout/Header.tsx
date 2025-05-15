"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ShieldCheck, Home, User, GraduationCap, Briefcase, Mail } from 'lucide-react';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { href: '#home', label: 'Home', icon: Home },
  { href: '#about', label: 'About', icon: User },
  { href: '#education', label: 'Education', icon: GraduationCap },
  { href: '#projects', label: 'Projects', icon: Briefcase },
  { href: '#contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null; // Avoid rendering mismatch during hydration
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2 text-xl font-bold text-primary hover:text-accent transition-colors">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <span>CyberFolio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 px-3 py-2 rounded-md">
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
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
                <Link href="#home" className="flex items-center gap-2 text-lg font-bold text-primary" onClick={() => setIsSheetOpen(false)}>
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  <span>CyberFolio</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose key={item.label} asChild>
                       <Link
                        href={item.href}
                        className="flex items-center gap-3 rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsSheetOpen(false)}
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
