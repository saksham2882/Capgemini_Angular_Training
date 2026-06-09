import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css',
})
export class DynamicForm {

  // dynamic form for adding array of ProfileDetails

  // array of profileFormGroups
  profiles: string[] = ['Developer', 'Designer', 'Manager', 'Tester'];
  country: string[] = ['India', 'Japan', 'USA', 'South Korea', 'UK'];


  profileFormGroups: FormGroup[] = [];

  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(`^[0-9]{10}$`)]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    profile: new FormControl('', Validators.required)
  });


  ngOnInit() {
    this.profileFormGroups.push(this.profileForm);
  }

  addProfile() {
    this.profileFormGroups.push(new FormGroup({
      username: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(`^[0-9]{10}$`)]),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required)
    }));
  }

  removeProfile(index: number) {
    if (index >= 0 && index < this.profileFormGroups.length) {
      this.profileFormGroups.splice(index, 1);
    }
    else {
      alert('Can not remove profile at index ' + index);
    }
  }

  submitProfiles() {
    console.log(this.profileFormGroups.map(group => group.value));
  }
}