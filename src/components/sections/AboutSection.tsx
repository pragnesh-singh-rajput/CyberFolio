
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen scroll-snap-align-start flex flex-col items-center justify-center text-center relative overflow-hidden p-4 md:p-8"
    >
      {/* Background Gradient Circles */}
      <div className="absolute -z-10 top-[5%] right-[-15%] w-[28rem] h-[28rem] md:w-[38rem] md:h-[38rem] bg-secondary/30 rounded-full filter blur-[100px] md:blur-[160px] opacity-40"></div>
      <div className="absolute -z-10 bottom-[10%] left-[-10%] w-[22rem] h-[22rem] md:w-[32rem] md:h-[32rem] bg-primary/25 rounded-full filter blur-[90px] md:blur-[140px] opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <AnimatedSection delay="delay-100" className="w-full">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">About Me</h2>
        </AnimatedSection>
        <AnimatedSection delay="delay-200" className="w-full">
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            As a dedicated Cyber Security enthusiast currently in my final year of B.Tech in Computer Science and Engineering,
            I am deeply invested in the ever-evolving landscape of digital security. My academic journey has equipped me with a strong foundation
            in network protocols, cryptography, ethical hacking, and secure software development practices. I am passionate about identifying vulnerabilities,
            mitigating risks, and architecting robust security solutions. I thrive on challenges and continuously seek opportunities to expand my knowledge and practical skills
            in areas like threat intelligence, incident response, and cloud security. My objective is to contribute meaningfully to creating a more secure and resilient digital infrastructure.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
