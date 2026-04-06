import { DollarSign, ShoppingBag, Building2, Clock, TrendingUp, Users, BarChart3, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { adminStats, sampleOrders } from '@/lib/mock-data';

const statCards = [
  { label: 'Monthly Revenue', value: `$${adminStats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, change: `+${adminStats.revenueGrowth}%`, positive: true },
  { label: 'Orders This Month', value: adminStats.ordersThisMonth.toString(), icon: ShoppingBag, change: '+12%', positive: true },
  { label: 'Active Companies', value: adminStats.activeCompanies.toString(), icon: Building2, change: '+3', positive: true },
  { label: 'Pending Approvals', value: adminStats.pendingApprovals.toString(), icon: Clock, change: '-2', positive: false },
];

export default function AdminDashboard() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="font-body text-muted-foreground mt-1">EngraveNet Platform Overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-body" size="sm"><Settings className="h-4 w-4 mr-1" /> Settings</Button>
          <Button variant="outline" className="font-body" size="sm"><BarChart3 className="h-4 w-4 mr-1" /> Analytics</Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <Badge variant="outline" className={`font-body text-xs ${stat.positive ? 'text-green-600 border-green-200' : 'text-secondary border-secondary/30'}`}>
                {stat.change}
              </Badge>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-display text-lg font-semibold text-foreground">Recent Orders</h3>
            <Button variant="ghost" size="sm" className="font-body text-xs">View All</Button>
          </div>
          <div className="divide-y divide-border">
            {sampleOrders.slice(0, 4).map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-body font-medium text-foreground text-sm">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground font-body">{order.itemCount} items · {order.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-foreground">${order.totalAmount.toFixed(2)}</p>
                  <Badge variant="outline" className="font-body text-xs">{order.status.replace(/_/g, ' ')}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Manage Companies', icon: Building2 },
                { label: 'Product Catalog', icon: ShoppingBag },
                { label: 'User Management', icon: Users },
                { label: 'Revenue Analytics', icon: TrendingUp },
              ].map(action => (
                <Button key={action.label} variant="outline" className="w-full justify-start font-body" size="sm">
                  <action.icon className="h-4 w-4 mr-2" /> {action.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-gradient-navy p-5">
            <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'hsl(43, 50%, 95%)' }}>Total Revenue</h3>
            <p className="font-display text-3xl font-bold" style={{ color: 'hsl(43, 50%, 54%)' }}>
              ${(adminStats.monthlyRevenue * 12 * 0.8).toLocaleString()}
            </p>
            <p className="text-sm font-body mt-1" style={{ color: 'hsl(43, 50%, 70%)' }}>Year to Date</p>
            <div className="mt-4 h-2 rounded-full bg-navy-light overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-gold" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
