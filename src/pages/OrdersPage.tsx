import { Link } from 'react-router-dom';
import { Eye, RotateCcw, FileText, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleOrders } from '@/lib/mock-data';

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive'; color: string }> = {
  DRAFT: { label: 'Draft', variant: 'outline', color: '' },
  PENDING_APPROVAL: { label: 'Pending Approval', variant: 'outline', color: 'border-yellow-500 text-yellow-700' },
  APPROVED: { label: 'Approved', variant: 'secondary', color: '' },
  IN_PRODUCTION: { label: 'In Production', variant: 'default', color: 'bg-blue-600' },
  SHIPPED: { label: 'Shipped', variant: 'default', color: 'bg-indigo-600' },
  DELIVERED: { label: 'Delivered', variant: 'default', color: 'bg-green-600' },
  CANCELLED: { label: 'Cancelled', variant: 'destructive', color: '' },
};

export default function OrdersPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Orders</h1>
          <p className="font-body text-muted-foreground mt-1">Track and manage your company orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-body" size="sm"><Filter className="h-4 w-4 mr-1" /> Filter</Button>
          <Link to="/catalog"><Button className="bg-gradient-gold text-primary font-body font-semibold hover:opacity-90" size="sm">New Order</Button></Link>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_120px_120px_100px_140px_100px] gap-4 p-4 border-b border-border bg-muted/50 text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
          <span>Order</span><span>Items</span><span>Total</span><span>Status</span><span>Date</span><span>Actions</span>
        </div>
        {sampleOrders.map(order => {
          const sc = statusConfig[order.status] || statusConfig.DRAFT;
          return (
            <div key={order.id} className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_100px_140px_100px] gap-4 p-4 border-b border-border last:border-0 items-center hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-body font-semibold text-foreground">{order.orderNumber}</p>
                {order.estimatedShip && <p className="text-xs text-muted-foreground font-body">Est. ship: {order.estimatedShip}</p>}
              </div>
              <span className="text-sm font-body text-muted-foreground">{order.itemCount} items</span>
              <span className="font-display font-bold text-foreground">${order.totalAmount.toFixed(2)}</span>
              <Badge variant={sc.variant} className={`font-body text-xs w-fit ${sc.color}`}>{sc.label}</Badge>
              <span className="text-sm font-body text-muted-foreground">{order.createdAt}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><RotateCcw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><FileText className="h-4 w-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
