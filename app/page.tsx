'use client'

import { AuthProvider, useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { ShoppingBag, Briefcase, LogIn, Droplets, Eye, EyeOff, Check } from 'lucide-react'

function LoginContent() {
  const { setRole, setIsLoggedIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'customer' | 'shop_owner' | 'employee'>('customer')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoading(true)
      await new Promise(r => setTimeout(r, 600))
      setRole(selectedRole as any)
      setIsLoggedIn(true)
      router.push(selectedRole === 'customer' ? '/customer/dashboard' : '/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-5/12 bg-[#0A0D10] text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
              <Droplets className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">QuickWash</h1>
              <p className="text-[#8A8F98] text-xs">Professional Laundry</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold leading-snug text-white mb-3">
            Laundry management,<br />simplified.
          </h2>
          <p className="text-[#8A8F98] text-sm leading-relaxed">
            Book slots, track orders, and manage your laundry business — all in one place.
          </p>
        </div>

        <div className="space-y-5">
          {[
            { title: 'Easy Slot Booking', desc: 'Pick a date and time that works for you' },
            { title: 'Real-time Tracking', desc: 'Know exactly where your order stands' },
            { title: 'Business Analytics', desc: 'Insights to grow your laundry business' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-white/60 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="text-xs text-[#8A8F98]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 relative">
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#0A0D10] mb-4">
              <Droplets className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">QuickWash</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-bold text-foreground">Sign in</h2>
            <p className="text-muted-foreground text-sm mt-1">Welcome back — select your role to continue</p>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">I am a</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRole === 'customer'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                }`}
              >
                <ShoppingBag className={`h-5 w-5 mb-2 ${selectedRole === 'customer' ? 'text-background' : 'text-muted-foreground'}`} />
                <p className="font-semibold text-sm">Customer</p>
                <p className={`text-xs mt-0.5 ${selectedRole === 'customer' ? 'text-background/70' : 'text-muted-foreground'}`}>Book & track orders</p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('shop_owner')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRole === 'shop_owner'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                }`}
              >
                <Briefcase className={`h-5 w-5 mb-2 ${selectedRole === 'shop_owner' ? 'text-background' : 'text-muted-foreground'}`} />
                <p className="font-semibold text-sm">Manager</p>
                <p className={`text-xs mt-0.5 ${selectedRole === 'shop_owner' ? 'text-background/70' : 'text-muted-foreground'}`}>Manage shop & orders</p>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@laundry.com"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter any password"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-2"
            >
              {isLoading ? (
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-muted border border-border">
            <p className="text-xs font-semibold text-foreground mb-1.5">Demo credentials</p>
            <div className="space-y-0.5 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Email:</span> demo@laundry.com</p>
              <p><span className="font-medium text-foreground">Password:</span> any value works</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  )
}
