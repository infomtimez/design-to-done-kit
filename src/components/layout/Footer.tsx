import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-navy">
                <span className="text-xs font-bold font-display" style={{ color: 'hsl(43, 50%, 54%)' }}>E</span>
              </div>
              <span className="font-display text-lg font-bold text-foreground">AwardEngrave</span>
            </div>
            <p className="text-sm text-muted-foreground font-body">
              Enterprise B2B platform for corporate gifts, engraved items, and employee recognition programs.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li><Link to="/catalog" className="hover:text-foreground transition-colors">Browse Catalog</Link></li>
              <li><Link to="/catalog" className="hover:text-foreground transition-colors">Custom Engraving</Link></li>
              <li><Link to="/catalog" className="hover:text-foreground transition-colors">Bulk Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-body">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Returns Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground font-body">
          © 2026 AwardEngrave. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
