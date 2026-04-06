import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-[hsl(216,68%,8%)]">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-14 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-navy" />
        {/* Decorative dots */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(hsl(43,50%,54%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-[hsl(43,50%,54%)]/10 blur-3xl" />

        <div className="relative max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-gold shadow-lg shadow-[hsl(43,50%,54%)]/25">
              <span className="font-display text-xl font-bold text-[hsl(216,68%,14%)]">E</span>
            </div>
            <span className="font-display text-2xl font-bold text-[hsl(43,50%,95%)]">EngraveNet</span>
          </div>

          <div>
            <h2 className="font-display text-4xl font-bold leading-tight text-[hsl(43,50%,95%)]">
              Your corporate gifting platform awaits
            </h2>
            <p className="font-body text-lg leading-relaxed text-[hsl(43,50%,65%)] mt-4">
              Access your company's custom catalog, configure engravings, manage orders, and redeem reward points — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {['SSO / LDAP Support', 'Secure & Encrypted', 'Role-Based Access', 'Audit Logging'].map(feat => (
              <div key={feat} className="flex items-center gap-2.5 text-sm font-body text-[hsl(43,50%,68%)]">
                <div className="h-1.5 w-1.5 rounded-full bg-[hsl(43,50%,54%)] shrink-0" />
                {feat}
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-xl border border-[hsl(216,40%,25%)] bg-[hsl(216,60%,12%)]/60 backdrop-blur p-5 mt-6">
            <p className="text-sm font-body text-[hsl(43,50%,70%)] italic leading-relaxed">
              "AwardEngrave transformed how we handle employee recognition. Our HR team saves 20 hours a month."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center text-xs font-bold text-[hsl(216,68%,14%)]">JM</div>
              <div>
                <p className="text-xs font-body font-semibold text-[hsl(43,50%,85%)]">James Mitchell</p>
                <p className="text-xs font-body text-[hsl(43,50%,50%)]">Head of HR, Acme Corp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[hsl(216,68%,8%)]">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-gold shadow-md">
              <span className="text-sm font-bold font-display text-[hsl(216,68%,14%)]">E</span>
            </div>
            <span className="font-display text-xl font-bold text-[hsl(43,50%,95%)]">EngraveNet</span>
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-[hsl(43,50%,95%)]">Welcome back</h1>
            <p className="font-body text-[hsl(43,50%,60%)] mt-1">Sign in to your company portal</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium text-[hsl(43,50%,72%)]">Email</Label>
              <Input
                type="email"
                placeholder="you@company.com"
                className="font-body bg-[hsl(216,60%,12%)] border-[hsl(216,40%,22%)] text-[hsl(43,50%,90%)] placeholder:text-[hsl(43,50%,35%)] focus:border-[hsl(43,50%,54%)]/60 focus:ring-[hsl(43,50%,54%)]/10 h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="font-body text-sm font-medium text-[hsl(43,50%,72%)]">Password</Label>
                <a href="#" className="text-xs text-[hsl(43,50%,54%)] hover:text-[hsl(43,50%,70%)] font-body transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="font-body pr-10 bg-[hsl(216,60%,12%)] border-[hsl(216,40%,22%)] text-[hsl(43,50%,90%)] placeholder:text-[hsl(43,50%,35%)] focus:border-[hsl(43,50%,54%)]/60 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(43,50%,45%)] hover:text-[hsl(43,50%,70%)] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Link to="/catalog">
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-gold text-[hsl(216,68%,14%)] font-body font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[hsl(43,50%,54%)]/20 mt-1"
              >
                Sign In
              </Button>
            </Link>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[hsl(216,40%,20%)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[hsl(216,68%,8%)] px-3 text-[hsl(43,50%,40%)] font-body tracking-widest">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 font-body border-[hsl(216,40%,22%)] text-[hsl(43,50%,70%)] hover:bg-[hsl(43,50%,54%)]/8 hover:border-[hsl(43,50%,54%)]/40 hover:text-[hsl(43,50%,85%)] bg-transparent transition-all"
            onClick={() => {}}
          >
            <Building2 className="h-4 w-4 mr-2" /> Sign in with SSO (Keycloak)
          </Button>

          <p className="text-center text-sm text-[hsl(43,50%,45%)] font-body">
            Enterprise customer?{' '}
            <a href="#" className="text-[hsl(43,50%,54%)] hover:text-[hsl(43,50%,72%)] transition-colors">
              Contact your admin
            </a>{' '}
            for portal access.
          </p>
        </div>
      </div>
    </div>
  );
}
