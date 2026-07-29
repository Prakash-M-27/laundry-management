'use client'

import React, { useState } from 'react'
import { CUSTOMERS } from '@/lib/mock-data'
import { useOrders } from '@/lib/order-context'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Search, Users } from 'lucide-react'

export default function CustomersPage() {
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const { orders } = useOrders()

  const customersWithStats = CUSTOMERS.map(customer => {
    const customerOrders = orders.filter(o => o.customerId === customer.id)
    const lastOrder = [...customerOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]
    return {
      ...customer,
      orderCount: customerOrders.length,
      lastOrderDate: lastOrder?.createdAt,
      totalSpent: customerOrders.reduce((sum, o) => sum + (o.actualPrice || o.estimatedPrice), 0),
    }
  })

  const filtered = customersWithStats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Customers</h1>
            <p className="text-sm text-muted-foreground mt-0.5">{CUSTOMERS.length} registered customers</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-border shadow-sm">
            <Users className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No customers found</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    {['Customer', 'Phone', 'Orders', 'Total Spent', 'Last Order'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map(customer => (
                    <React.Fragment key={customer.id}>
                      <tr
                        className="hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                              {customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{customer.name}</p>
                              <p className="text-xs text-muted-foreground">{customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-foreground text-sm">{customer.phone}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/5 text-xs font-bold text-primary">
                            {customer.orderCount}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold text-foreground">₹{customer.totalSpent}</td>
                        <td className="px-5 py-4 text-muted-foreground text-xs">
                          {customer.lastOrderDate
                            ? new Date(customer.lastOrderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            : '—'}
                        </td>
                      </tr>
                      {expandedCustomer === customer.id && (
                        <tr className="bg-muted">
                          <td colSpan={5} className="px-5 py-4">
                            <div className="text-sm">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Member since {new Date(customer.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {filtered.map(customer => (
                <Card
                  key={customer.id}
                  className="bg-white border-border shadow-sm cursor-pointer"
                  onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/5 flex items-center justify-center text-sm font-bold text-primary">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      {expandedCustomer === customer.id
                        ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Orders</p>
                        <p className="font-semibold text-foreground">{customer.orderCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Spent</p>
                        <p className="font-semibold text-foreground">₹{customer.totalSpent}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-semibold text-foreground text-xs">{customer.phone.slice(-10)}</p>
                      </div>
                    </div>

                    {expandedCustomer === customer.id && (
                      <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                        <p>Member since {new Date(customer.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                        {customer.lastOrderDate && (
                          <p className="mt-1">Last order: {new Date(customer.lastOrderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
