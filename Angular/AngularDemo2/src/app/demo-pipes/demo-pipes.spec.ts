import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPipes } from './demo-pipes';

describe('DemoPipes', () => {
  let component: DemoPipes;
  let fixture: ComponentFixture<DemoPipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoPipes],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
