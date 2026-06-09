import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FavoriteProducts } from '../FavoriteProducts';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { createAction, createReducer, on, props, select, Store } from '@ngrx/store';

// AppState interface definition
export interface AppState {
  items: FavoriteProducts[];
  totalItems: number;
}

// Root state that contains all feature states
export interface RootState {
  appState: AppState;
}

// add initial 4 products to the state
const initialState: AppState = {
  items: [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description for Product 1',
      isFavorite: true,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      description: 'Description for Product 2',
      isFavorite: false,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      description: 'Description for Product 3',
      isFavorite: true,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'Product 4',
      price: 40,
      description: 'Description for Product 4',
      isFavorite: false,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ],
  totalItems: 4
};


// Actions to add, remove, update and clear products
export const addProduct = createAction('[Product] Add', props<{ product: FavoriteProducts }>());
export const removeProduct = createAction('[Product] Remove', props<{ productId: number }>());
export const updateProduct = createAction('[Product] Update', props<{ product: FavoriteProducts }>());
export const clearProducts = createAction('[Product] Clear');


// Reducer function to handle actions and update the state
export const appReducer = createReducer(initialState,

  on(addProduct, (state, { product }) => {
    console.log('Adding product:', product);
    return {
      ...state,
      items: [...state.items, product],
      totalItems: state.totalItems + 1
    };
  }),

  on(removeProduct, (state, { productId }) => {
    console.log('Removing product with ID:', productId);
    return {
      ...state,
      items: state.items.filter((item: FavoriteProducts) => item.id !== productId),
      totalItems: state.totalItems - 1
    };
  }),

  on(updateProduct, (state, { product }) => {
    console.log('Updating product:', product);
    return {
      ...state,
      items: state.items.map((item: FavoriteProducts) => item.id === product.id ? product : item)
    };
  }),

  on(clearProducts, state => {
    console.log('Clearing all products');
    return {
      ...state,
      items: [],
      totalItems: 0
    };
  })
);


@Component({
  selector: 'app-ngrx-demo',
  imports: [FormsModule],
  templateUrl: './ngrx-demo.html',
  styleUrl: './ngrx-demo.css',
})
export class NgRxDemo {

  private store: Store<RootState> = inject(Store<RootState>);
  private destroyRef = inject(DestroyRef);


  // Signals for UI
  items$ = signal<FavoriteProducts[]>([]);
  totalItems$ = signal<number>(0);
  
  newProduct: FavoriteProducts = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    isFavorite: false,
    imageUrl: ''
  };

  constructor() {
    this.store.pipe(select((state: RootState) => state.appState?.items || []), takeUntilDestroyed(this.destroyRef))
      .subscribe(items => {
        this.items$.set(items);
        this.totalItems$.set(items.length);
        console.log('Items/State updated:', items);
      });
  }

  count = 100;
  addProduct() {
    const newProduct: FavoriteProducts = {
      id: this.count++,
      name: this.newProduct.name,
      price: this.newProduct.price,
      description: this.newProduct.description,
      isFavorite: this.newProduct.isFavorite,
      imageUrl: this.newProduct.imageUrl || ''
    };
    this.store.dispatch(addProduct({ product: newProduct }));
    console.log('Dispatched addProduct action with:', newProduct);

    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      description: '',
      isFavorite: false,
      imageUrl: ''
    };
  }

  removeProduct(productId: number) {
    this.store.dispatch(removeProduct({ productId }));
    console.log('Dispatched removeProduct action with ID:', productId);
  }

  updateProduct(product: FavoriteProducts) {
    this.store.dispatch(updateProduct({ product }));
    console.log('Dispatched updateProduct action with:', product);
  }

  clearProducts() {
    this.store.dispatch(clearProducts());
    console.log('Dispatched clearProducts action');
  }
}