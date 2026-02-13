import { Link, useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetAllEnquiries } from '../../../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function EnquiriesList() {
  const { data: enquiries, isLoading } = useGetAllEnquiries();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Enquiries</h1>
        <p className="text-muted-foreground">Manage customer enquiries</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries && enquiries.length > 0 ? (
                  enquiries.map((enq) => (
                    <TableRow key={enq.id}>
                      <TableCell className="font-medium">{enq.name}</TableCell>
                      <TableCell>{enq.email}</TableCell>
                      <TableCell>{new Date(enq.timestamp).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={enq.replied ? 'default' : 'secondary'}>
                          {enq.replied ? 'Replied' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/admin/enquiries/${enq.id}` })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No enquiries found
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
