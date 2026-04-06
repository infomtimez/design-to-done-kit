import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-navy items-center justify-center p-12">
        <div className="max-w-md space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/20">
              <span className="font-display text-xl font-bold" style={{ color: 'hsl(43, 50%, 54%)' }}>E</span>
            </div>
            <span className="font-display text-2xl font-bold" style={{ color: 'hsl(43, 50%, 95%)' }}>EngraveNet</span>
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight" style={{ color: 'hsl(43, 50%, 95%)' }}>
            Your corporate gifting platform awaits
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: 'hsl(43, 50%, 70%)' }}>
            Access your company's custom catalog, configure engravings, manage orders, and redeem reward points — all in one place.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {['SSO / LDAP Support', 'Secure & Encrypted', 'Role-Based Access', 'Audit Logging'].map(feat => (
              <div key={feat} className="flex items-center gap-2 text-sm font-body" style={{ color: 'hsl(43, 50%, 75%)' }}>
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-navy">
              <span className="text-sm font-bold font-display" style={{ color: 'hsl(43, 50%, 54%)' }}>E</span>
            </div>
            <span className="font-display text-xl font-bold text-foreground">EngraveNet</span>
          </div>
          
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="font-body text-muted-foreground mt-1">Sign in to your company portal</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Email</Label>
              <Input type="email" placeholder="you@company.com" className="font-body" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-body text-sm font-medium">Password</Label>
                <a href="#" className="text-xs text-secondary hover:text-secondary/80 font-body">Forgot password?</a>
              </div>
              <div className="relative">
                <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="font-body pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Link to="/catalog">
              <Button type="submit" className="w-full bg-gradient-navy font-body font-semibold text-primary-foreground hover:opacity-90">
                Sign In
              </Button>
            </Link>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground font-body">Or continue with</span></div>
          </div>

          <Button variant="outline" className="w-full font-body" onClick={() => {}}>
            <Building2 className="h-4 w-4 mr-2" /> Sign in with SSO (Keycloak)
          </Button>

          <p className="text-center text-sm text-muted-foreground font-body">
            Enterprise customer?{' '}
            <a href="#" className="text-secondary hover:underline">Contact your admin</a>{' '}
            for portal access.
          </p>
        </div>
      </div>
    </div>
  );
}
