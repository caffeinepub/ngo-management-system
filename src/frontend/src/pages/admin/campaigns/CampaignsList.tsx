import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useGetAllCampaigns } from '../../../hooks/useQueries';
import { Plus, Loader2 } from 'lucide-react';

export default function CampaignsList() {
  const { data: campaigns, isLoading } = useGetAllCampaigns();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">Manage fundraising campaigns</p>
        </div>
        <Link to="/admin/campaigns/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
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
                  <TableHead>Title</TableHead>
                  <TableHead>Goal</TableHead>
                  <TableHead>Raised</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns && campaigns.length > 0 ? (
                  campaigns.map((campaign) => {
                    const progress = (Number(campaign.amountRaised) / Number(campaign.goalAmount)) * 100;
                    return (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.title}</TableCell>
                        <TableCell>₹{campaign.goalAmount.toString()}</TableCell>
                        <TableCell>₹{campaign.amountRaised.toString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="w-20" />
                            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{campaign.status}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => navigate({ to: `/admin/campaigns/${campaign.id}` })}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No campaigns found
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
