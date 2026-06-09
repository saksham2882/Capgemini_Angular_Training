import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// for @if directive no need to import CommonModule as it is already imported in the app.module.ts file and it is available globally in the application.
// import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-directives',
  imports: [FormsModule, CommonModule],
  templateUrl: './demo-directives.html',
  styleUrl: './demo-directives.css',
})

export class DemoDirectives {

  cities: string[] = ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur'];

  choice = "Mumbai";

  cssObject = {
    'color': 'purple',
    'font-size': '20px',
    'margin': '10px',
    'padding': '5px',
    'border': '1px solid black',
    'font-weight': 'bold'
  }
}
