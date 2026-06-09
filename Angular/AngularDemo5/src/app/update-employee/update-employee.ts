import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  imports: [FormsModule],
  templateUrl: './update-employee.html',
  styleUrl: './update-employee.css',
})
export class UpdateEmployee implements OnInit {
  employeeId!: number;
  employee: Employee = {
    firstName: '',
    lastName: '',
    emailId: ''
  };
  errorMessage: string = '';
  loading: boolean = true; 

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.loadEmployee();
    } else {
      this.errorMessage = 'Invalid Employee ID';
      this.loading = false;
    }
  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
        this.errorMessage = '';
        console.log('Employee loaded for update:', this.employee);
      },
      error: (err) => {
        console.error('Error fetching employee for update:', err);
        this.errorMessage = 'Failed to load employee details for update.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
      next: (updatedData) => {
        console.log('Employee updated successfully:', updatedData);
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Error updating employee:', err);
        this.errorMessage = 'Failed to update employee. Please try again.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
