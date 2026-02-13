import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllMembers, useGetAllDonations, useGetAllCampaigns, useGetAllCertificates } from '../../hooks/useQueries';
import { Users, DollarSign, Megaphone, Award, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const members = useGetAllMembers();
  const donations = useGetAllDonations();
  const campaigns = useGetAllCampaigns();
  const certificates = useGetAllCertificates();

  const totalMembers = members.data?.length || 0;
  const activeMembers = members.data?.filter((m) => m.status === 'active').length || 0;
  const totalDonations = donations.data?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const activeCampaigns = campaigns.data?.filter((c) => c.status === 'active').length || 0;
  const pendingCertificates = 0;

  const stats = [
    {
      title: 'Total Members',
      value: totalMembers,
      subtitle: `${activeMembers} active`,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Total Donations',
      value: `₹${totalDonations.toLocaleString()}`,
      subtitle: `${donations.data?.length || 0} donations`,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns,
      subtitle: `${campaigns.data?.length || 0} total`,
      icon: Megaphone,
      color: 'text-purple-600',
    },
    {
      title: 'Certificates Issued',
      value: certificates.data?.length || 0,
      subtitle: `${pendingCertificates} pending`,
      icon: Award,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your NGO.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {donations.data && donations.data.length > 0
                ? `Latest donation: ₹${donations.data[donations.data.length - 1].amount} from ${
                    donations.data[donations.data.length - 1].donorName
                  }`
                : 'No recent donations'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Blocked Members</span>
              <span className="font-medium">
                {members.data?.filter((m) => m.status === 'blocked').length || 0}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deactivated Members</span>
              <span className="font-medium">
                {members.data?.filter((m) => m.status === 'deactivated').length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
