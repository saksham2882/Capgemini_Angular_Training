import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //EmployeeAngularApp

  private baseUrl = 'http://localhost:8090/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    console.log('Fetching employees from:', this.baseUrl);
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    console.log('Fetching employee with ID:', id, 'from URL:', url);
    return this.http.get<Employee>(url);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    console.log('Updating employee with ID:', id, 'at URL:', url, 'with data:', employee);
    return this.http.put<Employee>(url, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    console.log('Deleting employee with ID:', id, 'from URL:', url);
    return this.http.delete<void>(url);
  }
}