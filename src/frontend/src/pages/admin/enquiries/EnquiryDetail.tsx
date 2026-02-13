import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EnquiryDetail() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Enquiry Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enquiry details coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
