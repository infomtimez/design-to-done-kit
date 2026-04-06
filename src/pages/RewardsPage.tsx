import { Award, TrendingUp, Gift, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { rewardBalance, rewardTransactions } from '@/lib/mock-data';
import { Link } from 'react-router-dom';

export default function RewardsPage() {
  const spentPercent = (rewardBalance.totalSpent / rewardBalance.totalEarned) * 100;

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Rewards & Recognition</h1>
          <p className="font-body text-muted-foreground mt-1">{rewardBalance.programName}</p>
        </div>
        <Link to="/catalog">
          <Button className="bg-gradient-gold text-primary font-body font-semibold hover:opacity-90" size="sm">
            <Gift className="h-4 w-4 mr-1" /> Redeem Points
          </Button>
        </Link>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="rounded-xl border border-border bg-gradient-navy p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8" style={{ color: 'hsl(43, 50%, 54%)' }} />
            <Badge className="bg-gold/20 font-body text-xs" style={{ color: 'hsl(43, 50%, 54%)' }}>Active</Badge>
          </div>
          <p className="font-display text-4xl font-bold" style={{ color: 'hsl(43, 50%, 95%)' }}>{rewardBalance.points.toLocaleString()}</p>
          <p className="text-sm font-body mt-1" style={{ color: 'hsl(43, 50%, 70%)' }}>Available Points</p>
          <p className="text-lg font-body font-semibold mt-2" style={{ color: 'hsl(43, 50%, 54%)' }}>${rewardBalance.dollarValue.toFixed(2)} value</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
          <p className="font-display text-3xl font-bold text-foreground">{rewardBalance.totalEarned.toLocaleString()}</p>
          <p className="text-sm font-body text-muted-foreground mt-1">Total Earned</p>
          <Progress value={100} className="mt-3 h-2" />
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <Gift className="h-8 w-8 text-secondary mb-4" />
          <p className="font-display text-3xl font-bold text-foreground">{rewardBalance.totalSpent.toLocaleString()}</p>
          <p className="text-sm font-body text-muted-foreground mt-1">Total Redeemed</p>
          <Progress value={spentPercent} className="mt-3 h-2" />
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-display text-lg font-semibold text-foreground">Transaction History</h3>
        </div>
        <div className="divide-y divide-border">
          {rewardTransactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full ${tx.type === 'EARN' ? 'bg-green-100' : 'bg-secondary/10'}`}>
                  {tx.type === 'EARN' ? <ArrowUpRight className="h-4 w-4 text-green-600" /> : <ArrowDownRight className="h-4 w-4 text-secondary" />}
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-foreground">{tx.description}</p>
                  <p className="text-xs text-muted-foreground font-body">{tx.date}</p>
                </div>
              </div>
              <span className={`font-display font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-foreground'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
