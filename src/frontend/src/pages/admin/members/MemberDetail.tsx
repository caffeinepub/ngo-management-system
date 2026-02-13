import { useParams, Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetMemberById, useBlockMember, useUnblockMember, useDeactivateMember } from '../../../hooks/useQueries';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function MemberDetail() {
  const { id } = useParams({ strict: false });
  const { data: member, isLoading } = useGetMemberById(id || '');
  const blockMember = useBlockMember();
  const unblockMember = useUnblockMember();
  const deactivateMember = useDeactivateMember();

  const handleBlock = async () => {
    if (!id) return;
    try {
      await blockMember.mutateAsync(id);
      toast.success('Member blocked successfully');
    } catch (error) {
      toast.error('Failed to block member');
    }
  };

  const handleUnblock = async () => {
    if (!id) return;
    try {
      await unblockMember.mutateAsync(id);
      toast.success('Member unblocked successfully');
    } catch (error) {
      toast.error('Failed to unblock member');
    }
  };

  const handleDeactivate = async () => {
    if (!id) return;
    try {
      await deactivateMember.mutateAsync(id);
      toast.success('Member deactivated successfully');
    } catch (error) {
      toast.error('Failed to deactivate member');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="space-y-6">
        <Link to="/admin/members">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Members
          </Button>
        </Link>
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">Member not found</CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'blocked':
        return 'destructive';
      case 'deactivated':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/admin/members">
        <Button variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Members
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{member.name}</h1>
          <p className="text-muted-foreground">Member ID: {member.id}</p>
        </div>
        <Badge variant={getStatusColor(member.status)} className="text-sm px-3 py-1">
          {member.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {member.photo && (
              <div className="mb-4">
                <img
                  src={member.photo.getDirectURL()}
                  alt={member.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{member.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{member.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium capitalize">{member.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">
                {member.dob.day}/{member.dob.month}/{member.dob.year}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{member.address || 'Not provided'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Designation</p>
              <p className="font-medium">{member.designation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Joining Date</p>
              <p className="font-medium">{member.joiningDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Referral ID</p>
              <p className="font-mono text-sm">{member.referralId}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Member Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {member.status === 'blocked' ? (
              <Button onClick={handleUnblock} disabled={unblockMember.isPending}>
                {unblockMember.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Unblock Member
              </Button>
            ) : (
              <Button variant="destructive" onClick={handleBlock} disabled={blockMember.isPending}>
                {blockMember.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Block Member
              </Button>
            )}
            {member.status !== 'deactivated' && (
              <Button variant="outline" onClick={handleDeactivate} disabled={deactivateMember.isPending}>
                {deactivateMember.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Deactivate Member
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
