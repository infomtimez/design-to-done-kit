import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Award, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { to: '/catalog', label: 'Catalog' },
  { to: '/orders', label: 'Orders' },
  { to: '/rewards', label: 'Rewards' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-navy">
            <span className="text-sm font-bold text-gradient-gold font-display" style={{ color: 'hsl(43, 50%, 54%)' }}>E</span>
          </div>
          <span className="font-display text-xl font-bold text-foreground">AwardEngrave</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}>
              <Button
                variant={location.pathname.startsWith(link.to) ? "secondary" : "ghost"}
                size="sm"
                className="font-body"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/admin">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">3</span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="font-body">
              <User className="h-4 w-4 mr-1" /> Sign In
            </Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start font-body">{link.label}</Button>
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border">
            <Link to="/cart" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full font-body"><ShoppingCart className="h-4 w-4 mr-1" /> Cart</Button>
            </Link>
            <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
              <Button variant="default" className="w-full font-body"><User className="h-4 w-4 mr-1" /> Sign In</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
