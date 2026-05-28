import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../model/model';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})

export class ProductFilter {

  @Input() products: Product[] = [];

  @Output() filterChanged = new EventEmitter<Product[]>();

  searchText = '';
  currCategory = '';
  searchPlaceholder = 'Search products';
  resetButtonText = 'Clear Filters';
  categoryIcon = '/favicon.ico'

  isFilterOn = false;
  isPanelExpanded = true;

  minPrice = 0;
  maxPrice = 5000;
  selectedSortOrder = 'default';
  showInStockOnly = false;
  categories = ['All', 'Laptop', 'Mobile', 'Accessories', 'Electronics'];
  sortOptions = ['default', 'low-to-high', 'high-to-low', 'A-Z'];

  totalProducts() {
    return this.products.length;
  }

  filteredProducts() {
    return this.applyFilters();
  }

  onSearchChange(event: Event) {
    this.applyAndEmit();
  }

  selectedCategory(category: string) {
    this.currCategory = category === 'All' ? '' : category;
    this.applyAndEmit();
  }

  clearAllFilters() {
    this.searchText = '';
    this.currCategory = '';
    this.minPrice = 0;
    this.maxPrice = 5000;
    this.selectedSortOrder = 'default';
    this.showInStockOnly = false;
    this.applyAndEmit();
  }

  onPriceRangeChange(event: Event) {
    this.applyAndEmit();
  }

  togglePanel() {
    this.isPanelExpanded = !this.isPanelExpanded;
  }

  onSortChange(event: Event) {
    this.applyAndEmit();
  }

  getCategoryColor(category: string) {
    switch (category) {
      case 'Laptop': return 'blue';
      case 'Mobile': return 'purple';
      case 'Accessories': return 'orange';
      case 'Electronics': return 'green';
      default: return 'black';
    }
  }

  applyFilters(): Product[] {
    let filtered = [...this.products];

    if (this.searchText.trim()) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    if (this.currCategory) {
      filtered = filtered.filter((p) => p.category === this.currCategory);
    }
    filtered = filtered.filter((p) => p.price >= this.minPrice && p.price <= this.maxPrice);

    if (this.showInStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    switch (this.selectedSortOrder) {
      case 'low-to-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'A-Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    this.isFilterOn = this.searchText.length > 0 || this.currCategory.length > 0 || this.showInStockOnly;
    return filtered;
  }

  applyAndEmit() {
    const filteredProducts = this.applyFilters();
    this.filterChanged.emit(filteredProducts);
  }
}
