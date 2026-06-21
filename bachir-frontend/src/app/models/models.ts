export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  active: boolean;
  productCount: number;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  unit: string;
  imageUrl?: string;
  available: boolean;
  isPromotion: boolean;
  originalPrice?: number;
  categoryId: number;
  categoryName: string;
  createdAt?: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  items: OrderItem[];
}

export interface OrderItemDto {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  items: OrderItemDto[];
  createdAt: string;
  updatedAt?: string;
}

export interface StoreInfo {
  id?: number;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  mapUrl?: string;
  openingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  readyOrders: number;
  todayOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCategories: number;
  topProducts: { name: string; count: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
}
