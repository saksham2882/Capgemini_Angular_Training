import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import id from '@angular/common/locales/extra/id';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {

  employeeId: number | undefined;
  employee: Employee | null = null;
  errorMessage: string = '';
  loading: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // Extract employee ID from route parameters
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.loadEmployeeDetails(this.employeeId);
    }
  }

  loadEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe(
      {
        next: (data) => {
          this.employee = data;
          this.loading = false;
          this.errorMessage = '';
          console.log('Employee details loaded successfully:', this.employee);
        },
        error: (err) => {
          console.error('Error fetching employee details:', err);
          this.errorMessage = 'Failed to load employee details. Please try again later.';
          this.loading = false;
        }
      }
    );
  }

  editEmployee(): void {
    if (this.employeeId !== undefined) {
      this.router.navigate(['/update-employee', this.employeeId]);
    }
  }

  deleteEmployee(): void {
    if (this.employeeId !== undefined) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe({
        next: () => {
          console.log('Employee deleted successfully, ID:', this.employeeId);
          this.goBack();
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          this.errorMessage = 'Failed to delete employee. Please try again later.';
        }
      });
    }
  }

  goBack(): void {
    console.log('Navigating back to employee list');
    this.router.navigate(['/employees']);
  }
}