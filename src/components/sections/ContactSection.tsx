
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
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from '@/lib/supabaseClient';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, {message: "Name cannot exceed 50 characters."}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(100, {message: "Subject cannot exceed 100 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, {message: "Message cannot exceed 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

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
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;
    let animFrameId: number | null = null;

    const performParallaxUpdate = () => {
      if (!sectionRef.current || !circle1Ref.current || !circle2Ref.current) {
        animFrameId = requestAnimationFrame(performParallaxUpdate);
        return;
      }
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      const c1X = scrollProgress * 0.18;
      const c1Y = scrollProgress * 0.45;
      const c1R = -scrollProgress * 0.020;
      circle1Ref.current.style.transform = `translate3d(${c1X}px, ${c1Y}px, 0) rotate(${c1R}deg) scale(1.15)`;

      const c2X = -scrollProgress * 0.15;
      const c2Y = scrollProgress * 0.28;
      const c2R = scrollProgress * 0.015;
      circle2Ref.current.style.transform = `translate3d(${c2X}px, ${c2Y}px, 0) rotate(${c2R}deg) scale(1.12)`;
      
      animFrameId = requestAnimationFrame(performParallaxUpdate);
    };
    
    const initialUpdate = () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(performParallaxUpdate);
    };
    
    initialUpdate();


    scrollContainer.addEventListener('scroll', initialUpdate, { passive: true });
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', initialUpdate);
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
       if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, [scrollContainer]);

  async function onSubmit(data: ContactFormValues) {
    const { name, email, subject, message } = data;
    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('contact', {
        body: { name, email, subject, message },
      });

      if (functionError) {
        console.error('Supabase function error:', JSON.stringify(functionError, null, 2));
        toast({
          title: 'Uh oh! Something went wrong.',
          description: functionError.message || 'There was a problem sending your message. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      if (functionData && functionData.error) {
         console.error('Function returned an error:', JSON.stringify(functionData.error, null, 2));
         toast({
          title: 'Error Sending Message',
          description: functionData.error || 'Failed to process your request. Please check the details.',
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Message Sent! 🎉',
        description: "Thanks for reaching out, PK Singh will get back to you soon.",
        variant: 'default',
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error('Client-side error submitting form:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/5"
    >
      <div 
        ref={circle1Ref} 
        className="absolute -z-10 top-[-5%] right-[-20%] w-[70rem] h-[80rem] md:w-[90rem] md:h-[100rem] bg-pink-500/30 dark:bg-pink-700/35 rounded-[55%/40%] filter blur-[200px] md:blur-[270px] opacity-60 dark:opacity-40 transition-transform duration-500 ease-out" 
      ></div>
      <div 
        ref={circle2Ref} 
        className="absolute -z-10 bottom-[-10%] left-[-25%] w-[80rem] h-[75rem] md:w-[100rem] md:h-[90rem] bg-purple-500/25 dark:bg-purple-800/30 rounded-[45%/55%] filter blur-[190px] md:blur-[260px] opacity-55 dark:opacity-35 transition-transform duration-500 ease-out" 
      ></div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <AnimatedSection animationType="scaleIn" delay="delay-100" className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">📬 Get In Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Have a question or want to collaborate? Feel free to reach out.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
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
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-blue-600/10 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://www.linkedin.com/in/pragnesh-singh-rajput/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://github.com/pragnesh-singh-rajput" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-gray-700/10 hover:border-gray-400 hover:text-gray-300 transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://x.com/PragneshSingh5" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-pink-500/10 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 ease-in-out transform hover:scale-110">
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
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-20" />
                    <Skeleton className="h-10 mt-2" />
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
    
