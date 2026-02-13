import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BeneficiaryDetail() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Beneficiary Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Beneficiary details coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
