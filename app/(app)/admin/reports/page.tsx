'use client'

import React from 'react'
import { REVENUE_DATA } from '@/lib/mock-data'
import { useOrders } from '@/lib/order-context'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts'

const chartConfig = {
  revenue: { label: 'Revenue', color: '#2563EB' },
  orders: { label: 'Orders', color: '#8B5CF6' },
}

export default function ReportsPage() {
  const { orders } = useOrders()
  const totalRevenue = REVENUE_DATA.reduce((sum, d) => sum + d.revenue, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0'
  const completedOrders = orders.filter((o) => o.status === 'completed').length

  const serviceBreakdown = [
    { name: 'Wash & Fold', count: 28, revenue: 1400 },
    { name: 'Dry Clean', count: 15, revenue: 2250 },
    { name: 'Ironing', count: 42, revenue: 840 },
    { name: 'Shoe Clean', count: 10, revenue: 1000 },
  ]

  const paymentMethodBreakdown = [
    { name: 'Online', count: 18, amount: 4500 },
    { name: 'On Delivery', count: 7, amount: 1750 },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">Business insights and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Total Revenue</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-foreground">₹{totalRevenue}</p>
                <span className="text-xs text-emerald-600 font-semibold">+12.5%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-foreground">{totalOrders}</p>
                <span className="text-xs text-emerald-600 font-semibold">+8.2%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Avg Order Value</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-foreground">₹{avgOrderValue}</p>
                <span className="text-xs text-emerald-600 font-semibold">+5.1%</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Completed Orders</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-foreground">{completedOrders}</p>
                <span className="text-xs text-emerald-600 font-semibold">+3.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Daily revenue over the last 12 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <LineChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="date" className="text-xs" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} dot={{ fill: '#2563EB', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
              <CardDescription>Daily orders over the last 12 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full">
                <BarChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="date" className="text-xs" tick={{ fill: '#6B7280' }} />
                  <YAxis tick={{ fill: '#6B7280' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="orders" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Orders and revenue by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBreakdown.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.count} orders</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">₹{service.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Breakdown by payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethodBreakdown.map((payment) => (
                  <div key={payment.name} className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{payment.name}</p>
                      <p className="text-sm text-muted-foreground">{payment.count} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">₹{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">{((payment.amount / (totalRevenue || 1)) * 100).toFixed(0)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Daily Revenue</p>
                <p className="text-3xl font-bold text-foreground">₹{(totalRevenue / (REVENUE_DATA.length || 1)).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peak Daily Orders</p>
                <p className="text-3xl font-bold text-foreground">{Math.max(...REVENUE_DATA.map((d) => d.orders))}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
                <p className="text-3xl font-bold text-foreground">{((completedOrders / (totalOrders || 1)) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
