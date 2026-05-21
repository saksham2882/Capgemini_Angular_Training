import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../model/model';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})

export class ProductItemComponent {

  @Input({ required: true })
  product!: Product;

  @Input({ transform: (value: number) => Number(value).toFixed(2) })
  formattedPrice!: string;

  @Output('productSelected')
  addToCartEvent = new EventEmitter<Product>();

  addToCart() {
    console.log('ProductItemComponent');
    this.addToCartEvent.emit(this.product);
  }
} 