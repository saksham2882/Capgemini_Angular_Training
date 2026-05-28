export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DiscountInfo {
  code: string;
  percentage: number;
  isValid: boolean;
}

export interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  timestamp: Date;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  membershipLevel: string;
  loyaltyPoints: number;
  totalOrders: number;
  joinDate: Date;
  profileImageUrl: string;
  isActive: boolean;
  subscribeNewsletter: boolean;
  preferredCategory: string;
}