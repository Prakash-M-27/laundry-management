'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useOrders } from '@/lib/order-context'
import { CheckCircle, Clock, Zap, Package, Search, Inbox, ArrowUpRight, Hash } from 'lucide-react'

interface CustomerDashboardNewProps {
  customerId: string
}

const STATUS_STEPS = ['booked', 'received', 'processing', 'ready', 'completed'] as const

const BADGE_COLORS: Record<string, string> = {
  booked: 'bg-gray-100 text-gray-700 border border-gray-200',
  received: 'bg-blue-50 text-blue-700 border border-blue-200',
  processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  ready: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

function OrderProgressBar({ status }: { status: string }) {
  const currentIndex = STATUS_STEPS.indexOf(status as typeof STATUS_STEPS[number])
  return (
    <div className="flex items-center gap-[3px] mt-3">
      {STATUS_STEPS.map((step, i) => (
        <div key={step} className="flex-1">
          <div
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              i <= currentIndex
                ? 'bg-gradient-to-r from-primary to-blue-500'
                : 'bg-muted'
            }`}
          />
        </div>
      ))}
    </div>
  )
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  booked: <Clock className="w-4 h-4" />,
  received: <Package className="w-4 h-4" />,
  processing: <Zap className="w-4 h-4" />,
  ready: <CheckCircle className="w-4 h-4" />,
  completed: <CheckCircle className="w-4 h-4" />,
}

const STAT_CARDS = [
  { key: 'all', label: 'Total', icon: <Hash className="w-4 h-4" />, actionable: false },
  { key: 'processing', label: 'In Progress', icon: <Zap className="w-4 h-4" />, actionable: true },
  { key: 'ready', label: 'Ready', icon: <CheckCircle className="w-4 h-4" />, actionable: true },
  { key: 'completed', label: 'Done', icon: <Package className="w-4 h-4" />, actionable: false },
] as const

export function CustomerDashboardNew({ customerId }: CustomerDashboardNewProps) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const { orders } = useOrders()

  const customerOrders = orders.filter(order => order.customerId === customerId)

  const statusCounts = {
    all: customerOrders.length,
    booked: customerOrders.filter(o => o.status === 'booked').length,
    processing: customerOrders.filter(o => ['received', 'processing'].includes(o.status)).length,
    ready: customerOrders.filter(o => o.status === 'ready').length,
    completed: customerOrders.filter(o => o.status === 'completed').length,
  }

  const filteredOrders = customerOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.bookingDate.includes(search)
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus ||
      (filterStatus === 'processing' && ['received', 'processing'].includes(order.status))
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {STAT_CARDS.map(item => {
          const isSelected = filterStatus === item.key
          const showAccent = item.actionable && statusCounts[item.key] > 0
          return (
            <button
              key={item.key}
              onClick={() => setFilterStatus(item.key)}
              className={`group p-3 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border bg-white hover:border-muted-foreground/30 shadow-sm'
              }`}
            >
              <div className={`mx-auto w-7 h-7 rounded-lg flex items-center justify-center mb-2 transition-all ${
                isSelected
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
              }`}>
                {item.icon}
              </div>
              <p className={`text-xl font-bold tracking-tight transition-colors ${
                isSelected || showAccent ? 'text-primary' : 'text-foreground'
              }`}>
                {statusCounts[item.key]}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.label}
              </p>
            </button>
          )
        })}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search by order ID or date…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
        >
          <option value="all">All Status</option>
          <option value="booked">Booked</option>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-border shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
              <Inbox className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              {customerOrders.length === 0 ? 'No orders yet' : 'No matches found'}
            </p>
            <p className="text-xs text-muted-foreground">
              {customerOrders.length === 0 ? 'Book a slot to get started!' : 'Try adjusting your search or filter.'}
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <Card key={order.id} className="p-4 bg-white border-border shadow-sm hover:shadow-md hover:border-muted-foreground/20 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {STATUS_ICON[order.status]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-sm truncate">{order.id}</p>
                      {order.status === 'ready' && (
                        <ArrowUpRight className="h-3.5 w-3.5 text-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-px">
                      {new Date(order.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{order.bookingTime.split(' - ')[0]}
                    </p>
                  </div>
                </div>
                <Badge className={`capitalize text-xs font-medium shrink-0 ${BADGE_COLORS[order.status]}`}>
                  {order.status}
                </Badge>
              </div>

              <OrderProgressBar status={order.status} />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3.5 border-t border-border text-sm">
                {order.weight && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Weight</p>
                    <p className="font-semibold text-foreground">{order.weight} kg</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Est. Price</p>
                  <p className="font-semibold text-foreground">₹{order.estimatedPrice}</p>
                </div>
                {order.actualPrice && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Final Price</p>
                    <p className="font-bold text-foreground">₹{order.actualPrice}</p>
                  </div>
                )}
              </div>

              {order.employeeNotes && (
                <div className="mt-3.5 px-3.5 py-2.5 bg-muted rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Note from team</p>
                  <p className="text-xs text-foreground leading-relaxed">{order.employeeNotes}</p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
