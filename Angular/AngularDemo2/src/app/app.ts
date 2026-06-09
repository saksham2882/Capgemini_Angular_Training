import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DemoPipes } from './demo-pipes/demo-pipes';
import { BankServiceConsumer } from './bank-service-consumer/bank-service-consumer';
import { RegistrationForm } from './registration-form/registration-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DemoPipes, BankServiceConsumer, RegistrationForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularDemo2');
}
