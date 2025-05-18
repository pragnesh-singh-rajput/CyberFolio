
import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CustomCursor from '@/components/effects/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Pragnesh Singh Rajput | Cyber Security Professional',
  description: 'Portfolio of Pragnesh Singh Rajput, a Cyber Security Professional and B.Tech CSE student.',
  icons: {
    icon: '/favicon.ico', // Next.js will look for favicon.ico in src/app/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark font-sans`} suppressHydrationWarning>
      <body className={`antialiased bg-background text-foreground`}>
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
