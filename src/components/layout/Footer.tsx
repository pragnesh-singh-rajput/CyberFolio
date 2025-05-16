
"use client";

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {currentYear !== null ? currentYear : new Date().getFullYear()} CyberFolio. All rights reserved.</p>
          <p>Designed and Developed by PK. Singh</p>
        </div>
      </div>
    </footer>
  );
}
