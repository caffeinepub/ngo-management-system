import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllDonations } from '../../../hooks/useQueries';
import { Plus, Search, Loader2 } from 'lucide-react';

export default function DonationsList() {
  const { data: donations, isLoading } = useGetAllDonations();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDonations = donations?.filter(
    (donation) =>
      donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donations</h1>
          <p className="text-muted-foreground">Track and manage all donations</p>
        </div>
        <Link to="/admin/donations/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Donation
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by donor name or receipt number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt #</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations && filteredDonations.length > 0 ? (
                  filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-mono text-sm">{donation.receiptNumber}</TableCell>
                      <TableCell className="font-medium">{donation.donorName}</TableCell>
                      <TableCell className="font-semibold">₹{donation.amount.toString()}</TableCell>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.paymentMode}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/admin/donations/${donation.id}` })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No donations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
