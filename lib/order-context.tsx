'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Order, OrderStatus, ORDERS as MOCK_ORDERS } from './mock-data'

const STORAGE_KEY = 'quickwash_orders'

function loadInitialOrders(): Order[] {
  if (typeof window === 'undefined') return MOCK_ORDERS
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as Order[]
      return parsed
    }
  } catch {}
  return MOCK_ORDERS
}

function saveOrders(orders: Order[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  } catch {}
}

function computeNextId(orders: Order[]): number {
  let max = 0
  for (const o of orders) {
    const num = parseInt(o.id.replace('ORD_', ''), 10)
    if (num > max) max = num
  }
  return max + 1
}

let nextId = computeNextId(loadInitialOrders())

function generateOrderId(): string {
  const id = nextId++
  return `ORD_${String(id).padStart(3, '0')}`
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: OrderStatus }) => Order
  updateOrder: (id: string, updates: Partial<Order>) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(loadInitialOrders)

  useEffect(() => {
    saveOrders(orders)
  }, [orders])

  const addOrder = useCallback((data: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: OrderStatus }) => {
    const newOrder: Order = {
      ...data,
      id: generateOrderId(),
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: data.status || 'booked',
    }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }, [])

  const updateOrder = useCallback((id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
  }, [])

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider')
  }
  return context
}
