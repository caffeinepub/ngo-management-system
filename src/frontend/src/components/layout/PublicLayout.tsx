import { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import LoginButton from '../auth/LoginButton';
import { Heart } from 'lucide-react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'ngo-management'
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/generated/ngo-logo.dim_256x256.png" alt="NGO Logo" className="w-10 h-10" />
            <span className="font-bold text-xl">NGO Management</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/activity" className="text-sm font-medium hover:text-primary transition-colors">
              Activities
            </Link>
            <Link to="/register" className="text-sm font-medium hover:text-primary transition-colors">
              Register
            </Link>
            <Link to="/enquiry" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <LoginButton />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {currentYear} NGO Management System</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>using</span>
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
