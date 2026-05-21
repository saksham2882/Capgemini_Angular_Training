import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../model/model';
import { ProductItemComponent } from './product-item/product-item';

@Component({
  selector: 'app-product-list',
  imports: [ProductItemComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})

export class ProductListComponent {
  @Input() products: Product[] = [];

  @Output('productSelected' )
  productSelectedEvent = new EventEmitter<Product>();

  onProductSelect(product: Product) {
    console.log('ProductListComponent');
    this.productSelectedEvent.emit(product);
  }
} 