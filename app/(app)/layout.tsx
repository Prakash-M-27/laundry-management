'use client'

import { AuthProvider, useAuth } from '@/lib/auth-context'
import React from 'react'
import { AppNavigation } from '@/components/app-navigation'

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <AppNavigation />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  )
}
