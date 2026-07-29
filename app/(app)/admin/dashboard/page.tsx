'use client'

import { CUSTOMERS, ORDER_STATUS_COLORS } from '@/lib/mock-data'
import { useOrders } from '@/lib/order-context'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ShoppingBag, Users, DollarSign, CheckCircle, TrendingUp, ArrowRight, Clock } from 'lucide-react'

export default function AdminDashboard() {
  const { orders } = useOrders()
  const bookedOrders = orders.filter(o => o.status === 'booked').length
  const inProgressOrders = orders.filter(o => ['received', 'processing'].includes(o.status)).length
  const completedOrders = orders.filter(o => o.status === 'completed').length
  const totalRevenue = orders.filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.actualPrice || o.estimatedPrice), 0)

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  const stats = [
    { label: 'Pending Bookings', value: bookedOrders, icon: <Clock className="h-5 w-5" />, href: '/admin/orders-manager' },
    { label: 'In Progress', value: inProgressOrders, icon: <ShoppingBag className="h-5 w-5" />, href: '/admin/orders-manager' },
    { label: 'Completed', value: completedOrders, icon: <CheckCircle className="h-5 w-5" />, href: '/admin/orders' },
    { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: <DollarSign className="h-5 w-5" />, href: '/admin/reports' },
  ]

  const quickActions = [
    { label: 'Manage Orders', desc: 'Update weights & prices', href: '/admin/orders-manager', icon: <ShoppingBag className="h-5 w-5" /> },
    { label: 'View Customers', desc: `${CUSTOMERS.length} registered`, href: '/admin/customers', icon: <Users className="h-5 w-5" /> },
    { label: 'Reports', desc: 'Revenue & analytics', href: '/admin/reports', icon: <TrendingUp className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Overview of your laundry shop</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-4 bg-white border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="h-9 w-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                </div>
                <p className="text-2xl font-bold text-foreground mt-3">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {quickActions.map(action => (
              <Link key={action.label} href={action.href}>
                <Card className="p-4 bg-white border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                    {action.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-medium text-primary hover:text-primary/80 transition flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <Card className="bg-white border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-foreground">{order.id}</td>
                      <td className="py-3 px-4 text-foreground font-medium">{order.customerName}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs hidden sm:table-cell">
                        {new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`capitalize text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-foreground">
                        ₹{order.actualPrice || order.estimatedPrice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
