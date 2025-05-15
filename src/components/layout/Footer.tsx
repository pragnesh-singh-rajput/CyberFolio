export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {currentYear} CyberFolio. All rights reserved.</p>
          <p>Designed by an Expert AI Engineer</p>
        </div>
      </div>
    </footer>
  );
}
