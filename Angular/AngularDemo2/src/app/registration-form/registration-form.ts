import { Component, ViewChild } from '@angular/core';
import { Product } from './Product';
import { JsonPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  imports: [FormsModule, JsonPipe],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css',
})
export class RegistrationForm {
  name: any;
  price: any;
  description: any;
  stock: any;

  product: Product = new Product("", 0, "", 0);

  onSubmit(data: any) {
    console.log(data.value);     // ngSubmit will pass the form data as an argument to the onSubmit method, and we can access the form data using the value property of the data object.
    // console.log(this.product); // without using ngSubmit we can access the form data using the product object which is bound to the form using ngModel.

    // to show on Template
    this.product.name = data.value.name;
    this.product.price = data.value.price;
    this.product.description = data.value.description;
    this.product.stock = data.value.stock;
  }
}