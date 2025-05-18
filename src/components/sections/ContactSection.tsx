
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Linkedin, Github, Mail, Phone, Instagram } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useEffect, useRef, useState, useCallback } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, {message: "Name cannot exceed 50 characters."}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(100, {message: "Subject cannot exceed 100 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, {message: "Message cannot exceed 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const MAX_CONTENT_ROTATION = 3;
const MAX_CIRCLE_MOUSE_OFFSET = 8;

export default function ContactSection() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null); 
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const parallaxFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  const applyTransforms = useCallback(() => {
    if (isMobile || !sectionRef.current) return;

    const scrollY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-y-1') || '0');
    const scrollX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-x-1') || '0');
    const scrollRotate1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--scroll-rotate-1') || '0');
    const mouseX1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-x-1') || '0');
    const mouseY1 = parseFloat(circle1Ref.current?.style.getPropertyValue('--mouse-y-1') || '0');
    if (circle1Ref.current) {
      circle1Ref.current.style.transform = `translate(${scrollX1 + mouseX1}px, ${scrollY1 + mouseY1}px) rotate(${scrollRotate1}deg) scale(1.15)`;
    }

    const scrollY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-y-2') || '0');
    const scrollX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-x-2') || '0');
    const scrollRotate2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--scroll-rotate-2') || '0');
    const mouseX2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-x-2') || '0');
    const mouseY2 = parseFloat(circle2Ref.current?.style.getPropertyValue('--mouse-y-2') || '0');
    if (circle2Ref.current) {
      circle2Ref.current.style.transform = `translate(${scrollX2 + mouseX2}px, ${scrollY2 + mouseY2}px) rotate(${scrollRotate2}deg) scale(1.12)`;
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !scrollContainer || !sectionRef.current || !circle1Ref.current || !circle2Ref.current) return;
    
    const handleScroll = () => {
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
      parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !scrollContainer || !circle1Ref.current || !circle2Ref.current) return;
        const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -sectionTopInViewport;

        circle1Ref.current.style.setProperty('--scroll-y-1', `${scrollProgress * 0.55}`);
        circle1Ref.current.style.setProperty('--scroll-x-1', `${scrollProgress * 0.20}`);
        circle1Ref.current.style.setProperty('--scroll-rotate-1', `${scrollProgress * -0.023}`);
        
        circle2Ref.current.style.setProperty('--scroll-y-2', `${scrollProgress * 0.33}`);
        circle2Ref.current.style.setProperty('--scroll-x-2', `${scrollProgress * -0.18}`);
        circle2Ref.current.style.setProperty('--scroll-rotate-2', `${scrollProgress * 0.018}`);
        
        applyTransforms();
      });
    };
    
    handleScroll();
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll);
      if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    };
  }, [scrollContainer, applyTransforms, isMobile]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (isMobile || !sectionRef.current || !contentWrapperRef.current) return;
    
    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    parallaxFrameIdRef.current = requestAnimationFrame(() => {
        if (!sectionRef.current || !contentWrapperRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const mouseXInSection = event.clientX - rect.left;
        const mouseYInSection = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const normalizedMouseX = (mouseXInSection - centerX) / centerX; 
        const normalizedMouseY = (mouseYInSection - centerY) / centerY; 

        if (contentWrapperRef.current) {
            const rotateX = normalizedMouseY * -MAX_CONTENT_ROTATION;
            const rotateY = normalizedMouseX * MAX_CONTENT_ROTATION;
            contentWrapperRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
        }
        
        if (circle1Ref.current) {
          circle1Ref.current.style.setProperty('--mouse-x-1', `${normalizedMouseX * MAX_CIRCLE_MOUSE_OFFSET}`);
          circle1Ref.current.style.setProperty('--mouse-y-1', `${normalizedMouseY * MAX_CIRCLE_MOUSE_OFFSET}`);
        }
        if (circle2Ref.current) {
          circle2Ref.current.style.setProperty('--mouse-x-2', `${normalizedMouseX * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
          circle2Ref.current.style.setProperty('--mouse-y-2', `${normalizedMouseY * (MAX_CIRCLE_MOUSE_OFFSET * 0.8)}`);
        }
        applyTransforms();
    });
  }, [applyTransforms, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !contentWrapperRef.current) return;
    if (parallaxFrameIdRef.current) cancelAnimationFrame(parallaxFrameIdRef.current);
    if (contentWrapperRef.current) {
      contentWrapperRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    
    if (circle1Ref.current) {
        circle1Ref.current.style.setProperty('--mouse-x-1', '0');
        circle1Ref.current.style.setProperty('--mouse-y-1', '0');
    }
    if (circle2Ref.current) {
        circle2Ref.current.style.setProperty('--mouse-x-2', '0');
        circle2Ref.current.style.setProperty('--mouse-y-2', '0');
    }
    applyTransforms();
  }, [applyTransforms, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    ['--mouse-x-1', '--mouse-y-1', '--scroll-x-1', '--scroll-y-1', '--scroll-rotate-1'].forEach(prop => 
        circle1Ref.current?.style.setProperty(prop, '0')
    );
    ['--mouse-x-2', '--mouse-y-2', '--scroll-x-2', '--scroll-y-2', '--scroll-rotate-2'].forEach(prop => 
        circle2Ref.current?.style.setProperty(prop, '0')
    );
    applyTransforms();
  }, [applyTransforms, isMobile]);

  async function onSubmit(data: ContactFormValues) {
    form.setValue('name', data.name.trim());
    form.setValue('email', data.email.trim());
    form.setValue('subject', data.subject.trim());
    form.setValue('message', data.message.trim());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.error("API Request Failed with Status:", response.status, response.statusText);
        let errorData = { error: `Request failed with status ${response.status}. Please try again.` }; 
        try {
          const parsedError = await response.json();
          console.error("API Error Data (parsed from JSON):", parsedError);
          if (parsedError && parsedError.error) {
            errorData = parsedError;
          }
        } catch (e) {
          try {
            const textError = await response.text();
            console.error("API Error Raw Text:", textError);
            errorData = { error: `Server responded with ${response.status}. Response: ${textError.substring(0, 150)}...` };
          } catch (textE) {
            console.error("Failed to read API error response as text:", textE);
          }
        }
        toast({
          title: 'Error Sending Message 😥',
          description: errorData.error,
          variant: 'destructive',
          duration: 7000, 
        });
        return; 
      }

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Message Sent! ✅',
          description: result.message || "Thanks for reaching out! I'll get back to you soon.",
          variant: 'default',
          duration: 5000,
        });
        form.reset();
      } else {
        console.error("API Error:", result);
        toast({
          title: 'Error Sending Message 😥',
          description: result.error || "Something went wrong on the server. Please try again.",
          variant: 'destructive',
          duration: 7000,
        });
      }
    } catch (error) { 
      console.error("Fetch Error:", error);
      toast({
        title: 'Network Error 🌐',
        description: "Could not reach the server. Please check your connection and try again.",
        variant: 'destructive',
        duration: 7000,
      });
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5 [transform-style:preserve-3d]"
    >
      {!isMobile && (
        <>
          <div 
            ref={circle1Ref} 
            className="absolute -z-10 top-[-5%] right-[-20%] w-[70rem] h-[80rem] md:w-[90rem] md:h-[100rem] bg-primary/15 dark:bg-primary/10 rounded-[55%/40%] filter blur-[290px] md:blur-[360px] opacity-70 dark:opacity-60 transition-transform duration-300 ease-out" 
          ></div>
          <div 
            ref={circle2Ref} 
            className="absolute -z-10 bottom-[-10%] left-[-25%] w-[80rem] h-[75rem] md:w-[100rem] md:h-[90rem] bg-[hsl(270_60%_65%_/_0.2)] dark:bg-[hsl(270_60%_70%_/_0.2)] rounded-[45%/55%] filter blur-[280px] md:blur-[350px] opacity-65 dark:opacity-55 transition-transform duration-300 ease-out" 
          ></div>
        </>
      )}

      <div 
        ref={contentWrapperRef}
        className={cn(
          "container mx-auto px-4 md:px-6 py-16",
          !isMobile && "transition-transform duration-150 ease-out"
        )}
        style={!isMobile ? { transformStyle: "preserve-3d" } : {}}
      >
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">📬 Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Have a question or want to collaborate? Feel free to reach out.
          </p>
        </AnimatedSection>
        <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start"
        >
          <AnimatedSection animationType="fadeInLeft" delay="delay-300" className="w-full space-y-10">
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <a href="mailto:singhpragnesh89@gmail.com" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-200 group">
                  <Mail className="h-6 w-6 text-accent group-hover:animate-pulse" />
                  <span className="text-base">singhpragnesh89@gmail.com</span>
                </a>
                <a href="tel:+916355736986" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-200 group">
                  <Phone className="h-6 w-6 text-accent group-hover:animate-pulse" />
                  <span className="text-base">+91 6355736986</span>
                </a>
              </div>
            </div>
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-blue-700/10 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://www.linkedin.com/in/pragnesh-singh-rajput/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://github.com/pragnesh-singh-rajput" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-foreground/10 hover:border-foreground/50 hover:text-foreground transition-all duration-300 ease-in-out transform hover:scale-110">
                   <Link href="https://x.com/PragneshSingh5" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-pink-600/10 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                   <Link href="https://instagram.com/pragnesh_singh_rajput" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInRight" delay="delay-400" className="w-full">
            <Card className="p-6 md:p-8 shadow-xl bg-card/80 backdrop-blur-md border border-border/50">
              <CardContent className="p-0">
                {!isClient ? (
                  <div className="space-y-6">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-20 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md mt-2" />
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} className="bg-input/70 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} className="bg-input/70 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90">Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Subject of your message" {...field} className="bg-input/70 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/90">Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Your message here..." {...field} rows={5} className="bg-input/70 focus:border-accent focus:ring-1 focus:ring-accent transition-colors"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        disabled={!isClient || (form && form.formState ? form.formState.isSubmitting : true)}
                      >
                        {isClient && form && form.formState && form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
    
    

    