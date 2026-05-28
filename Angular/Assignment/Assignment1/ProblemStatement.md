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





# Part 2: Advanced Bindings 
 
## Problem Statement - Extension
 
Extend the Smart Shopping Cart System by adding **two new components** that demonstrate all Angular binding techniques. These components will enhance the user experience with filtering, search, and customer profile management.
 
## New Component Requirements
 
### Component Hierarchy - Updated
```
AppComponent (Root)
├── ShoppingCartComponent (Parent)
│   ├── ProductFilterComponent (NEW - Child)
│   ├── CartSummaryComponent (Child)
│   ├── ProductListComponent (Child)
│   │   └── ProductItemComponent (Grandchild - *ngFor)
│   ├── DiscountPanelComponent (Child)
│   └── CustomerProfileComponent (NEW - Child)
```
 
---
 
## Component 1: ProductFilterComponent
 
This component provides filtering and search functionality for products.
 
### Features to Implement:
 
#### **1. String Interpolation**
Display the following using string interpolation:
- Total number of products available: `{{totalProducts}}`
- Number of filtered products: `{{filteredProducts.length}}`
- Current search term: `{{searchTerm}}`
- Active filter category: `{{activeCategory || 'All Categories'}}`
- Price range display: `{{minPrice}} - {{maxPrice}}`
 
#### **2. Property Binding**
- Bind `placeholder` attribute: `[placeholder]="searchPlaceholder"`
- Bind `value` to reset button: `[value]="resetButtonText"`
- Bind image source for category icons: `[src]="categoryIconPath"`
- Bind `min` and `max` for price range slider: `[min]="0" [max]="1000"`
 
#### **3. Attribute Binding**
- Bind `aria-label` for accessibility: `[attr.aria-label]="'Filter products by ' + activeCategory"`
- Bind `data-category` custom attribute: `[attr.data-category]="activeCategory"`
- Bind `tabindex` dynamically: `[attr.tabindex]="isFilterActive ? 0 : -1"`
 
#### **4. Class Binding**
- Apply `.active-filter` class when filter is applied: `[class.active-filter]="isFilterActive"`
- Apply `.clear-visible` class when search has text: `[class.clear-visible]="searchTerm.length > 0"`
- Toggle `.expanded` class for filter panel: `[class.expanded]="isPanelExpanded"`
- Apply multiple classes: `[ngClass]="{'highlight': hasResults, 'no-results': !hasResults, 'loading': isLoading}"`
 
#### **5. Style Binding**
- Dynamic background color based on category:
  ```html
  [style.background-color]="getCategoryColor(activeCategory)"
  ```
- Dynamic width for filter panel: `[style.width.%]="isPanelExpanded ? 100 : 30"`
- Font size based on result count: `[style.font-size.px]="filteredProducts.length > 10 ? 14 : 16"`
- Border style using ngStyle:
  ```html
  [ngStyle]="{
    'border': isFilterActive ? '2px solid green' : '1px solid gray',
    'padding': '10px',
    'border-radius': '5px'
  }"
  ```
 
#### **6. Event Binding**
- Search input change: `(input)="onSearchChange($event)"`
- Category selection: `(click)="selectCategory(category)"`
- Clear filters button: `(click)="clearAllFilters()"`
- Price range slider: `(change)="onPriceRangeChange($event)"`
- Toggle panel expansion: `(click)="togglePanel()"`
- Sort dropdown: `(change)="onSortChange($event)"`
 
#### **7. Two-Way Binding (ngModel)**
- Search input: `[(ngModel)]="searchTerm"`
- Price range (min): `[(ngModel)]="minPrice"`
- Price range (max): `[(ngModel)]="maxPrice"`
- Sort order dropdown: `[(ngModel)]="selectedSortOrder"`
- "In Stock Only" checkbox: `[(ngModel)]="showInStockOnly"`
 
### Expected Implementation:
 
**Component Properties:**
- Create properties for: totalProducts, searchTerm, activeCategory
- Property binding variables: searchPlaceholder, resetButtonText, categoryIconPath
- Class binding flags: isFilterActive, isPanelExpanded, hasResults, isLoading
- Two-way binding properties: minPrice, maxPrice, selectedSortOrder, showInStockOnly
- Arrays: categories (All, Electronics, Accessories, Audio), sortOptions
- Input: products array from parent
- Output: filterChanged event emitter
 
**Component Methods:**
- `onSearchChange()` - Handle search input changes
- `selectCategory()` - Handle category selection
- `clearAllFilters()` - Reset all filters to default
- `onPriceRangeChange()` - Handle price slider changes
- `togglePanel()` - Toggle filter panel expansion
- `onSortChange()` - Handle sort dropdown changes
- `getCategoryColor()` - Return color based on category
 
