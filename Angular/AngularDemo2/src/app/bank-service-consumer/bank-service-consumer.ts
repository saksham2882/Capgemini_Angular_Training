import { Component, inject } from '@angular/core';
import { BankService } from '../bank-service';
import { Inject } from '@angular/core';
import { BankAccount } from '../BankAccount';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-service-consumer',
  imports: [FormsModule],
  templateUrl: './bank-service-consumer.html',
  styleUrl: './bank-service-consumer.css',
})
export class BankServiceConsumer {

  // ----------- way 1 ----------------
  // inject the BankService into the component's constructor
  // constructor(private bankService: BankService)  {}

  // ----------- way 2 ---------------
  // or you can also inject the service using the @Inject decorator
  // constructor(@Inject(BankService) private bankService: BankService)  {}

  // ----------- way 3 ---------------
  // or using inject function
  private bankService = inject(BankService);

  // Now you can use the bankService instance to call methods and access properties of the BankService.

  // use the bankService to create a new account
  accounts: BankAccount[] = this.bankService.getAccounts();

  accountNumber: string = '';
  initialBalance: number = 0;

  addAccount() {
    const newAccount = this.bankService.createAccount(this.accountNumber, this.initialBalance);
  }

  withdrawAccountNumber: string = '';
  withdrawAmount: number = 0;

  withdraw() {
    this.bankService.withdraw(this.withdrawAccountNumber, this.withdrawAmount);
  }

  depositAccountNumber: string = '';
  depositAmount: number = 0;

  deposit() {
    this.bankService.deposit(this.depositAccountNumber, this.depositAmount);
  }

  transferFromAccountNumber: string = '';
  transferToAccountNumber: string = '';
  transferAmount: number = 0;

  transfer() {
    this.bankService.transfer(this.transferFromAccountNumber, this.transferToAccountNumber, this.transferAmount);
  }
}