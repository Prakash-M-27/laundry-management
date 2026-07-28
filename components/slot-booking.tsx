'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import { AVAILABLE_SLOTS, SHOP_INFO } from '@/lib/mock-data'

interface SlotBookingProps {
  onBookingComplete?: (slotId: string, date: string, time: string) => void
}

export function SlotBooking({ onBookingComplete }: SlotBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSlot, setSelectedSlot] = useState<string>('')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const uniqueDates = Array.from(new Set(AVAILABLE_SLOTS.map(s => s.date))).sort()
  const slotsForDate = selectedDate ? AVAILABLE_SLOTS.filter(s => s.date === selectedDate) : []

  const handleBooking = async () => {
    if (!selectedSlot) return
    const slot = AVAILABLE_SLOTS.find(s => s.id === selectedSlot)
    if (!slot) return
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 700))
    setIsLoading(false)
    setBookingConfirmed(true)
    onBookingComplete?.(slot.id, slot.date, slot.time)
    setTimeout(() => {
      setSelectedDate('')
      setSelectedSlot('')
      setBookingConfirmed(false)
    }, 4000)
  }

  if (bookingConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">Booking Confirmed!</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Your slot is booked. Our team will pick up your clothes at the scheduled time and confirm the final price.
        </p>
      </div>
    )
  }

  const selectedSlotData = AVAILABLE_SLOTS.find(s => s.id === selectedSlot)

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Select Date</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {uniqueDates.map(date => {
            const d = new Date(date)
            const day = d.toLocaleDateString('en-US', { weekday: 'short' })
            const num = d.toLocaleDateString('en-US', { day: 'numeric' })
            const mon = d.toLocaleDateString('en-US', { month: 'short' })
            const isSelected = selectedDate === date
            return (
              <button
                key={date}
                onClick={() => { setSelectedDate(date); setSelectedSlot('') }}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  isSelected
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                }`}
              >
                <p className={`text-xs font-medium ${isSelected ? 'text-background/70' : 'text-muted-foreground'}`}>{day}</p>
                <p className={`text-lg font-bold leading-tight ${isSelected ? 'text-background' : 'text-foreground'}`}>{num}</p>
                <p className={`text-xs ${isSelected ? 'text-background/70' : 'text-muted-foreground'}`}>{mon}</p>
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Select Time Slot</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slotsForDate.map(slot => {
              const isSelected = selectedSlot === slot.id
              return (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot.id)}
                  disabled={!slot.available}
                  className={`p-3.5 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                    !slot.available
                      ? 'border-border bg-muted text-muted-foreground/40 cursor-not-allowed'
                      : isSelected
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border bg-card text-foreground hover:border-muted-foreground/30'
                  }`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? 'text-background' : ''}`}>{slot.time}</p>
                    {!slot.available && <p className="text-xs text-muted-foreground/60 mt-0.5">Fully booked</p>}
                    {slot.available && !isSelected && <p className="text-xs text-muted-foreground mt-0.5">Available</p>}
                    {isSelected && <p className="text-xs text-background/70 mt-0.5">Selected</p>}
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-background flex-shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {selectedSlot && selectedSlotData && (
        <div className="bg-muted rounded-xl border border-border p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium text-foreground">
                {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium text-foreground">{selectedSlotData.time}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 mt-2">
              <span className="text-muted-foreground">Est. Price</span>
              <span className="font-bold text-foreground">₹{SHOP_INFO.estimatedPrice}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Final price is confirmed after weighing. You'll be notified via SMS.
          </p>
          <Button
            onClick={handleBooking}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl"
          >
            {isLoading ? (
              <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            {isLoading ? 'Confirming…' : 'Confirm Booking'}
          </Button>
        </div>
      )}
    </div>
  )
}
