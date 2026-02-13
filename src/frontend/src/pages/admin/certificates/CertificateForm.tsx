import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateCertificate } from '../../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function CertificateForm() {
  const navigate = useNavigate();
  const createCertificate = useCreateCertificate();

  const [formData, setFormData] = useState({
    recipientName: '',
    certificateType: 'Membership Certificate',
    templateId: 'template1',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recipientName) {
      toast.error('Please enter recipient name');
      return;
    }

    try {
      const certId = `CERT${Date.now()}`;
      const verifyUrl = `${window.location.origin}/verify/${certId}`;

      await createCertificate.mutateAsync({
        id: certId,
        recipientName: formData.recipientName,
        certificateType: formData.certificateType,
        issueDate: new Date().toISOString().split('T')[0],
        qrCode: verifyUrl,
        templateId: formData.templateId,
      });

      toast.success('Certificate issued successfully!');
      navigate({ to: '/admin/certificates' });
    } catch (error) {
      console.error('Certificate error:', error);
      toast.error('Failed to issue certificate');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Issue Certificate</h1>
      <Card>
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateType">Certificate Type</Label>
              <Select
                value={formData.certificateType}
                onValueChange={(value) => setFormData({ ...formData, certificateType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Membership Certificate">Membership Certificate</SelectItem>
                  <SelectItem value="Achievement Certificate">Achievement Certificate</SelectItem>
                  <SelectItem value="Visitor Certificate">Visitor Certificate</SelectItem>
                  <SelectItem value="Internship Completion Certificate">Internship Completion Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="templateId">Template</Label>
              <Select value={formData.templateId} onValueChange={(value) => setFormData({ ...formData, templateId: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Classic Template</SelectItem>
                  <SelectItem value="template2">Modern Template</SelectItem>
                  <SelectItem value="template3">Elegant Template</SelectItem>
                  <SelectItem value="template4">Bold Template</SelectItem>
                  <SelectItem value="template5">Minimal Template</SelectItem>
                  <SelectItem value="template6">Professional Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={createCertificate.isPending}>
              {createCertificate.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Issuing...
                </>
              ) : (
                'Issue Certificate'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
