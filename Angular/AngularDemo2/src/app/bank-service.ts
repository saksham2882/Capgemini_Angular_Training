import { Injectable } from '@angular/core';
import { BankAccount } from './BankAccount';


@Injectable({
  // providedIn: 'root' means that the service will be available across application and
  // there will be a single instance of the service (singleton) throughout the application.
  providedIn: 'root',
})
export class BankService {

  constructor() {
  }

  private accounts: BankAccount[] = [];

  getAccounts(): BankAccount[] {
    return this.accounts;
  }

  createAccount(accountNumber: string, initialBalance: number = 1000): BankAccount {
    const account = new BankAccount(accountNumber, initialBalance);
    this.accounts.push(account);
    return account;
  }

  getAccount(accountNumber: string): BankAccount | undefined {
    return this.accounts.find(account => account['accountNumber'] === accountNumber);
  }

  withdraw(accountNumber: string, amount: number): boolean {
    const account = this.getAccount(accountNumber);
    if (account && account['balance'] >= amount) {
      account['balance'] -= amount;
      return true;
    } 
    else {
      alert("Insufficient amount entered!!");
      return false;
    }
  }

  deposit(accountNumber: string, amount: number): boolean {
    const account = this.getAccount(accountNumber);
    if (account) {
      account['balance'] += amount;
      return true;
    }
    return false;
  }

  getBalance(accountNumber: string): number | undefined {
    const account = this.getAccount(accountNumber);
    return account ? account['balance'] : undefined;
  }

  transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): boolean {
    const fromAccount = this.getAccount(fromAccountNumber);
    const toAccount = this.getAccount(toAccountNumber);

    if (fromAccount && toAccount && fromAccount['balance'] >= amount) {
      fromAccount['balance'] -= amount;
      toAccount['balance'] += amount;
      return true;
    }
    else {
      alert("Insufficient amount entered!!");
      return false;
    }
  }

}