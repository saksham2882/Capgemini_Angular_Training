import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: '[app-about]',
  imports: [NgClass, NgStyle, FormsModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})

export class About {

  currentCustomer = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, AnyTown, USA'
  };

  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  // property Binding
  imgPath = '/favicon.ico';

  // Attribute Binding
  isButtonDisabled = true;

  updateButton() {
    this.isButtonDisabled = !this.isButtonDisabled;
    const button = document.getElementById('toggleButton');
    if (button) {
      button.innerHTML = this.isButtonDisabled ? 'Enable Button' : 'Disable Button';
    }
  }

  // class Binding
  isDivVisible = false;
  toggleDivVisibility() {
    this.isDivVisible = !this.isDivVisible;
  }

  // style Binding
  btnStyle = 'margin: 10px; padding: 10px; background-color: green; border: none; cursor: pointer;';



  // event Binding  
  inputValue = '**';
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
    console.log('Input value:', input.value);
  }

  // Two way Binding
  username = 'Test User';
  userCity = 'New York';
}