import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BeneficiaryForm() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Beneficiary</h1>
      <Card>
        <CardHeader>
          <CardTitle>Beneficiary Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Beneficiary form coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
