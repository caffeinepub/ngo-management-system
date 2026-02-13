import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDonationById } from '../../../hooks/useQueries';
import { Loader2, ArrowLeft, FileText } from 'lucide-react';

export default function DonationDetail() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: donation, isLoading } = useGetDonationById(id || '');

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin/donations' })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Donations
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Donation not found</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate({ to: '/admin/donations' })}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Donations
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donation Details</h1>
          <p className="text-muted-foreground">Receipt: {donation.receiptNumber}</p>
        </div>
        <Button onClick={() => navigate({ to: `/admin/donations/${id}/receipt` })}>
          <FileText className="w-4 h-4 mr-2" />
          View Receipt
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Donor Name</p>
              <p className="font-semibold text-lg">{donation.donorName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="font-bold text-2xl text-green-600">₹{donation.amount.toString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Mode</p>
              <p className="font-medium">{donation.paymentMode}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-sm">{donation.transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{donation.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Receipt Number</p>
              <p className="font-mono text-sm">{donation.receiptNumber}</p>
            </div>
            {donation.memberId && (
              <div>
                <p className="text-sm text-muted-foreground">Member ID</p>
                <p className="font-mono text-sm">{donation.memberId}</p>
              </div>
            )}
            {donation.campaignId && (
              <div>
                <p className="text-sm text-muted-foreground">Campaign ID</p>
                <p className="font-mono text-sm">{donation.campaignId}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
