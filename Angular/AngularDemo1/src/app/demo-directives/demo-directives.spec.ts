import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDirectives } from './demo-directives';

describe('DemoDirectives', () => {
  let component: DemoDirectives;
  let fixture: ComponentFixture<DemoDirectives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoDirectives],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoDirectives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
