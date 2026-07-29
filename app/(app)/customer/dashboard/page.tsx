'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SlotBooking } from '@/components/slot-booking'
import { CustomerDashboardNew } from '@/components/customer-dashboard-new'
import { Calendar, ClipboardList, User, Droplets, ArrowRight } from 'lucide-react'

const STEPS = [
  { step: '01', title: 'Book a Slot', desc: 'Pick your preferred date and time', icon: <Calendar className="h-5 w-5" /> },
  { step: '02', title: 'We Weigh & Update', desc: 'Final price confirmed after weighing', icon: <ClipboardList className="h-5 w-5" /> },
  { step: '03', title: 'Ready for Pickup', desc: 'Collect or get it delivered', icon: <Droplets className="h-5 w-5" /> },
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('orders')

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto py-5">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">My Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-px">Manage your laundry orders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-7 bg-muted p-1 rounded-xl h-auto border border-border gap-0">
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 rounded-lg text-sm font-medium h-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary data-[state=active]:!bg-white text-muted-foreground transition-all [&[data-state=active]_svg]:text-primary"
            >
              <ClipboardList className="h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger
              value="booking"
              className="flex items-center gap-2 rounded-lg text-sm font-medium h-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary data-[state=active]:!bg-white text-muted-foreground transition-all [&[data-state=active]_svg]:text-primary"
            >
              <Calendar className="h-4 w-4" />
              Book a Slot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4 mt-0">
            <CustomerDashboardNew customerId="cust_1" />
          </TabsContent>

          <TabsContent value="booking" className="mt-0">
            <Card className="p-6 border-border bg-white shadow-sm">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-foreground tracking-tight mb-1">Book a Laundry Slot</h2>
                <p className="text-sm text-muted-foreground">
                  Choose a date and time. We&apos;ll pick up your clothes and confirm the final price after weighing.
                </p>
              </div>
              <SlotBooking onBookingComplete={() => setActiveTab('orders')} />
            </Card>

            <div className="mt-8 relative">
              <div className="hidden sm:block absolute top-7 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />
              <div className="grid sm:grid-cols-3 gap-5">
                {STEPS.map((item, idx) => (
                  <div key={item.step} className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col items-center text-center relative">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-3 relative z-10">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
