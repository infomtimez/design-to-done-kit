import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Leaf, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { products, categories } from '@/lib/mock-data';

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = products.filter(p => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase()));
    const matchesCategory = !selectedCategory || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Product Catalog</h1>
        <p className="font-body text-muted-foreground mt-1">Browse our full range of engravable corporate gifts</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant={!selectedCategory ? "secondary" : "outline"} size="sm" onClick={() => setSelectedCategory(null)} className="font-body">
          All Products
        </Button>
        {categories.map(cat => (
          <Button key={cat.id} variant={selectedCategory === cat.id ? "secondary" : "outline"} size="sm" onClick={() => setSelectedCategory(cat.id)} className="font-body">
            {cat.icon} {cat.name} <span className="ml-1 text-muted-foreground">({cat.productCount})</span>
          </Button>
        ))}
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products, SKUs, tags..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 font-body" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-muted' : ''}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-muted' : ''}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' : 'space-y-4'}>
        {filtered.map(product => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className={`group rounded-xl border border-border bg-card overflow-hidden hover:border-gold/40 hover:shadow-lg transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
              {/* Product image placeholder */}
              <div className={`bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'}`}>
                <div className="text-4xl">{categories.find(c => c.id === product.categoryId)?.icon || '📦'}</div>
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground font-body">{product.sku}</p>
                    <h3 className="font-display font-semibold text-foreground mt-0.5 group-hover:text-secondary transition-colors">{product.name}</h3>
                  </div>
                  {product.isSustainable && <Leaf className="h-4 w-4 text-green-600 shrink-0 mt-1" />}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-display text-lg font-bold text-foreground">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <div className="flex gap-1">
                    {product.engravingMethods.slice(0, 2).map(m => (
                      <Badge key={m} variant="outline" className="text-[10px] font-body">{m}</Badge>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground font-body mt-2">
                  {product.variants.length} variants · Min qty: {product.minOrderQty} · {product.leadTimeDays}-day lead
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-body">No products found matching your criteria.</p>
          <Button variant="outline" className="mt-4 font-body" onClick={() => { setSearch(''); setSelectedCategory(null); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
