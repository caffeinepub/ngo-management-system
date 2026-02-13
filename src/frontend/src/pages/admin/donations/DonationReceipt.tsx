import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetDonationById } from '../../../hooks/useQueries';
import { Loader2, ArrowLeft, Download } from 'lucide-react';
import QRCode from '../../../components/QRCode';

export default function DonationReceipt() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: donation, isLoading } = useGetDonationById(id || '');

  const handleDownload = () => {
    window.print();
  };

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
          Back
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Donation not found</CardContent>
        </Card>
      </div>
    );
  }

  const verifyUrl = `${window.location.origin}/verify/${donation.id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={() => navigate({ to: `/admin/donations/${id}` })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-12">
          <div className="text-center mb-8">
            <img src="/assets/generated/ngo-logo.dim_256x256.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Donation Receipt</h1>
            <p className="text-muted-foreground">Thank you for your generous contribution</p>
          </div>

          <div className="border-t border-b py-6 mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Receipt Number</p>
                <p className="font-mono font-semibold">{donation.receiptNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{donation.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Donor Name</p>
                <p className="font-semibold">{donation.donorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Mode</p>
                <p className="font-medium">{donation.paymentMode}</p>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Amount Donated</p>
              <p className="text-4xl font-bold text-green-600">₹{donation.amount.toString()}</p>
            </div>

            {donation.transactionId && donation.transactionId !== 'N/A' && (
              <div>
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono text-sm">{donation.transactionId}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center mb-6">
            <div className="text-center">
              <QRCode value={verifyUrl} size={128} />
              <p className="text-xs text-muted-foreground mt-2">Scan to verify</p>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p className="mt-2">For queries, please contact us at info@ngo.org</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
