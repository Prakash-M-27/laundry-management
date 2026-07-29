'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { OrderForm } from '@/components/order-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function OrderPage() {
  const [orderCompleted, setOrderCompleted] = useState(false)

  if (orderCompleted) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-8 flex items-center justify-center min-h-screen">
          <Card className="w-full max-w-md bg-white border-border shadow-lg">
            <CardContent className="pt-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/5">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. You can track it in real-time.
              </p>

              <div className="bg-muted rounded-lg p-4 mb-6 text-left border border-border">
                <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-semibold text-foreground">ORD_00{Math.floor(Math.random() * 1000)}</p>
              </div>

              <div className="space-y-3">
                <Link href="/customer/orders" className="block">
                  <Button className="w-full">
                    Track Order
                  </Button>
                </Link>

                <Link href="/customer/dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/customer/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Place New Order</h1>
          <p className="text-muted-foreground">Complete the steps below to place your order</p>
        </div>

        <OrderForm onComplete={() => setOrderCompleted(true)} />
      </div>
    </div>
  )
}
