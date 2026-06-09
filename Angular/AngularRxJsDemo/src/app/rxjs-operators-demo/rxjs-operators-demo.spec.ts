import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxJsOperatorsDemo } from './rxjs-operators-demo';

describe('RxjsOperatorsDemo', () => {
  let component: RxJsOperatorsDemo;
  let fixture: ComponentFixture<RxJsOperatorsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxJsOperatorsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(RxJsOperatorsDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
