import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeForm } from './employee-form/employee-form';
import { DynamicForm } from './dynamic-form/dynamic-form';

@Component({
  selector: 'app-root',
  imports: [EmployeeForm, DynamicForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularDemo3');
}
