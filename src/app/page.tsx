import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import EducationSection from '@/components/sections/EducationSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        {/* HeroSection is not wrapped with AnimatedSection for immediate visibility */}
        <HeroSection /> 
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 lg:space-y-20">
          {/* About section placeholder (using Hero's id for nav example) */}
          <div id="about" className="pt-16 md:pt-24 text-center"> 
            <AnimatedSection delay="delay-200">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">About Me</h2>
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
                As a dedicated Cyber Security enthusiast currently in my final year of B.Tech in Computer Science and Engineering, 
                I am deeply invested in the ever-evolving landscape of digital security. My academic journey has equipped me with a strong foundation 
                in network protocols, cryptography, ethical hacking, and secure software development practices. I am passionate about identifying vulnerabilities, 
                mitigating risks, and architecting robust security solutions. I thrive on challenges and continuously seek opportunities to expand my knowledge and practical skills 
                in areas like threat intelligence, incident response, and cloud security. My objective is to contribute meaningfully to creating a more secure and resilient digital infrastructure.
              </p>
            </AnimatedSection>
          </div>
          
          <AnimatedSection delay="delay-200">
            <EducationSection />
          </AnimatedSection>
          
          <AnimatedSection delay="delay-300">
            <ProjectsSection />
          </AnimatedSection>
          
          <AnimatedSection delay="delay-400">
            <ContactSection />
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
