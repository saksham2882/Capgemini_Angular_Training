import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DiscountInfo } from '../../../model/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discount-panel',
  imports: [FormsModule],
  templateUrl: './discount-panel.html',
  styleUrl: './discount-panel.css',
})

export class DiscountPanelComponent {

  @Input() cartTotal = 0;

  @Input() discountCode = '';

  @Output()
  discountCodeChange = new EventEmitter<string>();

  @Output()
  discountApplied = new EventEmitter<DiscountInfo>();
 
  firstTimeUser = true;

  applyDiscount() {
    this.discountCodeChange.emit(this.discountCode);

    let discount: DiscountInfo = {
      code: this.discountCode,
      percentage: 0,
      isValid: false,
    };

    if (this.discountCode === 'SAVE10') {
      discount = {
        code: 'SAVE10',
        percentage: 10,
        isValid: true,
      };
      alert("10% Discount Applied")
    }

    else if (this.discountCode === 'SAVE20' && this.cartTotal > 100) {
      discount = {
        code: 'SAVE20',
        percentage: 20,
        isValid: true,
      };
      alert("20% Discount Applied")
    }

    else if (this.discountCode === 'FIRST25' && this.firstTimeUser) {
      discount = {
        code: 'FIRST25',
        percentage: 25,
        isValid: true,
      };

      this.firstTimeUser = false;
      alert("25% Discount Applied")
    }
    else {
      alert('Invalid Discount Code');
    }

    this.discountApplied.emit(discount);
  }
}