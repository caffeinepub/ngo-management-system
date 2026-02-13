import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateDonation } from '../../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function DonationForm() {
  const navigate = useNavigate();
  const createDonation = useCreateDonation();

  const [formData, setFormData] = useState({
    donorName: '',
    amount: '',
    paymentMode: 'Cash',
    transactionId: '',
    memberId: '',
    campaignId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.donorName || !formData.amount) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const donationId = `DON${Date.now()}`;
      const receiptNumber = `REC${Date.now()}`;

      await createDonation.mutateAsync({
        id: donationId,
        donorName: formData.donorName,
        amount: BigInt(formData.amount),
        paymentMode: formData.paymentMode,
        transactionId: formData.transactionId || 'N/A',
        date: new Date().toISOString().split('T')[0],
        receiptNumber,
        memberId: formData.memberId || undefined,
        campaignId: formData.campaignId || undefined,
      });

      toast.success('Donation recorded successfully!');
      navigate({ to: '/admin/donations' });
    } catch (error) {
      console.error('Donation error:', error);
      toast.error('Failed to record donation');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Record Donation</h1>
      <Card>
        <CardHeader>
          <CardTitle>Donation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donorName">Donor Name *</Label>
              <Input
                id="donorName"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <Select value={formData.paymentMode} onValueChange={(value) => setFormData({ ...formData, paymentMode: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberId">Member ID (Optional)</Label>
              <Input
                id="memberId"
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignId">Campaign ID (Optional)</Label>
              <Input
                id="campaignId"
                value={formData.campaignId}
                onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={createDonation.isPending}>
              {createDonation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Recording...
                </>
              ) : (
                'Record Donation'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
