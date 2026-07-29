export type OrderStatus = 'booked' | 'received' | 'processing' | 'ready' | 'completed'

export type UserRole = 'customer' | 'employee'

export type ServiceCategory = 'Wash & Fold' | 'Dry Clean' | 'Ironing' | 'Shoe Cleaning'

export interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
}

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  pricePerUnit: number
  unit: string
  description: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  slotId: string
  bookingDate: string
  bookingTime: string
  estimatedPrice: number
  actualPrice?: number
  weight?: number
  status: OrderStatus
  createdAt: string
  receivedAt?: string
  completedAt?: string
  employeeNotes?: string
  assignedEmployee?: string
}

export interface Address {
  id: string
  type: 'home' | 'work'
  address: string
  default: boolean
}

export interface PaymentMethod {
  id: string
  type: string
  last4: string
  default: boolean
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  totalOrders: number
  totalSpent: number
  joinDate: string
  addresses: Address[]
  paymentMethods: PaymentMethod[]
}

export interface Employee {
  id: string
  name: string
  phone: string
  email: string
  role: 'pickup' | 'delivery' | 'processing'
  assignedOrders: string[]
  status: 'available' | 'busy'
  rating: number
}

export const AVAILABLE_SLOTS: TimeSlot[] = [
  { id: 'slot_1', date: '2024-07-29', time: '09:00 - 11:00', available: true },
  { id: 'slot_2', date: '2024-07-29', time: '11:00 - 13:00', available: true },
  { id: 'slot_3', date: '2024-07-29', time: '14:00 - 16:00', available: false },
  { id: 'slot_4', date: '2024-07-29', time: '16:00 - 18:00', available: true },
  { id: 'slot_5', date: '2024-07-30', time: '09:00 - 11:00', available: true },
  { id: 'slot_6', date: '2024-07-30', time: '11:00 - 13:00', available: true },
  { id: 'slot_7', date: '2024-07-30', time: '14:00 - 16:00', available: true },
  { id: 'slot_8', date: '2024-07-31', time: '09:00 - 11:00', available: true },
  { id: 'slot_9', date: '2024-07-31', time: '11:00 - 13:00', available: false },
  { id: 'slot_10', date: '2024-07-31', time: '14:00 - 16:00', available: true },
]

export const TIME_SLOTS = [
  '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
  '12:00 - 13:00', '14:00 - 15:00', '15:00 - 16:00',
  '16:00 - 17:00', '17:00 - 18:00',
]

export const SERVICES: Service[] = [
  { id: 'svc_1', name: 'Standard Wash & Fold', category: 'Wash & Fold', pricePerUnit: 50, unit: 'kg', description: 'Machine wash with detergent, folded neatly' },
  { id: 'svc_2', name: 'Premium Wash & Fold', category: 'Wash & Fold', pricePerUnit: 80, unit: 'kg', description: 'Premium detergent, fabric softener, folded' },
  { id: 'svc_3', name: 'Dry Clean - Suit', category: 'Dry Clean', pricePerUnit: 150, unit: 'piece', description: 'Professional dry cleaning for suits & blazers' },
  { id: 'svc_4', name: 'Dry Clean - Dress', category: 'Dry Clean', pricePerUnit: 120, unit: 'piece', description: 'Gentle dry cleaning for dresses & gowns' },
  { id: 'svc_5', name: 'Ironing Only', category: 'Ironing', pricePerUnit: 20, unit: 'piece', description: 'Professional steam ironing per piece' },
  { id: 'svc_6', name: 'Shoe Cleaning', category: 'Shoe Cleaning', pricePerUnit: 100, unit: 'pair', description: 'Deep clean and polish for shoes' },
]

export const CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    totalOrders: 12,
    totalSpent: 2850,
    joinDate: '2024-01-15',
    addresses: [
      { id: 'addr_1', type: 'home', address: '42, Green Valley Apartments, MG Road, Bangalore - 560001', default: true },
      { id: 'addr_2', type: 'work', address: 'WeWork, Plot 24, Koramangala, Bangalore - 560034', default: false },
    ],
    paymentMethods: [
      { id: 'pm_1', type: 'Credit Card', last4: '4242', default: true },
      { id: 'pm_2', type: 'UPI', last4: 'rajesh@upi', default: false },
    ],
  },
  {
    id: 'cust_2',
    name: 'Priya Singh',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    totalOrders: 8,
    totalSpent: 1950,
    joinDate: '2024-02-20',
    addresses: [
      { id: 'addr_3', type: 'home', address: '7B, Sunshine Apartments, Indiranagar, Bangalore - 560038', default: true },
    ],
    paymentMethods: [
      { id: 'pm_3', type: 'UPI', last4: 'priya@paytm', default: true },
    ],
  },
  {
    id: 'cust_3',
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit@example.com',
    totalOrders: 5,
    totalSpent: 950,
    joinDate: '2024-03-10',
    addresses: [
      { id: 'addr_4', type: 'home', address: '56, Lake View Colony, Whitefield, Bangalore - 560066', default: true },
    ],
    paymentMethods: [
      { id: 'pm_4', type: 'Debit Card', last4: '9876', default: true },
    ],
  },
]

