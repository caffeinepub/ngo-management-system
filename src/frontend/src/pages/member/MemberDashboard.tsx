import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../hooks/useAuth';

export default function MemberDashboard() {
  const { userProfile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {userProfile?.name || 'Member'}!</h1>
        <p className="text-muted-foreground">Your member dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{userProfile?.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium capitalize">{userProfile?.role}</p>
              </div>
              {userProfile?.memberId && (
                <div>
                  <p className="text-sm text-muted-foreground">Member ID</p>
                  <p className="font-mono text-sm">{userProfile.memberId}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Member features coming soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
