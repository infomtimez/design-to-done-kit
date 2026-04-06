import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Palette, Users, Truck, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  { icon: Palette, title: 'Live Engraving Preview', description: '2D & 3D configurator with real-time preview. Text, logos, and multi-position engraving.' },
  { icon: Users, title: 'Multi-Tenant Portals', description: 'Branded company portals with custom catalogs, pricing tiers, and approval workflows.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SSO via Keycloak (SAML/LDAP), tenant isolation, audit logging, and encryption.' },
  { icon: Truck, title: 'B2B Order Management', description: 'Bulk CSV/PO upload, Net-30 invoicing, approval chains, and quick reorder.' },
  { icon: Award, title: 'Rewards & Recognition', description: 'Points-based programs with HR import, automated triggers, and self-service redemption.' },
  { icon: Zap, title: 'ERP Integration', description: 'Real-time sync hooks for inventory, orders, and fulfillment with existing systems.' },
];

const stats = [
  { value: '50+', label: 'Enterprise Clients' },
  { value: '10K+', label: 'Products Engraved' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '< 5 days', label: 'Avg. Lead Time' },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Corporate gift display" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-navy-light/50 px-4 py-1.5 text-sm font-body" style={{ color: 'hsl(43, 50%, 54%)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              B2B Corporate Gift Platform
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight" style={{ color: 'hsl(43, 50%, 95%)' }}>
              Personalized Gifts,{' '}
              <span className="text-gradient-gold">Enterprise Scale</span>
            </h1>
            <p className="text-lg md:text-xl font-body leading-relaxed" style={{ color: 'hsl(43, 50%, 80%)' }}>
              AwardEngrave powers corporate recognition programs with custom engraving, multi-tenant portals, and seamless B2B order management.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/catalog">
                <Button size="lg" className="bg-gradient-gold text-primary font-body font-semibold hover:opacity-90 transition-opacity">
                  Browse Catalog <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-gold/30 font-body hover:bg-gold/10" style={{ color: 'hsl(43, 50%, 80%)' }}>
                  Sign In to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-body mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Enterprise</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Every feature designed for corporate gifting at scale — from multi-position engraving to approval workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className="group rounded-xl border border-border bg-card p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-gold">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-navy py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold mb-4" style={{ color: 'hsl(43, 50%, 95%)' }}>
            Ready to Elevate Your Corporate Gifting?
          </h2>
          <p className="font-body text-lg mb-8 max-w-xl mx-auto" style={{ color: 'hsl(43, 50%, 75%)' }}>
            Deploy on your cloud or on-premise. Full Docker support for air-gapped networks.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/catalog">
              <Button size="lg" className="bg-gradient-gold text-primary font-body font-semibold hover:opacity-90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-gold/30 font-body" style={{ color: 'hsl(43, 50%, 85%)' }}>
              Request Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
