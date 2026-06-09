import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from "../reverse-pipe";
import { CustomPipe1 } from './CustomPipe1';
import { CustomPipe2 } from '../custom-pipe2-pipe';

@Component({
  selector: 'app-demo-pipes',
  imports: [CommonModule, ReversePipe, CustomPipe1, CustomPipe2],
  templateUrl: './demo-pipes.html',
  styleUrl: './demo-pipes.css',
})

export class DemoPipes {

  cities: string[] = ['bangalore', 'chennai', 'Delhi', 'Mumbai', 'Hyderabad', 'pune', 'Kolkata', 'Ahmedabad', 'SURAT', 'Jaipur'];


  // for JSON Pipe
  Employee = {
    id: 101,
    name: 'John Doe',
    age: 30,
    department: 'IT',
    address: {
      street: '123 Main St',
      city: 'AnyTown',
      state: 'CA',
      zip: '12345'
    }
  };


  // for Date Pipe
  currentDate: Date = new Date();

  // for Decimal Pipe
  price: number = 1234.5678;

  // for Percent Pipe
  discount: number = 0.25; // 25% discount

  //for currency Pipe
  salary: number = 50000;

  //slice pipe
  message: string = 'Hello, welcome to Angular Pipes!';


  //async pipe
  dataPromise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded asynchronously!');
    }, 2000);
  });

  randomMsg = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello")
    }, 4000)
  })
}
