import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetCertificateById } from '../../../hooks/useQueries';
import { Loader2, ArrowLeft, Download } from 'lucide-react';
import QRCode from '../../../components/QRCode';

export default function CertificateDetail() {
  const { id } = useParams({ strict: false });
  const navigate = useNavigate();
  const { data: certificate, isLoading } = useGetCertificateById(id || '');

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

  if (!certificate) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin/certificates' })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Certificate not found</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin/certificates' })}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-16">
          <div className="border-8 border-double border-primary p-12 text-center space-y-8">
            <div>
              <img src="/assets/generated/ngo-logo.dim_256x256.png" alt="Logo" className="w-24 h-24 mx-auto mb-6" />
              <h1 className="text-5xl font-bold mb-4">Certificate</h1>
              <p className="text-xl text-muted-foreground">of {certificate.certificateType.replace(' Certificate', '')}</p>
            </div>

            <div className="py-8">
              <p className="text-lg mb-4">This is to certify that</p>
              <h2 className="text-4xl font-bold mb-4">{certificate.recipientName}</h2>
              <p className="text-lg">has successfully completed the requirements</p>
            </div>

            <div className="flex justify-between items-end pt-8">
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Issue Date</p>
                <p className="font-medium">{certificate.issueDate}</p>
                <p className="text-sm text-muted-foreground mt-2">Certificate ID</p>
                <p className="font-mono text-sm">{certificate.id}</p>
              </div>

              <div>
                <QRCode value={certificate.qrCode} size={100} />
                <p className="text-xs text-muted-foreground mt-2">Scan to verify</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
