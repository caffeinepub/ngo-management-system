import { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import LoginButton from '../auth/LoginButton';
import ProfileSetupModal from '../auth/ProfileSetupModal';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Award,
  Heart,
  Megaphone,
  MessageSquare,
  FileText,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isAdmin, userProfile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = isAdmin
    ? [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Members', href: '/admin/members', icon: Users },
        { name: 'Donations', href: '/admin/donations', icon: DollarSign },
        { name: 'Certificates', href: '/admin/certificates', icon: Award },
        { name: 'Beneficiaries', href: '/admin/beneficiaries', icon: Heart },
        { name: 'Campaigns', href: '/admin/campaigns', icon: Megaphone },
        { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
        { name: 'Reports', href: '/admin/reports', icon: FileText },
      ]
    : [{ name: 'Dashboard', href: '/member', icon: LayoutDashboard }];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <img src="/assets/generated/ngo-logo.dim_256x256.png" alt="NGO Logo" className="w-10 h-10" />
          <div>
            <h2 className="font-semibold text-lg">NGO Portal</h2>
            <p className="text-xs text-muted-foreground">{isAdmin ? 'Admin' : 'Member'}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent [&.active]:bg-accent [&.active]:text-accent-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium">{userProfile?.name || 'User'}</p>
          <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrator' : 'Member'}</p>
        </div>
        <LoginButton />
      </div>
    </div>
  );

  return (
    <>
      <ProfileSetupModal />
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r bg-card">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
            <div className="flex items-center gap-3">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
              </Sheet>
              <img src="/assets/generated/ngo-logo.dim_256x256.png" alt="NGO Logo" className="w-8 h-8" />
              <span className="font-semibold">NGO Portal</span>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
