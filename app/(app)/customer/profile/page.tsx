'use client'

import React, { useState } from 'react'
import { CUSTOMERS } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Plus, MapPin, CreditCard, Home, Briefcase, User, Package } from 'lucide-react'

export default function ProfilePage() {
  const customer = CUSTOMERS[0]
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState(customer.name)

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Personal Information</span>
              {!editingName && (
                <Button variant="ghost" size="sm" onClick={() => setEditingName(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingName ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setEditingName(false)}>Save</Button>
                  <Button variant="outline" onClick={() => { setEditingName(false); setName(customer.name) }}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-semibold text-foreground">{name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-semibold text-foreground">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold text-foreground">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="font-semibold text-foreground">
                    {new Date(customer.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Saved Addresses
              </span>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.addresses.map((address) => (
              <div key={address.id} className="p-4 rounded-lg border border-border bg-white shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {address.type === 'home' ? (
                      <Home className="h-5 w-5 text-foreground" />
                    ) : (
                      <Briefcase className="h-5 w-5 text-foreground" />
                    )}
                    <p className="font-semibold text-foreground capitalize">
                      {address.type}
                      {address.default && (
                        <span className="text-xs bg-primary text-primary-foreground ml-2 px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-foreground">{address.address}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </span>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {customer.paymentMethods.map((method) => (
              <div key={method.id} className="p-4 rounded-lg border border-border bg-white shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {method.type} ••••{method.last4}
                  </p>
                  {method.default && (
                    <p className="text-xs text-muted-foreground mt-1">Default Payment Method</p>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <p className="text-3xl font-bold text-foreground">{customer.totalOrders}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
              <p className="text-3xl font-bold text-foreground">₹{customer.totalSpent}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
