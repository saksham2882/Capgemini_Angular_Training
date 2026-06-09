import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankServiceConsumer } from './bank-service-consumer';

describe('BankServiceConsumer', () => {
  let component: BankServiceConsumer;
  let fixture: ComponentFixture<BankServiceConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankServiceConsumer],
    }).compileComponents();

    fixture = TestBed.createComponent(BankServiceConsumer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
