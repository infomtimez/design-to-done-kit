export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  basePrice: number;
  material: string;
  engravingMethods: string[];
  images: string[];
  tags: string[];
  minOrderQty: number;
  leadTimeDays: number;
  isSustainable: boolean;
  variants: ProductVariant[];
}

export interface ProductVariant {
  sku: string;
  name: string;
  priceModifier: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  icon: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  engravingText?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
  itemCount: number;
  createdAt: string;
  estimatedShip?: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Plaques & Awards', slug: 'plaques-awards', productCount: 24, icon: '🏆' },
  { id: '2', name: 'Trophies & Cups', slug: 'trophies-cups', productCount: 18, icon: '🏅' },
  { id: '3', name: 'Pens & Writing', slug: 'pens-writing', productCount: 32, icon: '🖊️' },
  { id: '4', name: 'Drinkware', slug: 'drinkware', productCount: 28, icon: '☕' },
  { id: '5', name: 'Tech & Gadgets', slug: 'tech-gadgets', productCount: 15, icon: '📱' },
  { id: '6', name: 'Desk & Office', slug: 'desk-office', productCount: 22, icon: '💼' },
];

export const products: Product[] = [
  {
    id: '1', sku: 'JDS-PL001', name: 'Rosewood Piano Finish Plaque',
    description: 'Premium 9x12 rosewood piano finish plaque with black brass plate. Perfect for employee recognition, service awards, and corporate milestones.',
    categoryId: '1', categoryName: 'Plaques & Awards', basePrice: 42.50, material: 'Rosewood / Brass',
    engravingMethods: ['Laser', 'Rotary'], images: [], tags: ['award', 'recognition', 'rosewood'],
    minOrderQty: 1, leadTimeDays: 5, isSustainable: false,
    variants: [
      { sku: 'JDS-PL001-8x10', name: '8x10', priceModifier: -5.00, stock: 150 },
      { sku: 'JDS-PL001-9x12', name: '9x12', priceModifier: 0, stock: 200 },
      { sku: 'JDS-PL001-10x13', name: '10.5x13', priceModifier: 8.00, stock: 100 },
    ],
  },
  {
    id: '2', sku: 'JDS-TR001', name: 'Crystal Flame Award',
    description: 'Stunning optical crystal flame award on black base. Laser engravable for a frosted elegant effect.',
    categoryId: '2', categoryName: 'Trophies & Cups', basePrice: 68.00, material: 'Optical Crystal',
    engravingMethods: ['Laser', 'Sandblast'], images: [], tags: ['crystal', 'trophy', 'premium'],
    minOrderQty: 1, leadTimeDays: 7, isSustainable: false,
    variants: [
      { sku: 'JDS-TR001-SM', name: 'Small (7")', priceModifier: -15, stock: 80 },
      { sku: 'JDS-TR001-MD', name: 'Medium (9")', priceModifier: 0, stock: 120 },
      { sku: 'JDS-TR001-LG', name: 'Large (11")', priceModifier: 25, stock: 60 },
    ],
  },
  {
    id: '3', sku: 'JDS-PEN001', name: 'Gloss Rosewood Ballpoint Pen',
    description: 'High-gloss rosewood ballpoint pen in matching wood gift box. Ideal for corporate gifts and executive recognition.',
    categoryId: '3', categoryName: 'Pens & Writing', basePrice: 24.95, material: 'Rosewood',
    engravingMethods: ['Laser', 'Rotary'], images: [], tags: ['pen', 'executive', 'gift'],
    minOrderQty: 5, leadTimeDays: 3, isSustainable: true,
    variants: [
      { sku: 'JDS-PEN001-RW', name: 'Rosewood', priceModifier: 0, stock: 500 },
      { sku: 'JDS-PEN001-MB', name: 'Matte Black', priceModifier: 2.00, stock: 300 },
      { sku: 'JDS-PEN001-GD', name: 'Gold Trim', priceModifier: 5.00, stock: 200 },
    ],
  },
  {
    id: '4', sku: 'JDS-MUG001', name: 'Stainless Steel Travel Tumbler',
    description: '20oz double-wall vacuum insulated stainless steel tumbler with clear slider lid. Laser engravable for a personalized touch.',
    categoryId: '4', categoryName: 'Drinkware', basePrice: 18.50, material: 'Stainless Steel',
    engravingMethods: ['Laser'], images: [], tags: ['tumbler', 'drinkware', 'bulk'],
    minOrderQty: 10, leadTimeDays: 4, isSustainable: true,
    variants: [
      { sku: 'JDS-MUG001-BK', name: 'Black', priceModifier: 0, stock: 1000 },
      { sku: 'JDS-MUG001-NV', name: 'Navy', priceModifier: 0, stock: 800 },
      { sku: 'JDS-MUG001-WH', name: 'White', priceModifier: 0, stock: 600 },
      { sku: 'JDS-MUG001-RD', name: 'Red', priceModifier: 0, stock: 400 },
    ],
  },
  {
    id: '5', sku: 'JDS-GD001', name: 'Bamboo Wireless Charging Pad',
    description: 'Eco-friendly bamboo wireless charging pad with 10W fast charge. Laser engravable surface for corporate branding.',
    categoryId: '5', categoryName: 'Tech & Gadgets', basePrice: 22.00, material: 'Bamboo / Electronics',
    engravingMethods: ['Laser'], images: [], tags: ['tech', 'eco', 'wireless', 'charging'],
    minOrderQty: 25, leadTimeDays: 5, isSustainable: true,
    variants: [
      { sku: 'JDS-GD001-NAT', name: 'Natural Bamboo', priceModifier: 0, stock: 300 },
      { sku: 'JDS-GD001-DK', name: 'Dark Stain', priceModifier: 1.50, stock: 200 },
    ],
  },
  {
    id: '6', sku: 'JDS-DSK001', name: 'Executive Desk Name Block',
    description: 'Solid walnut desk name block with black brass plate. Classic executive gift for offices and boardrooms.',
    categoryId: '6', categoryName: 'Desk & Office', basePrice: 32.00, material: 'Walnut / Brass',
    engravingMethods: ['Laser', 'Rotary', 'Diamond Drag'], images: [], tags: ['desk', 'nameplate', 'executive'],
    minOrderQty: 1, leadTimeDays: 4, isSustainable: false,
    variants: [
      { sku: 'JDS-DSK001-2x8', name: '2x8 inch', priceModifier: 0, stock: 250 },
      { sku: 'JDS-DSK001-2x10', name: '2x10 inch', priceModifier: 6.00, stock: 150 },
    ],
  },
  {
    id: '7', sku: 'JDS-PL002', name: 'Acrylic Star Award',
    description: 'Clear acrylic star on black pedestal base. UV-printable for full-color logos or laser engrave for elegance.',
    categoryId: '2', categoryName: 'Trophies & Cups', basePrice: 35.00, material: 'Acrylic',
    engravingMethods: ['Laser', 'UV Print'], images: [], tags: ['acrylic', 'star', 'award', 'color'],
    minOrderQty: 1, leadTimeDays: 5, isSustainable: false,
    variants: [
      { sku: 'JDS-PL002-SM', name: 'Small (5")', priceModifier: -8.00, stock: 200 },
      { sku: 'JDS-PL002-MD', name: 'Medium (7")', priceModifier: 0, stock: 150 },
      { sku: 'JDS-PL002-LG', name: 'Large (9")', priceModifier: 12.00, stock: 80 },
    ],
  },
  {
    id: '8', sku: 'JDS-FL001', name: 'Stainless Steel Flask Set',
    description: '7oz stainless steel flask with 4 shot glasses in black presentation box. Laser engraves to brushed silver.',
    categoryId: '4', categoryName: 'Drinkware', basePrice: 28.50, material: 'Stainless Steel / Leatherette',
    engravingMethods: ['Laser'], images: [], tags: ['flask', 'gift-set', 'groomsmen'],
    minOrderQty: 5, leadTimeDays: 5, isSustainable: false,
    variants: [
      { sku: 'JDS-FL001-BK', name: 'Black Leatherette', priceModifier: 0, stock: 300 },
      { sku: 'JDS-FL001-BN', name: 'Brown Leatherette', priceModifier: 0, stock: 200 },
      { sku: 'JDS-FL001-SS', name: 'Plain Stainless', priceModifier: 0, stock: 150 },
    ],
  },
];

