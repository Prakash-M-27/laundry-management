'use client'

import { EmployeeDashboard } from '@/components/employee-dashboard'

export default function OrdersManagerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-foreground">Order Management</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Update weights, prices, and order status</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmployeeDashboard employeeId="emp_1" />
      </div>
    </div>
  )
}
