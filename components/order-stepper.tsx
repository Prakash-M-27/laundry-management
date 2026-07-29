'use client'

import React from 'react'
import { Order } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import {
  ShoppingBag,
  CheckCircle2,
  Truck,
  Cog,
  Package,
  Navigation,
  Check,
} from 'lucide-react'

type StepStatus = 'Placed' | 'Confirmed' | 'Picked Up' | 'In Process' | 'Ready' | 'Out for Delivery' | 'Delivered'

const STATUS_ICONS: Record<StepStatus, React.ReactNode> = {
  Placed: <ShoppingBag className="h-6 w-6" />,
  Confirmed: <CheckCircle2 className="h-6 w-6" />,
  'Picked Up': <Truck className="h-6 w-6" />,
  'In Process': <Cog className="h-6 w-6" />,
  Ready: <Package className="h-6 w-6" />,
  'Out for Delivery': <Navigation className="h-6 w-6" />,
  Delivered: <Check className="h-6 w-6" />,
}

const STATUS_COLORS: Record<StepStatus, string> = {
  Placed: 'bg-muted text-muted-foreground ring-border',
  Confirmed: 'bg-blue-100 text-blue-600 ring-blue-200',
  'Picked Up': 'bg-indigo-100 text-indigo-600 ring-indigo-200',
  'In Process': 'bg-yellow-100 text-yellow-600 ring-yellow-200',
  Ready: 'bg-emerald-100 text-emerald-600 ring-emerald-200',
  'Out for Delivery': 'bg-purple-100 text-purple-600 ring-purple-200',
  Delivered: 'bg-green-100 text-green-600 ring-green-200',
}

const STATUS_MAP: Record<string, StepStatus> = {
  booked: 'Placed',
  received: 'Confirmed',
  processing: 'In Process',
  ready: 'Ready',
  completed: 'Delivered',
}

export function OrderStepper({ order }: { order: Order }) {
  const allStatuses: StepStatus[] = [
    'Placed',
    'Confirmed',
    'Picked Up',
    'In Process',
    'Ready',
    'Out for Delivery',
    'Delivered',
  ]

  const mappedStatus = STATUS_MAP[order.status] || 'Placed'
  const currentStatusIndex = allStatuses.indexOf(mappedStatus)

  return (
    <Card className="bg-white border-border shadow-sm">
      <CardContent className="pt-6">
        <div className="hidden md:block">
          <div className="flex justify-between items-center relative">
            {allStatuses.map((status, index) => {
              const isCompleted = index <= currentStatusIndex
              const isCurrent = status === mappedStatus

              return (
                <div key={status} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ring-2 transition-all ${
                        isCompleted
                          ? STATUS_COLORS[status]
                          : 'bg-muted text-muted-foreground ring-border'
                      }`}
                    >
                      {STATUS_ICONS[status]}
                    </div>

                    <p
                      className={`mt-2 text-xs font-semibold text-center ${
                        isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {status}
                    </p>

                    {isCurrent && (
                      <p className="text-xs text-muted-foreground mt-1">Now</p>
                    )}
                  </div>

                  {index < allStatuses.length - 1 && (
                    <div
                      className={`absolute top-6 left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5 ${
                        index < currentStatusIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {allStatuses.map((status, index) => {
            const isCompleted = index <= currentStatusIndex
            const isCurrent = status === mappedStatus

            return (
              <div key={status} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ring-2 transition-all flex-shrink-0 ${
                      isCompleted
                        ? STATUS_COLORS[status]
                        : 'bg-muted text-muted-foreground ring-border'
                    }`}
                  >
                    {STATUS_ICONS[status]}
                  </div>

                  {index < allStatuses.length - 1 && (
                    <div
                      className={`w-0.5 flex-1 mt-2 rounded-full ${
                        index < currentStatusIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                      style={{ minHeight: '60px' }}
                    />
                  )}
                </div>

                <div className="flex-1 pt-1">
                  <p
                    className={`font-semibold ${
                      isCurrent ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {status}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-primary font-semibold mt-0.5">In progress...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
