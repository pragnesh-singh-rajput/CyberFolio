import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, CalendarDays, MapPin } from 'lucide-react';

export default function EducationSection() {
  return (
    <div id="education" className="py-16 md:py-24 bg-secondary/50 rounded-lg my-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">My Education</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            My academic journey in the field of computer science and cyber security.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
              <div className="bg-accent p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-accent-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold text-primary">
                  Bachelor of Technology (B.Tech) in Computer Science & Engineering
                </CardTitle>
                <CardDescription className="text-md text-muted-foreground">
                  Specialization in Cyber Security
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>[Your University Name], [City, State]</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>[Expected Graduation Year, e.g., Expected May 2025] - Currently in 4th Year</span>
              </div>
              <p className="text-foreground/90 pt-2">
                Pursuing a comprehensive curriculum focused on core computer science principles with an advanced specialization in cyber security. Coursework includes network security, cryptography, ethical hacking, digital forensics, and secure software development. Actively involved in [mention any relevant clubs, activities, or honors].
              </p>
              {/* Optional: Add GPA or key achievements if desired */}
              {/* <p className="text-sm text-accent font-medium">CGPA: X.XX/10.0</p> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
