import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Leaf, Grid3X3, List } from 'lucide-react';
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
    <div className="min-h-screen bg-[hsl(216,68%,8%)]">
      <div className="container py-10">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(43,50%,54%)]/20 bg-[hsl(216,60%,12%)] px-4 py-1.5 text-xs font-body text-[hsl(43,50%,60%)] mb-4">
            B2B PRODUCT CATALOG
          </div>
          <h1 className="font-display text-4xl font-bold text-[hsl(43,50%,95%)]">Product Catalog</h1>
          <p className="font-body text-[hsl(43,50%,65%)] mt-2 text-lg">
            Browse our full range of engravable corporate gifts
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-body font-medium border transition-all ${
              !selectedCategory
                ? 'bg-[hsl(43,50%,54%)] text-[hsl(216,68%,14%)] border-[hsl(43,50%,54%)]'
                : 'border-[hsl(216,40%,22%)] text-[hsl(43,50%,70%)] bg-transparent hover:border-[hsl(43,50%,54%)]/40 hover:text-[hsl(43,50%,85%)]'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-body font-medium border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[hsl(43,50%,54%)] text-[hsl(216,68%,14%)] border-[hsl(43,50%,54%)]'
                  : 'border-[hsl(216,40%,22%)] text-[hsl(43,50%,70%)] bg-transparent hover:border-[hsl(43,50%,54%)]/40 hover:text-[hsl(43,50%,85%)]'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Search & View Toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(43,50%,50%)]" />
            <Input
              placeholder="Search products, SKUs, tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 font-body bg-[hsl(216,60%,12%)] border-[hsl(216,40%,22%)] text-[hsl(43,50%,90%)] placeholder:text-[hsl(43,50%,40%)] focus:border-[hsl(43,50%,54%)]/60 focus:ring-[hsl(43,50%,54%)]/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={`border-[hsl(216,40%,22%)] text-[hsl(43,50%,65%)] hover:border-[hsl(43,50%,54%)]/50 hover:text-[hsl(43,50%,85%)] ${viewMode === 'grid' ? 'bg-[hsl(216,50%,20%)] border-[hsl(43,50%,54%)]/40' : 'bg-transparent'}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode('list')}
              className={`border-[hsl(216,40%,22%)] text-[hsl(43,50%,65%)] hover:border-[hsl(43,50%,54%)]/50 hover:text-[hsl(43,50%,85%)] ${viewMode === 'list' ? 'bg-[hsl(216,50%,20%)] border-[hsl(43,50%,54%)]/40' : 'bg-transparent'}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-[hsl(43,50%,50%)] font-body mb-5">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Products Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' : 'space-y-4'}>
          {filtered.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className={`group rounded-xl border border-[hsl(216,40%,20%)] bg-[hsl(216,60%,12%)] overflow-hidden hover:border-[hsl(43,50%,54%)]/50 hover:shadow-xl hover:shadow-[hsl(43,50%,54%)]/5 hover:bg-[hsl(216,55%,15%)] transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}>
                {/* Product image placeholder */}
                <div className={`bg-gradient-to-br from-[hsl(216,50%,18%)] to-[hsl(216,60%,12%)] flex items-center justify-center ${viewMode === 'list' ? 'w-32 h-32 shrink-0' : 'aspect-square'}`}>
                  <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                    {categories.find(c => c.id === product.categoryId)?.icon || '📦'}
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[hsl(43,50%,45%)] font-body font-mono">{product.sku}</p>
                      <h3 className="font-display font-semibold text-[hsl(43,50%,90%)] mt-0.5 group-hover:text-[hsl(43,50%,54%)] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    {product.isSustainable && (
                      <Leaf className="h-4 w-4 text-green-400 shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-[hsl(43,50%,55%)] font-body mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-display text-xl font-bold text-[hsl(43,50%,92%)]">
                      ${product.basePrice.toFixed(2)}
                    </span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {product.engravingMethods.slice(0, 2).map(m => (
                        <Badge
                          key={m}
                          variant="outline"
                          className="text-[10px] font-body border-[hsl(43,50%,54%)]/25 text-[hsl(43,50%,60%)] bg-[hsl(43,50%,54%)]/5"
                        >
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[hsl(43,50%,45%)] font-body mt-2">
                    {product.variants.length} variants · Min qty: {product.minOrderQty} · {product.leadTimeDays}-day lead
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-30">🔍</div>
            <p className="text-[hsl(43,50%,55%)] font-body text-lg mb-2">No products found</p>
            <p className="text-[hsl(43,50%,40%)] font-body text-sm mb-6">Try adjusting your search or category filters</p>
            <Button
              variant="outline"
              className="font-body border-[hsl(43,50%,54%)]/30 text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/10"
              onClick={() => { setSearch(''); setSelectedCategory(null); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
