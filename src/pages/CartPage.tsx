import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/lib/mock-data';

const cartItems = [
  { id: '1', productId: '1', variantIndex: 1, quantity: 10, engravingText: 'Employee of the Year 2026' },
  { id: '2', productId: '3', variantIndex: 2, quantity: 25, engravingText: 'Acme Corp' },
  { id: '3', productId: '4', variantIndex: 0, quantity: 50, engravingText: '' },
];

export default function CartPage() {
  const items = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    const variant = product.variants[item.variantIndex];
    const unitPrice = product.basePrice + variant.priceModifier;
    return { ...item, product, variant, unitPrice, total: unitPrice * item.quantity };
  });

  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const engravingFee = items.filter(i => i.engravingText).length * 3.50;
  const shipping = subtotal > 500 ? 0 : 24.99;
  const total = subtotal + engravingFee + shipping;

  return (
    <div className="container py-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const categoryIcon = categories.find(c => c.id === item.product.categoryId)?.icon || '📦';
            return (
              <div key={item.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <span className="text-3xl">{categoryIcon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground font-body">{item.variant.name} · {item.product.sku}</p>
                      {item.engravingText && (
                        <p className="text-xs text-secondary font-body mt-1">✏️ "{item.engravingText}"</p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7"><Minus className="h-3 w-3" /></Button>
                      <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7"><Plus className="h-3 w-3" /></Button>
                    </div>
                    <span className="font-display font-bold text-foreground">${item.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="rounded-xl border border-border bg-card p-6 h-fit sticky top-20">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm font-body">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Engraving Fees</span><span>${engravingFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="border-t border-border pt-3 flex justify-between items-baseline">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-display text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button className="w-full bg-gradient-gold text-primary font-body font-semibold hover:opacity-90" size="lg">
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full font-body" size="sm">
              Request Approval (Net-30)
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground font-body mt-4 text-center">
            Orders over $500 ship free. Net-30 invoicing available for verified companies.
          </p>
        </div>
      </div>
    </div>
  );
}
