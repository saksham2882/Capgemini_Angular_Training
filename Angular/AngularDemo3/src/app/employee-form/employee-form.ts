import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm {

  // FormControl is class is added to one single form control element.
  // It tracks the value and validation status of that form control element.
  // It is used to create a form control instance in the component class
  // and bind it to a form control element in the template using the formControl directive.

  // Here we are creating a form control instance named 'name'
  // and initializing it with the value 'John Doe'.

  // name= new FormControl('John Doe');
  // email= new FormControl('john.doe@example.com');
  // department= new FormControl('Engineering');
  // city= new FormControl('New York');
  // gender= new FormControl('Male');
  // updateName() {
  //   this.name.setValue('Jane Smith');
  // }


  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];


  // FormGroup is a class that is used to group multiple form controls together.
  // employeeForm= new FormGroup({
  //   name: new FormControl('John Doe'),
  //   email: new FormControl('john.doe@example.com'),
  //   department: new FormControl('Engineering'),
  //   city: new FormControl('New York'),
  //   gender: new FormControl('Male')
  // });




  // ================ FormGroup with validations ===================
  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('john.doe@example.com', [Validators.required, Validators.email]),
    department: new FormControl('Engineering', [Validators.required]),
    city: new FormControl('New York', [Validators.required]),
    gender: new FormControl('Male', [Validators.required])
  });


  submitForm() {
    console.log('Employee Name:', this.employeeForm.value.name);
    console.log('Employee Email:', this.employeeForm.value.email);
    console.log('Employee Department:', this.employeeForm.value.department);
    console.log('Employee City:', this.employeeForm.value.city);
    console.log('Employee Gender:', this.employeeForm.value.gender);
    alert("Form Submitted Successfully!");
  }


  // ================ Nested FormGroup =================
  // Nested FormGroup is a class that is used to group multiple form controls together, and it can also contain other FormGroup instances.
  employeeForm2 = new FormGroup({
    name: new FormControl('John Doe', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('john.doe@example.com'),
    address: new FormGroup({
      street: new FormControl('123 Main St'),
      city: new FormControl('New York'),
      state: new FormControl('NY'),
      zip: new FormControl('10001')
    }),
  });

  submitForm2() {
    console.log('Employee Name:', this.employeeForm2.value.name);
    console.log('Employee Email:', this.employeeForm2.value.email);
    console.log('Employee Address:', this.employeeForm2.value.address?.city);
    console.log('Employee State:', this.employeeForm2.value.address?.state);
    console.log('Employee Zip:', this.employeeForm2.value.address?.zip);
    console.log('Employee Street:', this.employeeForm2.value.address?.street);
    alert("Form Submitted Successfully!");
  }



  // ==================== using FormBuilder to create a form group =================================

  // ------------- Custom Validator ---------------
  // custom validator function to check if the name starts with 'J'
  nameStartsWithJ(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    return value.startsWith('J') ? null : { 'nameStartsWithJ': true };
  }

  private formBuilder: FormBuilder = new FormBuilder();

  employeeForm3 = this.formBuilder.group({
    name: ['John Doe', [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.nameStartsWithJ.bind(this)]],
    email: ['', [Validators.required, Validators.email]],
    department: ['Engineering', [Validators.required]],
    address: this.formBuilder.group({
      street: ['123 Main St'],
      city: ['New York'],
      state: ['NY'],
      zip: ['10001']
    })
  });

  submitForm3() {
    console.log('Employee Name:', this.employeeForm3.value.name);
    console.log('Employee Email:', this.employeeForm3.value.email);
    console.log('Employee Department:', this.employeeForm3.value.department);
    console.log('Employee City:', this.employeeForm3.value.address?.city);
    console.log('Employee State:', this.employeeForm3.value.address?.state);
    console.log('Employee Zip:', this.employeeForm3.value.address?.zip);
    console.log('Employee Street:', this.employeeForm3.value.address?.street);
    alert("Form Submitted Successfully!");
  }
}  