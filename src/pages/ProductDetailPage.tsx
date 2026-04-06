import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Leaf, Package, Clock, Type, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, categories } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { toast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState('serif');

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body">Product not found.</p>
        <Link to="/catalog"><Button variant="outline" className="mt-4 font-body">Back to Catalog</Button></Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const unitPrice = product.basePrice + variant.priceModifier;
  const totalPrice = unitPrice * quantity;
  const categoryIcon = categories.find(c => c.id === product.categoryId)?.icon || '📦';

  return (
    <div className="container py-8">
      <Link to="/catalog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Product Preview & Configurator */}
        <div className="space-y-6">
          <div className="aspect-square rounded-xl border border-border bg-card flex items-center justify-center relative overflow-hidden">
            <div className="text-8xl">{categoryIcon}</div>
            {/* Engraving preview overlay */}
            {engravingText && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-navy/80 rounded-lg backdrop-blur">
                <p className={`text-center text-gold ${engravingFont === 'serif' ? 'font-display' : 'font-body'}`} style={{ letterSpacing: '0.05em' }}>
                  {engravingText}
                </p>
              </div>
            )}
          </div>
          
          {/* Engraving Configurator */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Type className="h-5 w-5 text-secondary" /> Engraving Configurator
            </h3>
            <Tabs defaultValue="text">
              <TabsList className="w-full">
                <TabsTrigger value="text" className="flex-1 font-body">Text</TabsTrigger>
                <TabsTrigger value="logo" className="flex-1 font-body">Logo Upload</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1 font-body">3D Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label className="font-body text-sm">Engraving Text</Label>
                  <Input placeholder="Enter text to engrave..." value={engravingText} onChange={e => setEngravingText(e.target.value)} className="font-body" />
                  <p className="text-xs text-muted-foreground font-body">Max 500 characters. Preview updates live above.</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Font Style</Label>
                  <div className="flex gap-2">
                    {[{ val: 'serif', label: 'Classic Serif' }, { val: 'sans', label: 'Modern Sans' }, { val: 'script', label: 'Script' }].map(f => (
                      <Button key={f.val} variant={engravingFont === f.val ? "secondary" : "outline"} size="sm" onClick={() => setEngravingFont(f.val)} className="font-body text-xs flex-1">
                        {f.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-body text-sm">Engraving Position</Label>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="font-body text-xs flex-1">Main Plate</Button>
                    <Button variant="outline" size="sm" className="font-body text-xs flex-1">Small Plate</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="logo" className="pt-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-body text-muted-foreground">Drag & drop your logo or click to upload</p>
                  <p className="text-xs text-muted-foreground font-body mt-1">SVG, PNG, or JPG — Auto-vectorization included</p>
                  <Button variant="outline" size="sm" className="font-body mt-4">Choose File</Button>
                </div>
              </TabsContent>
              <TabsContent value="preview" className="pt-4">
                <div className="aspect-video rounded-lg bg-gradient-to-b from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-3">{categoryIcon}</div>
                    <p className="text-sm font-body text-muted-foreground">3D Preview — React Three Fiber</p>
                    <p className="text-xs font-body text-muted-foreground">Rotate, zoom, and inspect your engraving</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="font-body text-xs">{product.categoryName}</Badge>
              <span className="text-xs text-muted-foreground font-body">{product.sku}</span>
              {product.isSustainable && (
                <Badge className="bg-green-100 text-green-700 font-body text-xs"><Leaf className="h-3 w-3 mr-1" /> Eco-Friendly</Badge>
              )}
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="font-body text-muted-foreground mt-2 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-foreground">${unitPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground font-body">per unit</span>
          </div>

          {/* Variants */}
          <div className="space-y-3">
            <Label className="font-body text-sm font-medium">Select Variant</Label>
            <div className="grid grid-cols-3 gap-2">
              {product.variants.map((v, i) => (
                <button key={v.sku} onClick={() => setSelectedVariant(i)}
                  className={`rounded-lg border p-3 text-left transition-all ${i === selectedVariant ? 'border-secondary bg-secondary/5 ring-1 ring-secondary' : 'border-border hover:border-secondary/40'}`}>
                  <p className="font-body text-sm font-medium text-foreground">{v.name}</p>
                  <p className="text-xs text-muted-foreground font-body">
                    {v.priceModifier > 0 ? `+$${v.priceModifier.toFixed(2)}` : v.priceModifier < 0 ? `-$${Math.abs(v.priceModifier).toFixed(2)}` : 'Base price'}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">{v.stock} in stock</p>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="font-body text-sm font-medium">Quantity (min: {product.minOrderQty})</Label>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}>-</Button>
              <Input type="number" value={quantity} onChange={e => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || 1))} className="w-20 text-center font-body" />
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>
          </div>

          {/* Specs */}
          <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
            <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Material</span><span className="text-foreground font-medium">{product.material}</span></div>
            <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Engraving</span><span className="text-foreground font-medium">{product.engravingMethods.join(', ')}</span></div>
            <div className="flex justify-between text-sm font-body"><span className="text-muted-foreground">Lead Time</span><span className="text-foreground font-medium">{product.leadTimeDays} business days</span></div>
            <div className="flex justify-between text-sm font-body border-t border-border pt-2 mt-2">
              <span className="text-foreground font-semibold">Total</span>
              <span className="font-display text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-gold text-primary font-body font-semibold hover:opacity-90" size="lg"
              onClick={() => toast({ title: 'Added to cart!', description: `${product.name} (${variant.name}) x${quantity}` })}>
              <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Link to="/cart" className="flex-1">
              <Button variant="outline" className="w-full font-body" size="lg">Buy Now</Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
            <span className="flex items-center gap-1"><Package className="h-3 w-3" /> Free shipping 50+ units</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Net-30 available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
