import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllCertificates } from '../../../hooks/useQueries';
import { Plus, Loader2 } from 'lucide-react';

export default function CertificatesList() {
  const { data: certificates, isLoading } = useGetAllCertificates();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">Manage and issue certificates</p>
        </div>
        <Link to="/admin/certificates/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Issue Certificate
          </Button>
        </Link>
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
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates && certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-mono text-sm">{cert.id}</TableCell>
                      <TableCell className="font-medium">{cert.recipientName}</TableCell>
                      <TableCell>{cert.certificateType}</TableCell>
                      <TableCell>{cert.issueDate}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/admin/certificates/${cert.id}` })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No certificates found
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
