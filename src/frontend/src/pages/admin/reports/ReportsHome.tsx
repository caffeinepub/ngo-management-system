import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function ReportsHome() {
  const reports = [
    {
      title: 'Membership Report',
      description: 'View all member registrations and payments',
      icon: Users,
    },
    {
      title: 'Donations Report',
      description: 'Track all donations and receipts',
      icon: DollarSign,
    },
    {
      title: 'Event Payments',
      description: 'View event registration and payments',
      icon: Calendar,
    },
    {
      title: 'Active Members',
      description: 'List of all active members',
      icon: Users,
    },
    {
      title: 'Inactive Members',
      description: 'List of blocked and deactivated members',
      icon: Users,
    },
    {
      title: 'Financial Summary',
      description: 'Income vs expenses overview',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and view various reports</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <report.icon className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
