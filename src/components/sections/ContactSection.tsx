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
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
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
    // In a real app, you'd send this data to a backend.
    // For this demo, we'll just show a toast.
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
      variant: "default", 
    });
    form.reset();
  }

  return (
    <div id="contact" className="py-16 md:py-24 bg-secondary/50 rounded-lg my-8">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection delay="delay-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Get In Touch</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question or want to collaborate? Feel free to reach out.
            </p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <AnimatedSection delay="delay-200">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a href="mailto:your.email@example.com" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                    <Mail className="h-5 w-5 text-accent" />
                    <span>your.email@example.com</span>
                  </a>
                  {/* Add phone number if desired */}
                  {/* <p className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <span>+1 (555) 123-4567</span>
                  </p> */}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild className="hover:bg-accent/10 hover:border-accent">
                    <Link href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5 text-accent" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="hover:bg-accent/10 hover:border-accent">
                    <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 w-5 text-accent" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="hover:bg-accent/10 hover:border-accent">
                    <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-5 w-5 text-accent" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay="delay-300">
            <Card className="p-6 md:p-8 shadow-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background"/>
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background"/>
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message here..." {...field} rows={5} className="bg-background"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
