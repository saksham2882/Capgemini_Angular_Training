import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetection2 } from './change-detection2';

describe('ChangeDetection2', () => {
  let component: ChangeDetection2;
  let fixture: ComponentFixture<ChangeDetection2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeDetection2],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeDetection2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
