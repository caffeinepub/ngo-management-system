import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberForm() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Member</h1>
      <Card>
        <CardHeader>
          <CardTitle>Member Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Member form coming soon. Use public registration for now.</p>
        </CardContent>
      </Card>
    </div>
  );
}
