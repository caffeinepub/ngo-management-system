import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetCertificateById, useGetDonationById } from '../../hooks/useQueries';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function Verify() {
  const { id } = useParams({ strict: false });
  const certificate = useGetCertificateById(id || '');
  const donation = useGetDonationById(id || '');

  const isLoading = certificate.isLoading || donation.isLoading;
  const certData = certificate.data;
  const donData = donation.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!certData && !donData) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-destructive" />
              <CardTitle>Verification Failed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No certificate or receipt found with ID: <span className="font-mono">{id}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <CardTitle>Verification Successful</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {certData && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Certificate ID</p>
                <p className="font-mono font-semibold">{certData.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recipient</p>
                <p className="font-semibold">{certData.recipientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p>{certData.certificateType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p>{certData.issueDate}</p>
              </div>
            </>
          )}
          {donData && (
            <>
              <div>
                <p className="text-sm text-muted-foreground">Receipt Number</p>
                <p className="font-mono font-semibold">{donData.receiptNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Donor</p>
                <p className="font-semibold">{donData.donorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold">₹{donData.amount.toString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{donData.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Mode</p>
                <p>{donData.paymentMode}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
