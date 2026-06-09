import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { EmployeeDetails } from './employee-details';

describe('EmployeeDetails', () => {
  let component: EmployeeDetails;
  let fixture: ComponentFixture<EmployeeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetails],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
