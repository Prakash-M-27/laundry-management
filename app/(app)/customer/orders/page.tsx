'use client'

import React, { useState } from 'react'
import { ORDERS, ORDER_STATUS_COLORS } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderStepper } from '@/components/order-stepper'
import { ChevronDown, ChevronUp, Package } from 'lucide-react'

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(ORDERS[0]?.id || null)

  const activeOrders = ORDERS.filter((o) => o.status !== 'completed')

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Track Orders</h1>
          <p className="text-muted-foreground">Monitor your active laundry orders in real-time</p>
        </div>

        {activeOrders.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <Card
                key={order.id}
                className="bg-card border-border cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order.id ? null : order.id
                  )
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-bold text-foreground">{order.id}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ORDER_STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">₹{order.estimatedPrice}</p>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-5 w-5 ml-auto mt-2 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 ml-auto mt-2 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {expandedOrder === order.id && (
                  <>
                    <CardContent className="space-y-6 border-t border-border pt-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Order Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Booking Date</p>
                            <p className="font-semibold text-foreground">
                              {new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time Slot</p>
                            <p className="font-semibold text-foreground">{order.bookingTime}</p>
                          </div>
                          {order.weight && (
                            <div>
                              <p className="text-muted-foreground">Weight</p>
                              <p className="font-semibold text-foreground">{order.weight} kg</p>
                            </div>
                          )}
                          <div>
                            <p className="text-muted-foreground">Est. Price</p>
                            <p className="font-semibold text-foreground">₹{order.estimatedPrice}</p>
                          </div>
                          {order.actualPrice && (
                            <div>
                              <p className="text-muted-foreground">Final Price</p>
                              <p className="font-semibold text-foreground">₹{order.actualPrice}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {order.employeeNotes && (
                        <div>
                          <p className="text-muted-foreground text-sm">Note from team</p>
                          <p className="font-semibold text-foreground text-sm mt-1">{order.employeeNotes}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-foreground mb-4">Status Timeline</h3>
                        <OrderStepper order={order} />
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border text-center py-12">
            <CardContent>
              <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">No active orders</p>
              <p className="text-sm text-muted-foreground">
                You can place your first order from the dashboard
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
