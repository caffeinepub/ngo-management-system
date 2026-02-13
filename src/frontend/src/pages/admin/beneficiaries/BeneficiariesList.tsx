import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllBeneficiaries } from '../../../hooks/useQueries';
import { Plus, Loader2 } from 'lucide-react';

export default function BeneficiariesList() {
  const { data: beneficiaries, isLoading } = useGetAllBeneficiaries();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Beneficiaries</h1>
          <p className="text-muted-foreground">Manage beneficiary records</p>
        </div>
        <Link to="/admin/beneficiaries/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Beneficiary
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
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Help Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {beneficiaries && beneficiaries.length > 0 ? (
                  beneficiaries.map((ben) => (
                    <TableRow key={ben.id}>
                      <TableCell className="font-mono text-sm">{ben.id}</TableCell>
                      <TableCell className="font-medium">{ben.name}</TableCell>
                      <TableCell>{ben.helpType}</TableCell>
                      <TableCell>{ben.contactDetails}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/admin/beneficiaries/${ben.id}` })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No beneficiaries found
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
