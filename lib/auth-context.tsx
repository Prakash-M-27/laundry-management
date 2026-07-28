'use client'

import React, { createContext, useContext, useState } from 'react'
import { UserRole } from './mock-data'

interface AuthContextType {
  role: UserRole
  isLoggedIn: boolean
  setRole: (role: UserRole) => void
  setIsLoggedIn: (logged: boolean) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('customer')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logout = () => {
    setIsLoggedIn(false)
    setRole('customer')
  }

  return (
    <AuthContext.Provider value={{ role, isLoggedIn, setRole, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
