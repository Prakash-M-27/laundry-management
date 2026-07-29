'use client'

import React from 'react'
import { ORDER_STATUS_COLORS } from '@/lib/mock-data'
import { useOrders } from '@/lib/order-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Inbox } from 'lucide-react'

export default function HistoryPage() {
  const { orders } = useOrders()
  const allOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground">View all your past orders</p>
        </div>

        {allOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-border shadow-sm">
            <Inbox className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block border border-border rounded-lg overflow-hidden bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{order.actualPrice || order.estimatedPrice}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${ORDER_STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button variant="ghost" size="sm" className="flex items-center gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Reorder
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {allOrders.map((order) => (
                <Card key={order.id} className="bg-white border-border shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-base font-mono">{order.id}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground">Amount</span>
                      <span className="text-sm font-semibold text-foreground">₹{order.actualPrice || order.estimatedPrice}</span>
                    </div>
                    <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Reorder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