export const sampleOrders: Order[] = [
  { id: '1', orderNumber: 'EN-2026-000142', status: 'DELIVERED', totalAmount: 2450.00, itemCount: 50, createdAt: '2026-03-15', estimatedShip: '2026-03-22' },
  { id: '2', orderNumber: 'EN-2026-000156', status: 'IN_PRODUCTION', totalAmount: 890.50, itemCount: 12, createdAt: '2026-03-28', estimatedShip: '2026-04-05' },
  { id: '3', orderNumber: 'EN-2026-000163', status: 'PENDING_APPROVAL', totalAmount: 1560.00, itemCount: 30, createdAt: '2026-04-02' },
  { id: '4', orderNumber: 'EN-2026-000171', status: 'APPROVED', totalAmount: 425.75, itemCount: 8, createdAt: '2026-04-05' },
  { id: '5', orderNumber: 'EN-2026-000098', status: 'SHIPPED', totalAmount: 3200.00, itemCount: 75, createdAt: '2026-02-20', estimatedShip: '2026-03-01' },
];

export const rewardBalance = {
  points: 12500,
  dollarValue: 125.00,
  totalEarned: 45000,
  totalSpent: 32500,
  programName: 'Acme Corp Recognition',
};

export const rewardTransactions = [
  { id: '1', type: 'EARN', amount: 5000, description: '5-Year Service Anniversary', date: '2026-03-01' },
  { id: '2', type: 'REDEEM', amount: -2500, description: 'Crystal Flame Award Redemption', date: '2026-03-10' },
  { id: '3', type: 'EARN', amount: 3000, description: 'Q1 Performance Bonus', date: '2026-03-15' },
  { id: '4', type: 'EARN', amount: 1000, description: 'Birthday Recognition', date: '2026-02-14' },
  { id: '5', type: 'REDEEM', amount: -1500, description: 'Executive Pen Set', date: '2026-01-20' },
];

export const adminStats = {
  totalOrders: 1247,
  monthlyRevenue: 89450,
  activeCompanies: 34,
  pendingApprovals: 12,
  ordersThisMonth: 156,
  revenueGrowth: 18.5,
};
