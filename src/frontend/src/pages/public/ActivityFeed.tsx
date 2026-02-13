import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ActivityFeed() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Activities</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Feed Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Stay tuned for updates on our latest activities, events, and community initiatives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
