'use client'

import React, { useState } from 'react'
import { ORDERS, OrderStatus, ORDER_STATUS_COLORS } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'

type FilterStatus = OrderStatus | 'all'

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  const filteredOrders =
    filterStatus === 'all'
      ? ORDERS
      : ORDERS.filter((o) => o.status === filterStatus)

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground mb-1">All Orders</h1>
          <p className="text-sm text-muted-foreground">Manage and update customer orders</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['all', 'booked', 'received', 'processing', 'ready', 'completed'] as const).map((status) => {
            const count = status === 'all' ? ORDERS.length : ORDERS.filter((o) => o.status === status).length
            const isActive = filterStatus === status
            return (
              <Button
                key={status}
                variant={isActive ? 'default' : 'outline'}
                onClick={() => setFilterStatus(status)}
                size="sm"
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </Button>
            )
          })}
        </div>

        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <Card className="bg-card border-border text-center py-12">
              <CardContent>
                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No orders match this filter</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="bg-card border-border">
                <div className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-mono font-semibold text-foreground text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.customerName} · {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                      <span className="font-semibold text-foreground text-sm">₹{order.actualPrice || order.estimatedPrice}</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">{new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{order.bookingTime}</p>
                    </div>
                    {order.weight && (
                      <div>
                        <p className="text-muted-foreground">Weight</p>
                        <p className="font-medium text-foreground">{order.weight} kg</p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">{order.customerPhone}</p>
                    </div>
                  </div>

                  {order.employeeNotes && (
                    <div className="mt-3 px-3 py-2 bg-muted rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">Notes</p>
                      <p className="text-xs text-foreground">{order.employeeNotes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