**Template Structure:**
- Filter header showing counts and active filters
- Search input with two-way binding and property binding
- Category buttons with event binding, class binding, and style binding
- Price range sliders with two-way binding
- Sort dropdown with two-way binding
- "In Stock Only" checkbox with two-way binding
- Clear filters button with conditional disabled state
 
---
 
## Component 2: CustomerProfileComponent
 
This component manages customer information and preferences.
 
### Features to Implement:
 
#### **1. String Interpolation**
- Display customer name: `{{customer.firstName}} {{customer.lastName}}`
- Show email: `{{customer.email}}`
- Display membership level: `{{customer.membershipLevel}}`
- Show points: `{{customer.loyaltyPoints}} points`
- Display join date: `{{customer.joinDate | date:'fullDate'}}`
- Show total orders: `{{customer.totalOrders}}`
 
#### **2. Property Binding**
- Profile image: `[src]="customer.profileImageUrl || defaultProfileImage"`
- Email input type: `[type]="showEmailAsText ? 'text' : 'email'"`
- Save button disabled state: `[disabled]="!isFormValid()"`
- Input maxlength: `[maxlength]="50"`
 
#### **3. Attribute Binding**
- Required field indicator: `[attr.aria-required]="true"`
- Role attribute: `[attr.role]="'form'"`
- Data attributes: `[attr.data-customer-id]="customer.id"`
 
#### **4. Class Binding**
- Premium member badge: `[class.premium-member]="customer.membershipLevel === 'Premium'"`
- Form validation: `[class.invalid]="!isFormValid()"`
- Profile complete indicator: `[class.profile-complete]="isProfileComplete"`
- Edit mode: `[class.edit-mode]="isEditMode"`
- Multiple classes with ngClass:
  ```html
  [ngClass]="{
    'vip-customer': customer.loyaltyPoints > 1000,
    'new-customer': customer.totalOrders < 5,
    'active-member': customer.isActive
  }"
  ```
 
#### **5. Style Binding**
- Badge color based on membership: `[style.color]="getMembershipColor()"`
- Progress bar width: `[style.width.%]="(customer.loyaltyPoints / 2000) * 100"`
- Font weight for name: `[style.font-weight]="isEditMode ? 'bold' : 'normal'"`
- Dynamic styles with ngStyle:
  ```html
  [ngStyle]="{
    'background-color': customer.membershipLevel === 'Premium' ? 'gold' : 'silver',
    'border': '2px solid ' + getMembershipColor(),
    'padding': '15px'
  }"
  ```
 
#### **6. Event Binding**
- Edit button: `(click)="toggleEditMode()"`
- Save changes: `(click)="saveProfile()"`
- Cancel edit: `(click)="cancelEdit()"`
- Upload photo: `(change)="onPhotoUpload($event)"`
- Input validation: `(blur)="validateField($event)"`
- Newsletter toggle: `(change)="updateNewsletterPreference($event)"`
 
#### **7. Two-Way Binding (ngModel)**
- First name: `[(ngModel)]="customer.firstName"`
- Last name: `[(ngModel)]="customer.lastName"`
- Email: `[(ngModel)]="customer.email"`
- Phone: `[(ngModel)]="customer.phone"`
- Address: `[(ngModel)]="customer.address"`
- Newsletter subscription: `[(ngModel)]="customer.subscribeNewsletter"`
- Preferred category: `[(ngModel)]="customer.preferredCategory"`
 
### Expected Implementation:
 
**Customer Interface:**
Create a Customer interface with properties: id, firstName, lastName, email, phone, address, membershipLevel, loyaltyPoints, totalOrders, joinDate, profileImageUrl, isActive, subscribeNewsletter, preferredCategory
 
**Component Properties:**
- customer object with sample data (John Doe, Premium member, 1250 points, 15 orders)
- defaultProfileImage path
- showEmailAsText flag
- isEditMode flag (default: false)
- isProfileComplete flag
- originalCustomer backup for cancel functionality
- categories array: ['Electronics', 'Accessories', 'Audio', 'Computers']
 
