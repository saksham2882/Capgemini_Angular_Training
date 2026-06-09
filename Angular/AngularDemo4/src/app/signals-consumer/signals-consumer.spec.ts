import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsConsumer } from './signals-consumer';

describe('SignalsConsumer', () => {
  let component: SignalsConsumer;
  let fixture: ComponentFixture<SignalsConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsConsumer],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsConsumer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
