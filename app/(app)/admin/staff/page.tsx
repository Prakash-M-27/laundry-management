'use client'

import React, { useState } from 'react'
import { STAFF } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Star } from 'lucide-react'

interface StaffMember {
  id: string
  name: string
  phone: string
  role: 'pickup' | 'delivery' | 'processing'
  assignedOrders: string[]
  status: 'available' | 'busy'
  rating: number
}

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(STAFF)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', phone: '', role: 'pickup' as const })

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({ name: '', phone: '', role: 'pickup' })
    setShowForm(true)
  }

  const handleEdit = (member: StaffMember) => {
    setEditingId(member.id)
    setFormData({ name: member.name, phone: member.phone, role: member.role })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setStaff(staff.map((s) => s.id === editingId ? { ...s, name: formData.name, phone: formData.phone, role: formData.role } : s))
    } else {
      setStaff([...staff, { id: `staff_${staff.length + 1}`, name: formData.name, phone: formData.phone, role: formData.role, assignedOrders: [], status: 'available', rating: 4.5 }])
    }
    setShowForm(false)
  }

  const toggleStatus = (id: string) => {
    setStaff(staff.map((s) => s.id === id ? { ...s, status: s.status === 'available' ? 'busy' : 'available' } : s))
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Staff & Delivery</h1>
            <p className="text-sm text-muted-foreground">Manage your team members and assign tasks</p>
          </div>
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Staff
          </Button>
        </div>

        {showForm && (
          <Card className="bg-white border-border shadow-sm">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Staff Member' : 'Add New Staff Member'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as 'pickup' | 'delivery' | 'processing' })} className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="pickup">Pickup</option>
                    <option value="delivery">Delivery</option>
                    <option value="processing">Processing</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">{editingId ? 'Update' : 'Add'} Staff</Button>
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{member.name}</p>
                  </td>
                  <td className="px-6 py-4 text-foreground">{member.phone}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-foreground capitalize border border-border">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(member.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize cursor-pointer transition-colors ${
                        member.status === 'available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {member.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-foreground">{member.assignedOrders.length} orders</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-foreground font-semibold">{member.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
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
          {staff.map((member) => (
            <Card key={member.id} className="bg-white border-border shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-foreground">{member.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{member.phone}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Role</p>
                    <p className="font-semibold text-foreground capitalize">{member.role}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <button
                      onClick={() => toggleStatus(member.id)}
                      className={`px-2 py-0.5 rounded text-xs font-semibold capitalize cursor-pointer transition-colors inline-block ${
                        member.status === 'available' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {member.status}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Assigned Orders</p>
                  <p className="font-semibold text-foreground">{member.assignedOrders.length} orders</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)} className="flex-1 flex items-center justify-center gap-2">
                    <Edit2 className="h-4 w-4" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(member.id)} className="flex-1 flex items-center justify-center gap-2 text-destructive">
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
