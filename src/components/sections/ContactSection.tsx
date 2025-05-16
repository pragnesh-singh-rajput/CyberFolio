
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
import { Linkedin, Github, Twitter, Mail, Phone } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useEffect, useRef, useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, {message: "Name cannot exceed 50 characters."}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, {message: "Message cannot exceed 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    console.log(data); 
    toast({
      title: "Message Sent! 🎉",
      description: "Thanks for reaching out, Pragnesh will get back to you soon.",
      variant: "default", 
      duration: 5000,
    });
    form.reset();
  }

  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<HTMLDivElement>(null);
  const circle2Ref = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mainElement = document.querySelector('.parallax-scroll-container');
    if (mainElement instanceof HTMLElement) {
      setScrollContainer(mainElement);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top: sectionTopInViewport } = sectionRef.current.getBoundingClientRect();
      const scrollProgress = -sectionTopInViewport;

      if (circle1Ref.current) {
        circle1Ref.current.style.transform = `translateY(${scrollProgress * 0.2}px) translateX(-${scrollProgress * 0.03}px) rotate(-${scrollProgress * 0.011}deg)`;
      }
      if (circle2Ref.current) {
        circle2Ref.current.style.transform = `translateY(${scrollProgress * 0.1}px) translateX(${scrollProgress * 0.04}px) rotate(${scrollProgress * 0.005}deg)`;
      }
    };

    handleScroll(); 

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainer]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8 bg-secondary/10"
    >
      <div ref={circle1Ref} className="absolute -z-10 top-[5%] right-[-10%] w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] bg-primary/30 rounded-full filter blur-[170px] md:blur-[230px] opacity-45 transition-transform duration-500 ease-out"></div>
      <div ref={circle2Ref} className="absolute -z-10 bottom-[10%] left-[-15%] w-[32rem] h-[32rem] md:w-[42rem] md:h-[42rem] bg-accent/35 rounded-full filter blur-[160px] md:blur-[220px] opacity-55 transition-transform duration-500 ease-out"></div>

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
                <a href="mailto:pragneshsinghrajput@gmail.com" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-200 group">
                  <Mail className="h-6 w-6 text-accent group-hover:animate-pulse" />
                  <span className="text-base">pragneshsinghrajput@gmail.com</span>
                </a>
                <a href="tel:+919644643380" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors duration-200 group">
                  <Phone className="h-6 w-6 text-accent group-hover:animate-pulse" />
                  <span className="text-base">+91 9644643380</span>
                </a>
              </div>
            </div>
            <div className="bg-card/70 backdrop-blur-md p-6 rounded-lg shadow-lg border border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://www.linkedin.com/in/pragnesh-singh-rajput-394684220/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://github.com/pragnesh-singh-rajput" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full hover:bg-accent/10 hover:border-accent hover:text-accent transition-all duration-300 ease-in-out transform hover:scale-110">
                  <Link href="https://twitter.com/PragneshSinghR" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection animationType="fadeInRight" delay="delay-400" className="w-full">
            <Card className="p-6 md:p-8 shadow-xl bg-card/80 backdrop-blur-md border border-border/50">
              <CardContent className="p-0">
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
                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
