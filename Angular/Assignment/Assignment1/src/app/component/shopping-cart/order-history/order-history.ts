import { Component } from '@angular/core';

@Component({
  selector: 'app-order-history',
  imports: [],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})

export class OrderHistory {

  isLoading: boolean = false;
  isAuthenticated: boolean = true;
  membershipLevel: string = 'Premium';
  cartTotal: number = 850;

  orders = [
    {
      id: 1,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'credit-card',
      shippingMethod: 'express',
      total: 350,
      rating: 5,
      products: [
        {
          name: 'MacBook Pro M4',
          stock: 4,
          category: 'Laptop'
        },
        {
          name: 'Sony Headphones',
          stock: 0,
          category: 'Audio',
        }
      ]
    },
    {
      id: 2,
      status: 'processing',
      paymentStatus: 'pending',
      paymentMethod: 'PhonePe',
      shippingMethod: 'standard',
      total: 120,
      rating: 4,
      products: [
        {
          name: 'Headphones',
          stock: 3,
          category: 'Accessories',
        }
      ]
    },
    {
      id: 3,
      status: 'cancelled',
      paymentStatus: 'pending',
      paymentMethod: 'cash-on-delivery',
      shippingMethod: 'pickup',
      total: 150,
      rating: 2,
      product: []
    }
  ]
}
