
import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Assuming this might still be an issue if not installed
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CustomCursor from '@/components/effects/CustomCursor';

const geistSans = GeistSans;
// const geistMono = GeistMono; // Keep commented if 'geist' package isn't fully set up

export const metadata: Metadata = {
  title: 'Pragnesh Singh Rajput | Cyber Security Professional',
  description: 'Portfolio of Pragnesh Singh Rajput, a Cyber Security Professional and B.Tech CSE student.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased bg-background text-foreground`}> {/* Removed geistMono if not used/installed */}
        <CustomCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
