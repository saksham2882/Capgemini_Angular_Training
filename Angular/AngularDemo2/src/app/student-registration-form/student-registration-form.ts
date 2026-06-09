import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from './Student';

@Component({
  selector: 'app-student-registration-form',
  imports: [FormsModule],
  templateUrl: './student-registration-form.html',
  styleUrl: './student-registration-form.css',
})
export class StudentRegistrationForm {

  student: Student = new Student('', '', '', 0);

  onSubmit(data: any) {
    console.log(data.value);
    alert('Student Registered Successfully!');
  }
}