export const ORDERS: Order[] = [
  {
    id: 'ORD_001',
    customerId: 'cust_1',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    slotId: 'slot_1',
    bookingDate: '2024-07-25',
    bookingTime: '09:00 - 11:00',
    estimatedPrice: 250,
    actualPrice: 280,
    weight: 5.2,
    status: 'completed',
    createdAt: '2024-07-25 10:30',
    receivedAt: '2024-07-25 09:15',
    completedAt: '2024-07-27 16:00',
    employeeNotes: 'Delivered in excellent condition',
    assignedEmployee: 'emp_1',
  },
  {
    id: 'ORD_002',
    customerId: 'cust_1',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    slotId: 'slot_2',
    bookingDate: '2024-07-28',
    bookingTime: '11:00 - 13:00',
    estimatedPrice: 300,
    actualPrice: 320,
    weight: 6.1,
    status: 'ready',
    createdAt: '2024-07-28 11:45',
    receivedAt: '2024-07-28 11:20',
    employeeNotes: 'Premium wash completed',
    assignedEmployee: 'emp_1',
  },
  {
    id: 'ORD_003',
    customerId: 'cust_2',
    customerName: 'Priya Singh',
    customerPhone: '+91 98765 43211',
    slotId: 'slot_3',
    bookingDate: '2024-07-29',
    bookingTime: '14:00 - 16:00',
    estimatedPrice: 200,
    actualPrice: 200,
    weight: 3.8,
    status: 'processing',
    createdAt: '2024-07-29 14:20',
    receivedAt: '2024-07-29 14:00',
    employeeNotes: 'Currently in wash cycle',
    assignedEmployee: 'emp_2',
  },
  {
    id: 'ORD_004',
    customerId: 'cust_3',
    customerName: 'Amit Patel',
    customerPhone: '+91 98765 43212',
    slotId: 'slot_4',
    bookingDate: '2024-07-29',
    bookingTime: '16:00 - 18:00',
    estimatedPrice: 150,
    status: 'received',
    createdAt: '2024-07-29 16:30',
    receivedAt: '2024-07-29 16:15',
    assignedEmployee: 'emp_1',
  },
  {
    id: 'ORD_005',
    customerId: 'cust_2',
    customerName: 'Priya Singh',
    customerPhone: '+91 98765 43211',
    slotId: 'slot_5',
    bookingDate: '2024-07-30',
    bookingTime: '09:00 - 11:00',
    estimatedPrice: 220,
    status: 'booked',
    createdAt: '2024-07-29 18:00',
  },
]

export const EMPLOYEES: Employee[] = [
  {
    id: 'emp_1',
    name: 'Vikram Singh',
    phone: '+91 98765 12340',
    email: 'vikram@laundry.com',
    role: 'processing',
    assignedOrders: ['ORD_001', 'ORD_002', 'ORD_004'],
    status: 'available',
    rating: 4.8,
  },
  {
    id: 'emp_2',
    name: 'Sneha Sharma',
    phone: '+91 98765 12341',
    email: 'sneha@laundry.com',
    role: 'pickup',
    assignedOrders: ['ORD_003'],
    status: 'busy',
    rating: 4.9,
  },
  {
    id: 'emp_3',
    name: 'Rohan Verma',
    phone: '+91 98765 12342',
    email: 'rohan@laundry.com',
    role: 'delivery',
    assignedOrders: [],
    status: 'available',
    rating: 4.6,
  },
]

export const STAFF: Employee[] = EMPLOYEES

export const REVENUE_DATA = [
  { date: 'Jul 18', revenue: 1200, orders: 8 },
  { date: 'Jul 19', revenue: 1800, orders: 12 },
  { date: 'Jul 20', revenue: 1400, orders: 9 },
  { date: 'Jul 21', revenue: 2200, orders: 15 },
  { date: 'Jul 22', revenue: 1600, orders: 11 },
  { date: 'Jul 23', revenue: 1900, orders: 13 },
  { date: 'Jul 24', revenue: 2100, orders: 14 },
  { date: 'Jul 25', revenue: 2500, orders: 17 },
  { date: 'Jul 26', revenue: 1700, orders: 10 },
  { date: 'Jul 27', revenue: 2300, orders: 16 },
  { date: 'Jul 28', revenue: 2000, orders: 12 },
  { date: 'Jul 29', revenue: 2600, orders: 18 },
]

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  booked: 'bg-gray-100 text-gray-700 border border-gray-200',
  received: 'bg-blue-50 text-blue-700 border border-blue-200',
  processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  ready: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
}

export const CURRENT_USER = {
  id: 'user_demo',
  name: 'Demo User',
  email: 'demo@laundry.com',
  role: 'customer' as UserRole,
}

export const SHOP_INFO = {
  name: 'QuickWash Laundry',
  email: 'shop@laundry.com',
  phone: '+91 9876-543-210',
  workingHours: { open: '08:00', close: '22:00' },
  estimatedPrice: 250,
}
