'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import {
  LogOut,
  Menu,
  Home,
  ShoppingBag,
  BarChart3,
  Users,
  Package,
  X,
  Droplets,
  ChevronRight,
  ClipboardList,
  History,
  User,
  Plus,
} from 'lucide-react'
import Link from 'next/link'

export function AppNavigation() {
  const { role, isLoggedIn, setRole, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoggedIn) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleRoleSwitch = () => {
    const newRole = role === 'customer' ? 'shop_owner' : 'customer'
    setRole(newRole as any)
    router.push('/')
  }

  if (role === 'customer') {
    const customerLinks = [
      { href: '/customer/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
      { href: '/customer/order', icon: <Plus className="h-4 w-4" />, label: 'New Order' },
      { href: '/customer/orders', icon: <ClipboardList className="h-4 w-4" />, label: 'Orders' },
      { href: '/customer/history', icon: <History className="h-4 w-4" />, label: 'History' },
      { href: '/customer/profile', icon: <User className="h-4 w-4" />, label: 'Profile' },
    ]

    return (
      <nav className="sticky top-0 z-40 w-full border-b border-border bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition mr-1"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="p-1.5 rounded-lg bg-[#0A0D10]">
              <Droplets className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">QuickWash</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {customerLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRoleSwitch}
              className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition font-medium"
            >
              Admin
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted transition font-medium"
              title="Logout"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        {sidebarOpen && (
          <>
            <div className="md:hidden border-t border-border px-4 py-2 space-y-1 bg-card">
              {customerLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <span className={isActive ? 'text-primary' : 'text-muted-foreground'}>{link.icon}</span>
                    {link.label}
                  </Link>
                )
              })}
            </div>
            <div className="fixed inset-0 bg-black/20 z-[-1] md:hidden" onClick={() => setSidebarOpen(false)} />
          </>
        )}
      </nav>
    )
  }

  const adminLinks = [
    { href: '/admin/dashboard', icon: <Home className="h-4 w-4" />, label: 'Dashboard' },
    { href: '/admin/orders-manager', icon: <ShoppingBag className="h-4 w-4" />, label: 'Manage Orders' },
    { href: '/admin/orders', icon: <Package className="h-4 w-4" />, label: 'All Orders' },
    { href: '/admin/customers', icon: <Users className="h-4 w-4" />, label: 'Customers' },
    { href: '/admin/reports', icon: <BarChart3 className="h-4 w-4" />, label: 'Reports' },
  ]

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 rounded-lg hover:bg-muted transition mr-1"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="p-1.5 rounded-lg bg-[#0A0D10]">
              <Droplets className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-foreground tracking-tight">QuickWash</span>
              <span className="ml-2 text-xs font-medium text-muted-foreground hidden sm:inline">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRoleSwitch}
              className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition font-medium"
            >
              Customer View
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted transition font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-57px)] overflow-hidden">
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative w-56 bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-in-out z-30 h-full flex flex-col`}
        >
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {adminLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <span className={isActive ? 'text-primary' : 'text-sidebar-foreground/50'}>{link.icon}</span>
                  {link.label}
                  {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-primary" />}
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-2.5 px-3 py-2">
              <div className="h-7 w-7 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-accent-foreground">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">Admin</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">shop@laundry.com</p>
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 md:hidden bg-black/40 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </>
  )
}
