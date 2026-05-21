## OBJECTIVE:
Build a Product Inventory Management System using HTML, CSS, and JavaScript that demonstrates modern JavaScript features and concepts.
 
## BACKGROUND:
You are tasked with creating a web-based inventory management system for a retail store. The system should allow users to manage products, track inventory levels, filter and search products, and handle asynchronous data operations.
 
## FUNCTIONAL REQUIREMENTS:
 
### 1. PRODUCT MANAGEMENT (20 minutes)
   - Create a Product class with the following:
     * Properties: id, name, category, price, quantity, lastUpdated
     * Static method to generate unique product IDs
     * Instance methods: updateStock(), applyDiscount(), getDetails()
     * Use private fields/closures for sensitive data (e.g., cost price) 
   - Implement product operations:
     * Add new products
     * Update product quantity
     * Remove products from inventory
     * Calculate total inventory value
 
### 2. DATA STORAGE & RETRIEVAL (15 minutes)
   - Use Map to store products (key: product ID, value: Product object)
   - Use Set to store unique product categories
   - Implement functions using:
     * Destructuring to extract product properties
     * Spread operator to merge product updates
     * Rest parameters to handle variable arguments
   - Create an async function simulateAPICall() that:
     * Returns a Promise that resolves after 1-2 seconds
     * Simulates fetching product data from a server
     * Use async/await to handle the data loading
 
### 3. FILTERING & SEARCH (10 minutes)
   - Implement filter functionality using:
     * Arrow functions for callback operations
     * Array methods (filter, map, reduce)
     * Template literals for dynamic search queries
   - Create filters for:
     * Products by category
     * Products below minimum stock level
     * Products within a price range
   - Implement a generator function to paginate results (5 items per page)
 
### 4. UI IMPLEMENTATION (10 minutes)
   - HTML Structure:
     * Form to add new products (name, category, price, quantity)
     * Display area for product list
     * Filter controls (category dropdown, price range, search box)
     * Stock alert section for low inventory items
   - CSS Styling:
     * Responsive grid layout for product cards
     * Color-coded stock levels (red: low, yellow: medium, green: high)
     * Hover effects on product cards
     * Loading spinner for async operations
 
### 5. ADVANCED FEATURES (5 minutes)
   - Implement a closure-based counter for tracking total operations
   - Create a callback function for stock alerts
   - Use hoisting demonstration with var vs let/const
   - Implement module pattern (if time permits, separate into modules)
 
## TECHNICAL REQUIREMENTS:
 
JavaScript Concepts to Use:
- Variables: Use let and const appropriately (avoid var except for hoisting demo)
- Data Types: String, Number, Boolean, Object, Array, Map, Set
- Operators: Arithmetic, comparison, logical, ternary
- Control Flow: if/else, switch, for, while, forEach
- Functions: Regular functions, arrow functions, async functions
- Scope: Block scope, function scope, lexical scope
- Closures: Create private variables and factory functions
- Hoisting: Demonstrate difference between var, let, const, and function hoisting
- Callbacks: Use in event handlers and array methods
- Promises: Implement for simulated API calls
- Async/Await: Handle asynchronous data loading
- Template Literals: For dynamic HTML generation and string formatting
- Destructuring: Extract values from objects and arrays
- Spread/Rest: Merge objects, clone arrays, handle variable parameters
- Classes: Define Product class with constructor and methods
- Static Methods: Implement utility methods in classes
- Map/Set: Use for efficient data storage
- Iterators: Implement custom iteration logic
- Generators: Create pagination generator function
 
### SAMPLE DATA STRUCTURE:
 ```javascript
Product Object Example:
{
  id: "PRD001",
  name: "Wireless Mouse",
  category: "Electronics",
  price: 25.99,
  quantity: 50,
  lastUpdated: "2026-05-13"
}
 ```

#### Initial Products (at least 8 products across 3 categories):
- Electronics: Wireless Mouse, USB Cable, Keyboard
- Clothing: T-Shirt, Jeans, Jacket
- Books: JavaScript Guide, HTML Handbook
- Stationery: Notebook, Pen Set
 
### DELIVERABLES:
 
#### 1. HTML File (index.html):
   - Semantic HTML structure
   - Form for adding products
   - Product display grid
   - Filter and search controls
 
#### 2. CSS File (styles.css):
   - Responsive design
   - Product card styling
   - Color-coded stock indicators
   - Loading states
 
#### 3. JavaScript File (app.js):
   - Product class implementation
   - All CRUD operations
   - Async data handling
   - Filter and search logic
   - Event handlers