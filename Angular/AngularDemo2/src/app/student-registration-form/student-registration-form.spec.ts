import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegistrationForm } from './student-registration-form';

describe('StudentRegistrationForm', () => {
  let component: StudentRegistrationForm;
  let fixture: ComponentFixture<StudentRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRegistrationForm],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRegistrationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
