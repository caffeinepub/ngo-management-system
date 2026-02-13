import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CampaignForm() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Campaign</h1>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Campaign form coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
