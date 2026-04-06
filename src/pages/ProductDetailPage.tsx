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
      <div className="min-h-screen bg-[hsl(216,68%,8%)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">📦</div>
          <p className="text-[hsl(43,50%,60%)] font-body text-lg mb-4">Product not found.</p>
          <Link to="/catalog">
            <Button variant="outline" className="font-body border-[hsl(43,50%,54%)]/30 text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/10">
              Back to Catalog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const unitPrice = product.basePrice + variant.priceModifier;
  const totalPrice = unitPrice * quantity;
  const categoryIcon = categories.find(c => c.id === product.categoryId)?.icon || '📦';

  return (
    <div className="min-h-screen bg-[hsl(216,68%,8%)]">
      <div className="container py-8">

        {/* Breadcrumb */}
        <Link
          to="/catalog"
          className="inline-flex items-center gap-1.5 text-sm text-[hsl(43,50%,55%)] hover:text-[hsl(43,50%,75%)] font-body mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Preview & Configurator ── */}
          <div className="space-y-6">

            {/* Product Preview */}
            <div className="aspect-square rounded-2xl border border-[hsl(216,40%,20%)] bg-[hsl(216,60%,12%)] flex items-center justify-center relative overflow-hidden">
              {/* subtle grid pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(hsl(43,50%,54%) 1px, transparent 1px), linear-gradient(90deg, hsl(43,50%,54%) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              <div className="text-9xl relative z-10 drop-shadow-2xl">{categoryIcon}</div>
              {engravingText && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-[hsl(216,68%,8%)]/80 rounded-xl backdrop-blur border border-[hsl(43,50%,54%)]/20">
                  <p
                    className={`text-center text-[hsl(43,50%,54%)] ${engravingFont === 'serif' ? 'font-display' : 'font-body'}`}
                    style={{ letterSpacing: '0.08em', fontSize: '0.95rem' }}
                  >
                    {engravingText}
                  </p>
                </div>
              )}
            </div>

            {/* Engraving Configurator */}
            <div className="rounded-2xl border border-[hsl(216,40%,20%)] bg-[hsl(216,60%,12%)] p-6">
              <h3 className="font-display text-lg font-semibold text-[hsl(43,50%,92%)] mb-5 flex items-center gap-2">
                <Type className="h-5 w-5 text-[hsl(43,50%,54%)]" />
                Engraving Configurator
              </h3>
              <Tabs defaultValue="text">
                <TabsList className="w-full bg-[hsl(216,68%,8%)] border border-[hsl(216,40%,20%)]">
                  <TabsTrigger value="text" className="flex-1 font-body text-[hsl(43,50%,60%)] data-[state=active]:bg-[hsl(216,50%,20%)] data-[state=active]:text-[hsl(43,50%,90%)]">Text</TabsTrigger>
                  <TabsTrigger value="logo" className="flex-1 font-body text-[hsl(43,50%,60%)] data-[state=active]:bg-[hsl(216,50%,20%)] data-[state=active]:text-[hsl(43,50%,90%)]">Logo Upload</TabsTrigger>
                  <TabsTrigger value="preview" className="flex-1 font-body text-[hsl(43,50%,60%)] data-[state=active]:bg-[hsl(216,50%,20%)] data-[state=active]:text-[hsl(43,50%,90%)]">3D Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4 pt-5">
                  <div className="space-y-2">
                    <Label className="font-body text-sm text-[hsl(43,50%,70%)]">Engraving Text</Label>
                    <Input
                      placeholder="Enter text to engrave..."
                      value={engravingText}
                      onChange={e => setEngravingText(e.target.value)}
                      className="font-body bg-[hsl(216,68%,8%)] border-[hsl(216,40%,22%)] text-[hsl(43,50%,90%)] placeholder:text-[hsl(43,50%,35%)] focus:border-[hsl(43,50%,54%)]/60"
                    />
                    <p className="text-xs text-[hsl(43,50%,45%)] font-body">Max 500 characters. Preview updates live above.</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm text-[hsl(43,50%,70%)]">Font Style</Label>
                    <div className="flex gap-2">
                      {[{ val: 'serif', label: 'Classic Serif' }, { val: 'sans', label: 'Modern Sans' }, { val: 'script', label: 'Script' }].map(f => (
                        <Button
                          key={f.val}
                          variant={engravingFont === f.val ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setEngravingFont(f.val)}
                          className={`font-body text-xs flex-1 transition-all ${
                            engravingFont === f.val
                              ? 'bg-gradient-gold text-[hsl(216,68%,14%)] border-transparent'
                              : 'border-[hsl(216,40%,22%)] text-[hsl(43,50%,65%)] hover:border-[hsl(43,50%,54%)]/40 bg-transparent'
                          }`}
                        >
                          {f.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm text-[hsl(43,50%,70%)]">Engraving Position</Label>
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="font-body text-xs flex-1 bg-gradient-gold text-[hsl(216,68%,14%)] border-transparent">Main Plate</Button>
                      <Button variant="outline" size="sm" className="font-body text-xs flex-1 border-[hsl(216,40%,22%)] text-[hsl(43,50%,65%)] bg-transparent hover:border-[hsl(43,50%,54%)]/40">Small Plate</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="logo" className="pt-5">
                  <div className="border-2 border-dashed border-[hsl(216,40%,22%)] hover:border-[hsl(43,50%,54%)]/30 rounded-xl p-10 text-center transition-colors">
                    <Image className="h-10 w-10 text-[hsl(43,50%,40%)] mx-auto mb-3" />
                    <p className="text-sm font-body text-[hsl(43,50%,60%)]">Drag & drop your logo or click to upload</p>
                    <p className="text-xs text-[hsl(43,50%,40%)] font-body mt-1">SVG, PNG, or JPG — Auto-vectorization included</p>
                    <Button variant="outline" size="sm" className="font-body mt-4 border-[hsl(43,50%,54%)]/30 text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/10">
                      Choose File
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="pt-5">
                  <div className="aspect-video rounded-xl bg-gradient-to-b from-[hsl(216,50%,16%)] to-[hsl(216,68%,8%)] flex items-center justify-center border border-[hsl(216,40%,20%)]">
                    <div className="text-center">
                      <div className="text-6xl mb-3 opacity-60">{categoryIcon}</div>
                      <p className="text-sm font-body text-[hsl(43,50%,55%)]">3D Preview — React Three Fiber</p>
                      <p className="text-xs font-body text-[hsl(43,50%,40%)] mt-1">Rotate, zoom, and inspect your engraving</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ── Right: Product Details ── */}
          <div className="space-y-7">

            {/* Title & Badges */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Badge variant="outline" className="font-body text-xs border-[hsl(43,50%,54%)]/30 text-[hsl(43,50%,60%)] bg-[hsl(43,50%,54%)]/5">
                  {product.categoryName}
                </Badge>
                <span className="text-xs text-[hsl(43,50%,40%)] font-body font-mono">{product.sku}</span>
                {product.isSustainable && (
                  <Badge className="bg-green-900/40 text-green-400 border border-green-500/20 font-body text-xs">
                    <Leaf className="h-3 w-3 mr-1" /> Eco-Friendly
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-4xl font-bold text-[hsl(43,50%,95%)]">{product.name}</h1>
              <p className="font-body text-[hsl(43,50%,62%)] mt-3 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold text-[hsl(43,50%,92%)]">${unitPrice.toFixed(2)}</span>
              <span className="text-sm text-[hsl(43,50%,50%)] font-body">per unit</span>
            </div>

            {/* Variants */}
            <div className="space-y-3">
              <Label className="font-body text-sm font-medium text-[hsl(43,50%,70%)]">Select Variant</Label>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sku}
                    onClick={() => setSelectedVariant(i)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      i === selectedVariant
                        ? 'border-[hsl(43,50%,54%)] bg-[hsl(43,50%,54%)]/10 ring-1 ring-[hsl(43,50%,54%)]/30'
                        : 'border-[hsl(216,40%,22%)] bg-[hsl(216,60%,12%)] hover:border-[hsl(43,50%,54%)]/40 hover:bg-[hsl(216,55%,15%)]'
                    }`}
                  >
                    <p className="font-body text-sm font-medium text-[hsl(43,50%,90%)]">{v.name}</p>
                    <p className="text-xs text-[hsl(43,50%,55%)] font-body">
                      {v.priceModifier > 0 ? `+$${v.priceModifier.toFixed(2)}` : v.priceModifier < 0 ? `-$${Math.abs(v.priceModifier).toFixed(2)}` : 'Base price'}
                    </p>
                    <p className="text-xs text-[hsl(43,50%,45%)] font-body">{v.stock} in stock</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium text-[hsl(43,50%,70%)]">
                Quantity <span className="text-[hsl(43,50%,45%)] font-normal">(min: {product.minOrderQty})</span>
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}
                  className="border-[hsl(216,40%,22%)] text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/10 hover:border-[hsl(43,50%,54%)]/40 bg-transparent"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(product.minOrderQty, parseInt(e.target.value) || 1))}
                  className="w-20 text-center font-body bg-[hsl(216,60%,12%)] border-[hsl(216,40%,22%)] text-[hsl(43,50%,90%)] focus:border-[hsl(43,50%,54%)]/60"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-[hsl(216,40%,22%)] text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/10 hover:border-[hsl(43,50%,54%)]/40 bg-transparent"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Specs */}
            <div className="rounded-xl border border-[hsl(216,40%,20%)] bg-[hsl(216,60%,12%)] p-5 space-y-3">
              {[
                { label: 'Material', value: product.material },
                { label: 'Engraving', value: product.engravingMethods.join(', ') },
                { label: 'Lead Time', value: `${product.leadTimeDays} business days` },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm font-body">
                  <span className="text-[hsl(43,50%,50%)]">{row.label}</span>
                  <span className="text-[hsl(43,50%,85%)] font-medium">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-body border-t border-[hsl(216,40%,20%)] pt-3 mt-1">
                <span className="text-[hsl(43,50%,85%)] font-semibold">Total</span>
                <span className="font-display text-2xl font-bold text-[hsl(43,50%,54%)]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-gold text-[hsl(216,68%,14%)] font-body font-semibold hover:opacity-90 shadow-lg shadow-[hsl(43,50%,54%)]/20"
                size="lg"
                onClick={() => toast({ title: 'Added to cart!', description: `${product.name} (${variant.name}) x${quantity}` })}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
              <Link to="/cart" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full font-body border-[hsl(43,50%,54%)]/30 text-[hsl(43,50%,75%)] hover:bg-[hsl(43,50%,54%)]/10 hover:border-[hsl(43,50%,54%)]/50"
                  size="lg"
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-5 text-xs text-[hsl(43,50%,45%)] font-body pt-1">
              <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> Free shipping 50+ units</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Net-30 available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
