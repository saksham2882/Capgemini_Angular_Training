# Angular 21 Component Challenge: Smart Shopping Cart System
 
## Problem Statement
 
Build a multi-level component architecture for a **Smart Shopping Cart** application that demonstrates advanced usage of `@Input()` and `@Output()` decorators with some tricky requirements.
 
## Requirements
 
### 1. Component Hierarchy
 
Create the following component structure:
```
AppComponent (Root)
├── ShoppingCartComponent (Parent)
│   ├── CartSummaryComponent (Child)
│   ├── ProductListComponent (Child)
│   │   └── ProductItemComponent (Grandchild - *ngFor)
│   └── DiscountPanelComponent (Child)
```
 
### 2. Component Specifications
 
#### **AppComponent**
- Maintain a master list of available products with initial inventory
- Track total revenue across all cart operations
- Listen to cart checkout events from ShoppingCartComponent
- Display global statistics (total items sold, revenue generated)
 
#### **ShoppingCartComponent**
- Accept product catalog from parent via `@Input()`
- Maintain current cart state (items, quantities)
- Emit checkout event to parent via `@Output()`
- Pass data to all child components
 
#### **ProductListComponent**
- Receive available products via `@Input()`
- Emit product selection events to parent via `@Output()`
- **Tricky Part**: Should handle product stock updates from parent when items are removed from cart
 
#### **ProductItemComponent**
- Display individual product details
- Receive product data via `@Input()`
- Emit add-to-cart event via `@Output()`
- **Tricky Part**: Button should be disabled when product is out of stock (quantity = 0)
 
#### **CartSummaryComponent**
- Receive cart items via `@Input()`
- Display cart contents with quantities and prices
- Emit remove item events via `@Output()`
- Calculate and display subtotal
- **Tricky Part**: Should update in real-time when cart changes
 
#### **DiscountPanelComponent**
- Receive cart total via `@Input()`
- Emit discount code application via `@Output()` with discount percentage
- **Tricky Part**: Validate discount codes and emit only valid ones
  - "SAVE10" = 10% off
  - "SAVE20" = 20% off (only if cart total > $100)
  - "FIRST25" = 25% off (only for first-time users - track via flag)
 
### 3. Data Models
 
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
}
 
interface CartItem {
  product: Product;
  quantity: number;
}
 
interface DiscountInfo {
  code: string;
  percentage: number;
  isValid: boolean;
}
 
interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  timestamp: Date;
}
```
 
### 4. Tricky Requirements 🎯
 
1. **Input Transformation**:
   - Use `@Input({ transform: ... })` to automatically format prices to 2 decimal places in ProductItemComponent
 
2. **Required Inputs**:
   - Make product input required in ProductItemComponent using `@Input({ required: true })`
 
3. **Alias Usage**:
   - Use `@Input({ alias: 'cartData' })` for cart items in CartSummaryComponent
   - Use `@Output({ alias: 'productSelected' })` for add-to-cart events
 
4. **Two-way Binding Simulation**:
   - Implement a custom two-way binding for discount code using:
     - `@Input() discountCode: string`
     - `@Output() discountCodeChange = new EventEmitter<string>()`
 
5. **Event Bubbling**:
   - When a product is added from ProductItemComponent, the event should bubble through:
     - ProductItemComponent → ProductListComponent → ShoppingCartComponent
   - Each level should log the event with component name
 
6. **Conditional Rendering**:
   - CartSummaryComponent should emit a warning event if total exceeds $500
   - AppComponent should display a special message when this happens
 
7. **Stock Management**:
   - When item is added to cart, reduce stock in the master product list
   - When item is removed from cart, restore stock
   - Prevent adding items when stock is 0
 
8. **Output Validation**:
   - ShoppingCartComponent should NOT emit checkout event if:
     - Cart is empty
     - Any cart item quantity exceeds available stock
     - Total is less than $10