**Component Methods:**
- `isFormValid()` - Validate firstName, lastName, email format
- `getMembershipColor()` - Return color based on membership level (Premium: gold, Gold: orange, Silver: silver, Bronze: #CD7F32)
- `toggleEditMode()` - Switch between view and edit modes, backup original data
- `saveProfile()` - Persist changes and exit edit mode
- `cancelEdit()` - Restore original values and exit edit mode
- `onPhotoUpload()` - Handle profile photo upload
- `validateField()` - Validate individual fields on blur
- `updateNewsletterPreference()` - Update newsletter subscription
 
**Template Structure:**
- Profile header with customer name, membership badge (ngClass for VIP/new customer)
- Profile image with fallback to default
- Customer stats section (email, points, orders, join date)
- Loyalty progress bar with dynamic width based on points
- Edit form with all fields (disabled when not in edit mode)
- Form fields: firstName, lastName, email, phone, address, preferredCategory, newsletter checkbox
- Photo upload input (only visible in edit mode)
- Action buttons: Edit Profile, Save Changes (disabled if invalid), Cancel
 
---
 
## Integration Requirements
 
### 1. Update ShoppingCartComponent
- Add ProductFilterComponent at the top
- Pass products to filter component
- Listen to filterChanged event
- Apply filters to ProductListComponent
 
### 2. Update AppComponent
- Add CustomerProfileComponent in a sidebar or modal
- Pass checkout data to update customer stats
- Update loyalty points after successful checkout
 
### 3. Data Flow
```
AppComponent
  ├─> products → ShoppingCartComponent
  │                ├─> ProductFilterComponent
  │                │     └─> filterChanged event
  │                └─> filteredProducts → ProductListComponent
  │
  └─> CustomerProfileComponent
        ├─> Update from checkout events
        └─> Save profile changes
```
 
---
 
 
## Expected Functionality
 
### ProductFilterComponent:
1. Type in search → products filter in real-time
2. Select category → shows only that category
3. Adjust price sliders → shows products in range
4. Toggle "In Stock" → hides out-of-stock items
5. Change sort order → products reorder
6. Click "Clear Filters" → reset to default state
 
### CustomerProfileComponent:
1. Display customer information (read-only mode)
2. Click "Edit Profile" → enable form fields
3. Modify fields → Save button enables/disables based on validation
4. Click "Save" → persist changes and exit edit mode
5. Click "Cancel" → revert to original values
6. Upload photo → preview and update profile image
7. Toggle newsletter → update preference immediately
 
---
 
## CSS Requirements
 
Create styles for:
- `.active-filter`, `.clear-visible`, `.expanded`
- `.premium-member`, `.vip-customer`, `.new-customer`
- `.highlight`, `.no-results`, `.loading`
- `.edit-mode`, `.disabled`, `.invalid`
- `.profile-complete`, `.progress-bar`, `.progress-fill`

---

# Part 3: Structural Directives Challenge
 
## Problem Statement - Directive Mastery
 
Enhance the Smart Shopping Cart System with **conditional rendering, loops, and custom directives** using Angular's new control flow syntax (@if, @for, @switch) and traditional structural directives. You'll also create custom attribute directives to add special behaviors.
 
---
 
## Angular 21 Control Flow Syntax (NEW)
 
### Component: OrderHistoryComponent
 
Create a new component to display customer order history with advanced conditional rendering.
 
#### **1. @if Directive - Conditional Rendering**
 
**Scenarios to Implement:**
- Display loading state when isLoading is true
- Show orders container when orders array has items
- Display checkout button only for authenticated users
- Show premium banner for Premium membership level
- Display stock availability when product.stock > 0
- Implement nested conditions for cart discount eligibility
 
#### **2. @else Directive - Alternative Rendering**
 
**Scenarios to Implement:**
- Display orders list when available, otherwise show empty state with "Start shopping" button
- Show user dashboard for authenticated users, otherwise show login prompt
- Display "Add to Cart" button when in stock, otherwise show "Out of Stock" with notify option
- Show payment status: "Paid" badge or "Payment Pending" with pay button
 
#### **3. @else if - Multiple Conditions**
 
**Scenarios to Implement:**
- **Order status display**: Show different messages for delivered, shipped, processing, cancelled, or pending
- **Membership level benefits**: Display different benefit messages for Premium, Gold, Silver, or regular members
- **Cart total discount tiers**: Show discount messages based on cart total ($500+, $200+, $100+, or below)
- **Product rating display**: Show rating labels (Excellent 5 stars, Good 4 stars, Average 3 stars, Poor 2 stars, or Needs Improvement 1 star)
 
#### **4. @for Directive - Iteration**
 
**Scenarios to Implement:**
- **Basic loop**: Iterate through orders with track by order.id
- **Empty state**: Display orders or show "no orders" message with @empty
- **Loop with index and count**: Show product position (e.g., "1 of 10")
- **Loop with first, last, even, odd**: Apply different styles to first, last, even, and odd items
- **Nested loops**: Iterate through categories and their products
- **Complex loop**: Combine loops with conditional rendering (show "Latest" badge on first order, discount percentages, conditional action buttons)
 
#### **5. @switch Directive - Multiple Choice Rendering**
 
**Scenarios to Implement:**
- **Payment method display**: Show different content for credit-card, debit-card, paypal, cash-on-delivery, with default for unknown methods
- **Shipping method**: Display different content for express, standard, overnight, pickup, with tracking info and estimated delivery
- **Order status actions**: Show different action buttons based on status (pending: cancel/modify, processing: contact support, shipped: track/update address, delivered: rate/reorder/return, cancelled: refund status)
- **Product category badges**: Display category-specific labels for Electronics, Accessories, Audio, Computers, with fallback for other categories
 
---
