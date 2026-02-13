export interface Shop {
  id: string;
  shop_name: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface User {
  id: string;
  shop_id: string;
  full_name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'SELLER' | 'TECHNICIAN';
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  shop_id: string;
  name: string;
  category: 'FRAME' | 'LENS' | 'SUNGLASSES' | 'ACCESSORY';
  brand: string;
  model: string;
  color: string;
  size: string;
  barcode: string;
  purchase_price: number;
  selling_price: number;
  stock_quantity: number;
  min_stock: number;
  created_at: string;
}

export interface Customer {
  id: string;
  shop_id: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  birth_date: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  created_at: string;
}

export interface Prescription {
  id: string;
  customer_id: string;
  right_eye_sphere: number;
  right_eye_cylinder: number;
  right_eye_axis: number;
  left_eye_sphere: number;
  left_eye_cylinder: number;
  left_eye_axis: number;
  addition: number;
  doctor_name: string;
  prescription_date: string;
  notes: string;
  created_at: string;
}

export interface Order {
  id: string;
  shop_id: string;
  customer_id: string;
  total_price: number;
  status: 'PENDING' | 'READY' | 'DELIVERED' | 'CANCELED';
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export interface Payment {
  id: string;
  order_id: string;
  amount: number;
  payment_method: 'CASH' | 'CARD' | 'TRANSFER';
  payment_date: string;
}

export const shops: Shop[] = [
  {
    id: '1',
    shop_name: 'Vision Plus Opticians',
    address: '123 Main Street, Downtown',
    phone: '+1-555-0101',
    email: 'info@visionplus.com',
    created_at: '2024-01-15T10:00:00Z',
  },
];

export const users: User[] = [
  {
    id: '1',
    shop_id: '1',
    full_name: 'John Anderson',
    email: 'admin@visionplus.com',
    password: 'admin123',
    role: 'ADMIN',
    phone: '+1-555-0102',
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    shop_id: '1',
    full_name: 'Sarah Miller',
    email: 'sarah@visionplus.com',
    password: 'seller123',
    role: 'SELLER',
    phone: '+1-555-0103',
    is_active: true,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '3',
    shop_id: '1',
    full_name: 'Mike Johnson',
    email: 'mike@visionplus.com',
    password: 'tech123',
    role: 'TECHNICIAN',
    phone: '+1-555-0104',
    is_active: true,
    created_at: '2024-02-01T10:00:00Z',
  },
];

export const products: Product[] = [
  {
    id: '1',
    shop_id: '1',
    name: 'Ray-Ban Aviator Classic',
    category: 'SUNGLASSES',
    brand: 'Ray-Ban',
    model: 'RB3025',
    color: 'Gold',
    size: 'Medium',
    barcode: '8053672000000',
    purchase_price: 85.00,
    selling_price: 159.99,
    stock_quantity: 15,
    min_stock: 5,
    created_at: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    shop_id: '1',
    name: 'Oakley Rectangular Frame',
    category: 'FRAME',
    brand: 'Oakley',
    model: 'OX8156',
    color: 'Black',
    size: 'Large',
    barcode: '888392000001',
    purchase_price: 120.00,
    selling_price: 229.99,
    stock_quantity: 3,
    min_stock: 5,
    created_at: '2024-01-25T10:00:00Z',
  },
  {
    id: '3',
    shop_id: '1',
    name: 'Progressive Lens',
    category: 'LENS',
    brand: 'Essilor',
    model: 'Varilux Comfort',
    color: 'Clear',
    size: 'Universal',
    barcode: '3245670000002',
    purchase_price: 95.00,
    selling_price: 189.99,
    stock_quantity: 25,
    min_stock: 10,
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    shop_id: '1',
    name: 'Blue Light Blocking Lens',
    category: 'LENS',
    brand: 'Zeiss',
    model: 'BlueGuard',
    color: 'Clear',
    size: 'Universal',
    barcode: '4025610000003',
    purchase_price: 45.00,
    selling_price: 89.99,
    stock_quantity: 18,
    min_stock: 15,
    created_at: '2024-02-05T10:00:00Z',
  },
  {
    id: '5',
    shop_id: '1',
    name: 'Gucci Square Frame',
    category: 'FRAME',
    brand: 'Gucci',
    model: 'GG0022O',
    color: 'Tortoise',
    size: 'Medium',
    barcode: '889652000004',
    purchase_price: 180.00,
    selling_price: 349.99,
    stock_quantity: 8,
    min_stock: 3,
    created_at: '2024-02-10T10:00:00Z',
  },
  {
    id: '6',
    shop_id: '1',
    name: 'Lens Cleaning Kit',
    category: 'ACCESSORY',
    brand: 'Zeiss',
    model: 'Care Kit',
    color: 'N/A',
    size: 'Standard',
    barcode: '4025610000005',
    purchase_price: 8.00,
    selling_price: 19.99,
    stock_quantity: 45,
    min_stock: 20,
    created_at: '2024-02-12T10:00:00Z',
  },
  {
    id: '7',
    shop_id: '1',
    name: 'Polarized Sports Sunglasses',
    category: 'SUNGLASSES',
    brand: 'Oakley',
    model: 'Flak 2.0',
    color: 'Matte Black',
    size: 'Large',
    barcode: '888392000006',
    purchase_price: 95.00,
    selling_price: 179.99,
    stock_quantity: 2,
    min_stock: 5,
    created_at: '2024-02-15T10:00:00Z',
  },
  {
    id: '8',
    shop_id: '1',
    name: 'Kids Round Frame',
    category: 'FRAME',
    brand: 'Disney',
    model: 'Mickey Kids',
    color: 'Red',
    size: 'Small',
    barcode: '7894560000007',
    purchase_price: 35.00,
    selling_price: 69.99,
    stock_quantity: 12,
    min_stock: 8,
    created_at: '2024-02-18T10:00:00Z',
  },
];

export const customers: Customer[] = [
  {
    id: '1',
    shop_id: '1',
    full_name: 'Emily Roberts',
    phone: '+1-555-0201',
    email: 'emily.roberts@email.com',
    address: '456 Oak Avenue, Suite 12',
    birth_date: '1985-06-15',
    gender: 'FEMALE',
    created_at: '2024-01-22T10:00:00Z',
  },
  {
    id: '2',
    shop_id: '1',
    full_name: 'David Chen',
    phone: '+1-555-0202',
    email: 'david.chen@email.com',
    address: '789 Pine Street',
    birth_date: '1978-03-22',
    gender: 'MALE',
    created_at: '2024-01-25T10:00:00Z',
  },
  {
    id: '3',
    shop_id: '1',
    full_name: 'Maria Garcia',
    phone: '+1-555-0203',
    email: 'maria.garcia@email.com',
    address: '321 Elm Drive',
    birth_date: '1992-11-08',
    gender: 'FEMALE',
    created_at: '2024-02-01T10:00:00Z',
  },
  {
    id: '4',
    shop_id: '1',
    full_name: 'James Wilson',
    phone: '+1-555-0204',
    email: 'james.wilson@email.com',
    address: '654 Maple Road',
    birth_date: '1965-09-30',
    gender: 'MALE',
    created_at: '2024-02-05T10:00:00Z',
  },
  {
    id: '5',
    shop_id: '1',
    full_name: 'Lisa Thompson',
    phone: '+1-555-0205',
    email: 'lisa.thompson@email.com',
    address: '987 Cedar Lane',
    birth_date: '1988-12-12',
    gender: 'FEMALE',
    created_at: '2024-02-08T10:00:00Z',
  },
];

export const prescriptions: Prescription[] = [
  {
    id: '1',
    customer_id: '1',
    right_eye_sphere: -2.50,
    right_eye_cylinder: -0.75,
    right_eye_axis: 180,
    left_eye_sphere: -2.25,
    left_eye_cylinder: -0.50,
    left_eye_axis: 175,
    addition: 0,
    doctor_name: 'Dr. Sarah Mitchell',
    prescription_date: '2024-02-10',
    notes: 'Patient reports eye strain when reading',
    created_at: '2024-02-10T14:30:00Z',
  },
  {
    id: '2',
    customer_id: '2',
    right_eye_sphere: -1.75,
    right_eye_cylinder: 0,
    right_eye_axis: 0,
    left_eye_sphere: -2.00,
    left_eye_cylinder: -0.25,
    left_eye_axis: 90,
    addition: 0,
    doctor_name: 'Dr. Michael Chang',
    prescription_date: '2024-02-08',
    notes: 'Recommend anti-reflective coating',
    created_at: '2024-02-08T11:15:00Z',
  },
  {
    id: '3',
    customer_id: '3',
    right_eye_sphere: 0,
    right_eye_cylinder: 0,
    right_eye_axis: 0,
    left_eye_sphere: -0.50,
    left_eye_cylinder: 0,
    left_eye_axis: 0,
    addition: 0,
    doctor_name: 'Dr. Sarah Mitchell',
    prescription_date: '2024-02-15',
    notes: 'Mild myopia, recommend glasses for distance',
    created_at: '2024-02-15T09:45:00Z',
  },
  {
    id: '4',
    customer_id: '4',
    right_eye_sphere: -3.50,
    right_eye_cylinder: -1.25,
    right_eye_axis: 85,
    left_eye_sphere: -3.25,
    left_eye_cylinder: -1.00,
    left_eye_axis: 95,
    addition: 2.00,
    doctor_name: 'Dr. Robert Lee',
    prescription_date: '2024-02-12',
    notes: 'Progressive lenses recommended',
    created_at: '2024-02-12T15:20:00Z',
  },
];

export const orders: Order[] = [
  {
    id: '1',
    shop_id: '1',
    customer_id: '1',
    total_price: 379.98,
    status: 'DELIVERED',
    created_at: '2024-02-11T10:30:00Z',
  },
  {
    id: '2',
    shop_id: '1',
    customer_id: '2',
    total_price: 319.98,
    status: 'DELIVERED',
    created_at: '2024-02-09T14:15:00Z',
  },
  {
    id: '3',
    shop_id: '1',
    customer_id: '3',
    total_price: 159.98,
    status: 'READY',
    created_at: '2024-02-16T11:00:00Z',
  },
  {
    id: '4',
    shop_id: '1',
    customer_id: '4',
    total_price: 419.98,
    status: 'PENDING',
    created_at: '2024-02-13T09:45:00Z',
  },
  {
    id: '5',
    shop_id: '1',
    customer_id: '5',
    total_price: 249.98,
    status: 'PENDING',
    created_at: '2024-02-17T16:20:00Z',
  },
  {
    id: '6',
    shop_id: '1',
    customer_id: '1',
    total_price: 89.99,
    status: 'DELIVERED',
    created_at: '2024-01-28T13:10:00Z',
  },
  {
    id: '7',
    shop_id: '1',
    customer_id: '2',
    total_price: 179.99,
    status: 'DELIVERED',
    created_at: '2024-01-25T10:30:00Z',
  },
  {
    id: '8',
    shop_id: '1',
    customer_id: '3',
    total_price: 349.99,
    status: 'CANCELED',
    created_at: '2024-02-05T14:00:00Z',
  },
];

export const orderItems: OrderItem[] = [
  { id: '1', order_id: '1', product_id: '5', quantity: 1, price: 349.99 },
  { id: '2', order_id: '1', product_id: '6', quantity: 1, price: 19.99 },
  { id: '3', order_id: '1', product_id: '4', quantity: 1, price: 89.99 },
  { id: '4', order_id: '2', product_id: '2', quantity: 1, price: 229.99 },
  { id: '5', order_id: '2', product_id: '4', quantity: 1, price: 89.99 },
  { id: '6', order_id: '3', product_id: '1', quantity: 1, price: 159.99 },
  { id: '7', order_id: '4', product_id: '3', quantity: 2, price: 189.99 },
  { id: '8', order_id: '4', product_id: '6', quantity: 2, price: 19.99 },
  { id: '9', order_id: '5', product_id: '2', quantity: 1, price: 229.99 },
  { id: '10', order_id: '5', product_id: '6', quantity: 1, price: 19.99 },
  { id: '11', order_id: '6', product_id: '4', quantity: 1, price: 89.99 },
  { id: '12', order_id: '7', product_id: '7', quantity: 1, price: 179.99 },
  { id: '13', order_id: '8', product_id: '5', quantity: 1, price: 349.99 },
];

export const payments: Payment[] = [
  {
    id: '1',
    order_id: '1',
    amount: 379.98,
    payment_method: 'CARD',
    payment_date: '2024-02-11T10:35:00Z',
  },
  {
    id: '2',
    order_id: '2',
    amount: 319.98,
    payment_method: 'CASH',
    payment_date: '2024-02-09T14:20:00Z',
  },
  {
    id: '3',
    order_id: '3',
    amount: 159.98,
    payment_method: 'CARD',
    payment_date: '2024-02-16T11:05:00Z',
  },
  {
    id: '4',
    order_id: '6',
    amount: 89.99,
    payment_method: 'CASH',
    payment_date: '2024-01-28T13:15:00Z',
  },
  {
    id: '5',
    order_id: '7',
    amount: 179.99,
    payment_method: 'TRANSFER',
    payment_date: '2024-01-25T10:35:00Z',
  },
];
