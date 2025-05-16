import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function HeroSection() {
  return (
    <div id="home" className="py-16 md:py-24 lg:py-32 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <AnimatedSection delay="delay-100" className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Hello, I&apos;m <span className="text-accent">Your Name</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              A passionate 4th-year B.Tech CSE student specializing in Cyber Security. 
              I am dedicated to exploring the intricacies of digital defense, threat analysis, and secure system design. 
              My goal is to leverage cutting-edge technology and innovative strategies to contribute to a safer digital world.
            </p>
          </AnimatedSection>
          <AnimatedSection delay="delay-300" className="mt-8">
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="#contact">
                Get In Touch
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
