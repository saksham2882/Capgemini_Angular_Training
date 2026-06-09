import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service';
import { Employee } from '../employee'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      {
        next: (data) => {
          this.employees = data;
          this.errorMessage = '';
          console.log('Employees loaded successfully:', this.employees);
        },
        error: (err) => {
          console.error('Error fetching employees:', err);
          this.errorMessage = 'Failed to load employees. Please try again later.';
        }
      }
    );
  }

  viewEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/employee-details', id]);
    }
  }

  editEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/update-employee', id]);
    }
  }

  deleteEmployee(id: number | undefined): void {
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          console.log('Employee deleted successfully, ID:', id);
          this.loadEmployees();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.errorMessage = 'Failed to delete employee. Please try again later.';
        }
      });
    }
  }
}