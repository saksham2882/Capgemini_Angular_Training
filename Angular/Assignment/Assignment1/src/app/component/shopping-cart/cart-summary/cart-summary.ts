import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../model/model';

@Component({
  selector: 'app-cart-summary',
  imports: [],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
})

export class CartSummaryComponent {

  @Input({ alias: 'cartData' })
  items: CartItem[] = [];

  @Output()
  removeItemEvent = new EventEmitter<CartItem>();

  get subtotal(): number {
    return this.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  }

  remove(item: CartItem) {
    this.removeItemEvent.emit(item);
  }
} 