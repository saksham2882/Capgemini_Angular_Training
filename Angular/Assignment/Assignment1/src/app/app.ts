import { Component } from '@angular/core';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart';
import { Product, CheckoutData } from './model/model';
import { CustomerProfile } from './component/shopping-cart/customer-profile/customer-profile';
import { OrderHistory } from './component/shopping-cart/order-history/order-history';

@Component({
  selector: 'app-root',
  imports: [ShoppingCartComponent, CustomerProfile, OrderHistory],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  totalRevenue = 0;
  totalItemsSold = 0;
  showWarning = false;

  products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro M4',
      price: 2499.99,
      stock: 4,
      category: 'Laptop',
    },
    {
      id: 2,
      name: 'iPhone 16 Pro',
      price: 1399.99,
      stock: 7,
      category: 'Mobile',
    },
    {
      id: 3,
      name: 'Nike Air Max',
      price: 180,
      stock: 12,
      category: 'Footwear',
    },
    {
      id: 4,
      name: 'Samsung Smart TV',
      price: 899.99,
      stock: 5,
      category: 'Electronics',
    },
    {
      id: 5,
      name: 'Sony Headphones',
      price: 299.99,
      stock: 9,
      category: 'Accessories',
    },
  ];


  handleCheckout(data: CheckoutData) {
    console.log('AppComponent Checkout:', data);
    this.totalRevenue += data.total;

    data.items.forEach((item) => {
      this.totalItemsSold += item.quantity;
    });

    alert('Checkout Successful');
  }

  handleWarning(message: string) {
    this.showWarning = true;
    alert(message);
  }
} 