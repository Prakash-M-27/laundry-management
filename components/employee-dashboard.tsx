'use client'

import { useState } from 'react'
import { ORDERS, ORDER_STATUS_COLORS, OrderStatus } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Save, CheckCircle, Clock, Package, Zap } from 'lucide-react'

interface EmployeeDashboardProps {
  employeeId?: string
}

interface OrderUpdate {
  weight: number | string
  actualPrice: number | string
  notes: string
  status: OrderStatus
}

const STATUS_OPTIONS: OrderStatus[] = ['booked', 'received', 'processing', 'ready', 'completed']

const STATUS_ICON: Record<string, React.ReactNode> = {
  booked: <Clock className="h-4 w-4" />,
  received: <Package className="h-4 w-4" />,
  processing: <Zap className="h-4 w-4" />,
  ready: <CheckCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
}

export function EmployeeDashboard({ employeeId }: EmployeeDashboardProps) {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({})
  const [orderUpdates, setOrderUpdates] = useState<Record<string, OrderUpdate>>({})
  const [savedOrders, setSavedOrders] = useState<Set<string>>(new Set())

  const activeOrders = ORDERS.filter(order => ['booked', 'received', 'processing'].includes(order.status))

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }))
  }

  const getUpdate = (order: typeof ORDERS[0]): OrderUpdate => {
    return orderUpdates[order.id] || {
      weight: order.weight || '',
      actualPrice: order.actualPrice || order.estimatedPrice,
      notes: order.employeeNotes || '',
      status: order.status,
    }
  }

  const handleField = (orderId: string, field: keyof OrderUpdate, value: any) => {
    setOrderUpdates(prev => ({
      ...prev,
      [orderId]: { ...getUpdate(ORDERS.find(o => o.id === orderId)!), [field]: value },
    }))
    setSavedOrders(prev => { const s = new Set(prev); s.delete(orderId); return s })
  }

  const handleSave = (orderId: string) => {
    setSavedOrders(prev => new Set(prev).add(orderId))
  }

  const summaryStats = [
    { label: 'Pending', count: activeOrders.filter(o => o.status === 'booked').length, icon: <Clock className="h-4 w-4" /> },
    { label: 'Received', count: activeOrders.filter(o => o.status === 'received').length, icon: <Package className="h-4 w-4" /> },
    { label: 'Processing', count: activeOrders.filter(o => o.status === 'processing').length, icon: <Zap className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {summaryStats.map(stat => (
          <Card key={stat.label} className="p-4 bg-card border-border">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground">{stat.icon}</span>
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.count}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {activeOrders.length === 0 ? (
          <Card className="p-10 text-center bg-card border-border">
            <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All caught up — no active orders</p>
          </Card>
        ) : (
          activeOrders.map(order => {
            const isExpanded = expandedOrders[order.id]
            const updates = getUpdate(order)
            const isSaved = savedOrders.has(order.id)

            return (
              <Card key={order.id} className="bg-card border-border overflow-hidden">
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full px-4 py-4 hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        {STATUS_ICON[order.status]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{order.id}</span>
                          <Badge className={`capitalize text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{order.customerName} · {order.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">₹{order.estimatedPrice}</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border p-4 bg-muted space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      {[
                        { label: 'Booking Date', value: new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
                        { label: 'Time Slot', value: order.bookingTime },
                        { label: 'Est. Price', value: `₹${order.estimatedPrice}` },
                        { label: 'Phone', value: order.customerPhone },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                          <p className="font-medium text-foreground text-xs">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                      <h5 className="text-sm font-semibold text-foreground">Update Order</h5>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Weight (kg)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={updates.weight}
                            onChange={e => handleField(order.id, 'weight', e.target.value)}
                            placeholder="e.g. 4.5"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Final Price (₹)</label>
                          <input
                            type="number"
                            value={updates.actualPrice}
                            onChange={e => handleField(order.id, 'actualPrice', e.target.value)}
                            placeholder="e.g. 300"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status</label>
                        <select
                          value={updates.status}
                          onChange={e => handleField(order.id, 'status', e.target.value as OrderStatus)}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Notes</label>
                        <textarea
                          value={updates.notes}
                          onChange={e => handleField(order.id, 'notes', e.target.value)}
                          placeholder="Add notes about this order…"
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
                        />
                      </div>

                      <Button
                        onClick={() => handleSave(order.id)}
                        className={`w-full font-semibold flex items-center justify-center gap-2 rounded-xl transition-colors ${
                          isSaved
                            ? 'bg-muted text-muted-foreground hover:bg-muted cursor-default'
                            : ''
                        }`}
                        variant={isSaved ? 'secondary' : 'default'}
                      >
                        {isSaved ? (
                          <><CheckCircle className="h-4 w-4" /> Saved</>
                        ) : (
                          <><Save className="h-4 w-4" /> Save Changes</>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
