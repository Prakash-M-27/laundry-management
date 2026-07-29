'use client'

import React, { useState } from 'react'
import { SERVICES, CUSTOMERS } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useOrders } from '@/lib/order-context'

type Step = 'services' | 'pickup' | 'datetime' | 'summary'

const TIME_SLOTS = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00',
  '16:00 - 17:00', '17:00 - 18:00',
]

interface OrderFormData {
  services: { serviceId: string; quantity: number }[]
  pickupType: 'self-drop' | 'home-pickup'
  pickupAddress: string
  pickupDate: string
  pickupTimeSlot: string
}

export function OrderForm({ onComplete }: { onComplete?: () => void }) {
  const { addOrder } = useOrders()
  const [currentStep, setCurrentStep] = useState<Step>('services')
  const [formData, setFormData] = useState<OrderFormData>({
    services: [],
    pickupType: 'home-pickup',
    pickupAddress: '',
    pickupDate: '',
    pickupTimeSlot: '',
  })
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const calculateTotal = () => {
    return formData.services.reduce((total, item) => {
      const service = SERVICES.find((s) => s.id === item.serviceId)
      return total + (service?.pricePerUnit || 0) * item.quantity
    }, 0)
  }

  const handleServiceToggle = (serviceId: string, quantity: number) => {
    const existing = formData.services.find((s) => s.serviceId === serviceId)
    if (existing) {
      if (quantity === 0) {
        setFormData({
          ...formData,
          services: formData.services.filter((s) => s.serviceId !== serviceId),
        })
      } else {
        setFormData({
          ...formData,
          services: formData.services.map((s) =>
            s.serviceId === serviceId ? { ...s, quantity } : s
          ),
        })
      }
    } else if (quantity > 0) {
      setFormData({
        ...formData,
        services: [...formData.services, { serviceId, quantity }],
      })
    }
    setQuantities({ ...quantities, [serviceId]: quantity })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'services':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Select Services</h3>
              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-white">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{service.pricePerUnit} per {service.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleServiceToggle(service.id, (quantities[service.id] || 0) - 1)
                        }
                        className="px-2 py-1 rounded border border-border hover:bg-muted text-foreground bg-white"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {quantities[service.id] || 0}
                      </span>
                      <button
                        onClick={() =>
                          handleServiceToggle(service.id, (quantities[service.id] || 0) + 1)
                        }
                        className="px-2 py-1 rounded border border-border hover:bg-muted text-foreground bg-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'pickup':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Pickup Type</h3>
              <div className="space-y-3">
                <button
                  onClick={() =>
                    setFormData({ ...formData, pickupType: 'home-pickup' })
                  }
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    formData.pickupType === 'home-pickup'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">Home Pickup</p>
                  <p className="text-sm text-muted-foreground">We&apos;ll pick up from your address</p>
                </button>

                <button
                  onClick={() =>
                    setFormData({ ...formData, pickupType: 'self-drop' })
                  }
                  className={`w-full p-4 rounded-lg border-2 transition text-left ${
                    formData.pickupType === 'self-drop'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">Self Drop</p>
                  <p className="text-sm text-muted-foreground">You&apos;ll drop off at our store</p>
                </button>
              </div>
            </div>

            {formData.pickupType === 'home-pickup' && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pickup Address
                </label>
                <select
                  value={formData.pickupAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, pickupAddress: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select an address</option>
                  {CUSTOMERS[0].addresses.map((addr) => (
                    <option key={addr.id} value={addr.address}>
                      {addr.type === 'home' ? '🏠' : '🏢'} {addr.address}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )

      case 'datetime':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  setFormData({ ...formData, pickupDate: e.target.value })
                }
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pickup Time Slot
              </label>
              <select
                value={formData.pickupTimeSlot}
                onChange={(e) =>
                  setFormData({ ...formData, pickupTimeSlot: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg border border-input bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Select a time slot</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Order Summary</h3>
              <Card className="bg-muted/30 border-border">
                <CardContent className="pt-4">
                  <div className="space-y-2 mb-4">
                    {formData.services.map((item) => {
                      const service = SERVICES.find((s) => s.id === item.serviceId)
                      return (
                        <div key={item.serviceId} className="flex justify-between text-sm">
                          <span className="text-foreground">
                            {service?.name} × {item.quantity} {service?.unit}
                          </span>
                          <span className="font-semibold text-foreground">
                            ₹{(service?.pricePerUnit || 0) * item.quantity}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-primary">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Pickup Type</p>
                <p className="font-semibold text-foreground capitalize">
                  {formData.pickupType === 'home-pickup' ? 'Home Pickup' : 'Self Drop'}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-semibold text-foreground">
                  {formData.pickupDate} {formData.pickupTimeSlot}
                </p>
              </div>
            </div>

            {formData.pickupAddress && (
              <div>
                <p className="text-muted-foreground text-sm">Address</p>
                <p className="font-semibold text-foreground text-sm">{formData.pickupAddress}</p>
              </div>
            )}
          </div>
        )
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 'services':
        return formData.services.length > 0
      case 'pickup':
        return (
          formData.pickupType === 'self-drop' ||
          (formData.pickupType === 'home-pickup' && formData.pickupAddress)
        )
      case 'datetime':
        return formData.pickupDate && formData.pickupTimeSlot
      case 'summary':
        return true
    }
  }

  const handleNext = () => {
    if (currentStep === 'services') setCurrentStep('pickup')
    else if (currentStep === 'pickup') setCurrentStep('datetime')
    else if (currentStep === 'datetime') setCurrentStep('summary')
    else if (currentStep === 'summary') {
      const customer = CUSTOMERS[0]
      addOrder({
        id: '',
        customerId: customer.id,
        customerName: customer.name,
        customerPhone: customer.phone,
        slotId: `slot_manual_${Date.now()}`,
        bookingDate: formData.pickupDate,
        bookingTime: formData.pickupTimeSlot,
        estimatedPrice: calculateTotal(),
      })
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentStep === 'pickup') setCurrentStep('services')
    else if (currentStep === 'datetime') setCurrentStep('pickup')
    else if (currentStep === 'summary') setCurrentStep('datetime')
  }

  const steps: Step[] = ['services', 'pickup', 'datetime', 'summary']

  return (
    <div>
      <div className="flex gap-2 mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 h-2 rounded-full transition-colors ${
              steps.indexOf(currentStep) >= index
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <Card className="bg-white border-border shadow-sm mb-6">
        <CardHeader>
          <CardTitle className="capitalize">
            {currentStep === 'services' && 'Select Services'}
            {currentStep === 'pickup' && 'Pickup Details'}
            {currentStep === 'datetime' && 'Schedule Pickup'}
            {currentStep === 'summary' && 'Confirm Order'}
          </CardTitle>
          {currentStep !== 'summary' && (
            <CardDescription>
              Step {steps.indexOf(currentStep) + 1} of 4
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      <div className="flex gap-3">
        {currentStep !== 'services' && (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex-1"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!isStepValid()}
          className={`flex-1 ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentStep === 'summary' ? 'Confirm Order' : 'Next'}
          {currentStep !== 'summary' && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
