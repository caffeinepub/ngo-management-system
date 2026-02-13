import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from './components/layout/AppLayout';
import PublicLayout from './components/layout/PublicLayout';
import Landing from './pages/public/Landing';
import AccessDenied from './pages/AccessDenied';
import AdminDashboard from './pages/admin/AdminDashboard';
import MembersList from './pages/admin/members/MembersList';
import MemberForm from './pages/admin/members/MemberForm';
import MemberDetail from './pages/admin/members/MemberDetail';
import DonationsList from './pages/admin/donations/DonationsList';
import DonationForm from './pages/admin/donations/DonationForm';
import DonationDetail from './pages/admin/donations/DonationDetail';
import DonationReceipt from './pages/admin/donations/DonationReceipt';
import CertificatesList from './pages/admin/certificates/CertificatesList';
import CertificateForm from './pages/admin/certificates/CertificateForm';
import CertificateDetail from './pages/admin/certificates/CertificateDetail';
import BeneficiariesList from './pages/admin/beneficiaries/BeneficiariesList';
import BeneficiaryForm from './pages/admin/beneficiaries/BeneficiaryForm';
import BeneficiaryDetail from './pages/admin/beneficiaries/BeneficiaryDetail';
import CampaignsList from './pages/admin/campaigns/CampaignsList';
import CampaignForm from './pages/admin/campaigns/CampaignForm';
import CampaignDetail from './pages/admin/campaigns/CampaignDetail';
import EnquiriesList from './pages/admin/enquiries/EnquiriesList';
import EnquiryDetail from './pages/admin/enquiries/EnquiryDetail';
import ReportsHome from './pages/admin/reports/ReportsHome';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberRegistration from './pages/public/MemberRegistration';
import EnquiryForm from './pages/public/EnquiryForm';
import Verify from './pages/public/Verify';
import ActivityFeed from './pages/public/ActivityFeed';
import { RequireAdmin, RequireMember } from './components/auth/RouteGuard';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: () => (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Landing,
});

const registerRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/register',
  component: MemberRegistration,
});

const enquiryRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/enquiry',
  component: EnquiryForm,
});

const verifyRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/verify/$id',
  component: Verify,
});

const activityRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/activity',
  component: ActivityFeed,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin',
  component: () => (
    <RequireAdmin>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RequireAdmin>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: AdminDashboard,
});

const membersListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/members',
  component: MembersList,
});

const memberCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/members/new',
  component: MemberForm,
});

const memberEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/members/$id/edit',
  component: MemberForm,
});

const memberDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/members/$id',
  component: MemberDetail,
});

const donationsListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/donations',
  component: DonationsList,
});

const donationCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/donations/new',
  component: DonationForm,
});

const donationDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/donations/$id',
  component: DonationDetail,
});

const donationReceiptRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/donations/$id/receipt',
  component: DonationReceipt,
});

const certificatesListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/certificates',
  component: CertificatesList,
});

const certificateCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/certificates/new',
  component: CertificateForm,
});

const certificateDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/certificates/$id',
  component: CertificateDetail,
});

const beneficiariesListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/beneficiaries',
  component: BeneficiariesList,
});

const beneficiaryCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/beneficiaries/new',
  component: BeneficiaryForm,
});

const beneficiaryEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/beneficiaries/$id/edit',
  component: BeneficiaryForm,
});

const beneficiaryDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/beneficiaries/$id',
  component: BeneficiaryDetail,
});

const campaignsListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/campaigns',
  component: CampaignsList,
});

const campaignCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/campaigns/new',
  component: CampaignForm,
});

const campaignEditRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/campaigns/$id/edit',
  component: CampaignForm,
});

const campaignDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/campaigns/$id',
  component: CampaignDetail,
});

const enquiriesListRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/enquiries',
  component: EnquiriesList,
});

const enquiryDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/enquiries/$id',
  component: EnquiryDetail,
});

const reportsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/reports',
  component: ReportsHome,
});

const memberLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'member',
  component: () => (
    <RequireMember>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </RequireMember>
  ),
});

const memberDashboardRoute = createRoute({
  getParentRoute: () => memberLayoutRoute,
  path: '/member',
  component: MemberDashboard,
});

const accessDeniedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/access-denied',
  component: AccessDenied,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    landingRoute,
    registerRoute,
    enquiryRoute,
    verifyRoute,
    activityRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    membersListRoute,
    memberCreateRoute,
    memberEditRoute,
    memberDetailRoute,
    donationsListRoute,
    donationCreateRoute,
    donationDetailRoute,
    donationReceiptRoute,
    certificatesListRoute,
    certificateCreateRoute,
    certificateDetailRoute,
    beneficiariesListRoute,
    beneficiaryCreateRoute,
    beneficiaryEditRoute,
    beneficiaryDetailRoute,
    campaignsListRoute,
    campaignCreateRoute,
    campaignEditRoute,
    campaignDetailRoute,
    enquiriesListRoute,
    enquiryDetailRoute,
    reportsRoute,
  ]),
  memberLayoutRoute.addChildren([memberDashboardRoute]),
  accessDeniedRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
