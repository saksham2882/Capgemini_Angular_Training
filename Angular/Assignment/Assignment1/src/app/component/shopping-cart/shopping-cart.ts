import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, CartItem, CheckoutData, DiscountInfo, } from '../../model/model';
import { ProductListComponent } from '../shopping-cart/product-list/product-list';
import { CartSummaryComponent } from '../shopping-cart/cart-summary/cart-summary';
import { DiscountPanelComponent } from '../shopping-cart/discount-panel/discount-panel';
import { ProductFilter } from './product-filter/product-filter';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    ProductListComponent,
    CartSummaryComponent,
    DiscountPanelComponent,
    ProductFilter
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})

export class ShoppingCartComponent {
  @Input() products: Product[] = [];

  @Output() checkoutEvent = new EventEmitter<CheckoutData>();

  @Output() warningEvent = new EventEmitter<string>();

  cartItems: CartItem[] = [];
  filteredProducts: Product[] = [];
  discountPercentage = 0;
  discountCode = '';
  subtotal = 0;
  total = 0;

  addToCart(product: Product) {
    console.log('ShoppingCartComponent');
    if (product.stock <= 0) {
      return;
    }

    product.stock--;

    const existing = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({
        product,
        quantity: 1,
      });
    }
    this.calculateTotal();
  }

  removeItem(item: CartItem) {
    item.product.stock++;

    const index = this.cartItems.findIndex(
      (cart) => cart.product.id === item.product.id
    );

    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  applyDiscount(discount: DiscountInfo) {
    if (discount.isValid) {
      this.discountPercentage = discount.percentage;
    } else {
      this.discountPercentage = 0;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.subtotal = this.cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    this.total = this.subtotal - (this.subtotal * this.discountPercentage) / 100;

    if (this.total > 500) {
      this.warningEvent.emit('Cart Total Exceeded $500');
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty');
      return;
    }
    if (this.total < 10) {
      alert('Minimum total should be $10');
      return;
    }

    const invalidItem = this.cartItems.find(
      (item) => item.quantity > item.product.stock + item.quantity
    );
    if (invalidItem) {
      alert('Invalid stock');
      return;
    }

    const data: CheckoutData = {
      items: this.cartItems,
      subtotal: this.subtotal,
      discount: this.discountPercentage,
      total: this.total,
      timestamp: new Date(),
    };

    this.checkoutEvent.emit(data);
    this.cartItems = [];
    this.discountPercentage = 0;
    this.calculateTotal();
  }

  ngOnInit() {
    this.filteredProducts = this.products;
  }

  handleFilteredProducts(products: Product[]) {
    this.filteredProducts = products;
  }
}