'use client'

import React, { useState } from 'react'
import { SERVICES, ServiceCategory } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface FormData {
  name: string
  category: ServiceCategory
  pricePerUnit: string
  unit: string
  description: string
}

export default function ServicesPage() {
  const [services, setServices] = useState(SERVICES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Wash & Fold',
    pricePerUnit: '',
    unit: '',
    description: '',
  })

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: '', category: 'Wash & Fold', pricePerUnit: '', unit: '', description: '' })
    setShowForm(true)
  }

  const handleEdit = (service: typeof SERVICES[0]) => {
    setEditingId(service.id)
    setFormData({
      name: service.name,
      category: service.category,
      pricePerUnit: service.pricePerUnit.toString(),
      unit: service.unit,
      description: service.description,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setServices(
        services.map((s) =>
          s.id === editingId
            ? { ...s, name: formData.name, category: formData.category, pricePerUnit: parseFloat(formData.pricePerUnit), unit: formData.unit, description: formData.description }
            : s
        )
      )
    } else {
      const newService = {
        id: `svc_${services.length + 1}`,
        name: formData.name,
        category: formData.category,
        pricePerUnit: parseFloat(formData.pricePerUnit),
        unit: formData.unit,
        description: formData.description,
      }
      setServices([...services, newService])
    }
    setShowForm(false)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Services & Pricing</h1>
            <p className="text-sm text-muted-foreground">Manage your laundry services and prices</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        {showForm && (
          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Service' : 'Add New Service'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Service Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option>Wash & Fold</option>
                      <option>Dry Clean</option>
                      <option>Ironing</option>
                      <option>Shoe Cleaning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Unit</label>
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      placeholder="e.g., kg, piece, pair"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price per Unit (₹)</label>
                  <input
                    type="number"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">{editingId ? 'Update' : 'Add'} Service</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="flex-1">Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="hidden md:block border border-border rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </td>
                  <td className="px-6 py-4 text-foreground">{service.category}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">₹{service.pricePerUnit}</td>
                  <td className="px-6 py-4 text-foreground">{service.unit}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(service.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {services.map((service) => (
            <Card key={service.id} className="bg-white border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="font-semibold text-foreground">{service.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-semibold text-foreground">₹{service.pricePerUnit}/{service.unit}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)} className="flex-1 flex items-center justify-center gap-2">
                    <Edit2 className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(service.id)} className="flex-1 flex items-center justify-center gap-2 text-destructive">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
