import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverDemo } from './observer-demo';

describe('ObserverDemo', () => {
  let component: ObserverDemo;
  let fixture: ComponentFixture<ObserverDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObserverDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ObserverDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
