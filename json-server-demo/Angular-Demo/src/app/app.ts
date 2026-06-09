import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private apiUrl = 'http://localhost:3000/employees';

  employees: Employee[] = [];
  employeeId: number | string | null = null;
  selectedEmployee: Employee | null = null;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get<Employee[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getEmployeeById(id: number | string | null) {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedEmployee =  data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
