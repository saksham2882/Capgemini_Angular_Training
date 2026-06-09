import { Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { AddEmployee } from './add-employee/add-employee';
import { UpdateEmployee } from './update-employee/update-employee';
import { EmployeeDetails } from './employee-details/employee-details';

export const routes: Routes = [
    { path: '', component: EmployeeList },
    { path: 'employees', component: EmployeeList },
    { path: 'add-employee', component: AddEmployee },
    { path: 'update-employee/:id', component: UpdateEmployee },
    { path: 'employee-details/:id', component: EmployeeDetails }
]