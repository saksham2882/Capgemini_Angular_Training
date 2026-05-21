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