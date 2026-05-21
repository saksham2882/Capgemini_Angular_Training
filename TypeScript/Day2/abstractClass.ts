// abstract class - abstract class is used to define common behaviors for derived classes to extend.
// abstract class can not be instantiated directly, but can be used as a base class for other classes.

abstract class BankService {
    abstract calculateInterest(amount: number): number;                  //abstract method - must be implemented by derived classes
}

class SavingsAccount extends BankService {
    calculateInterest(amount: number): number {
        return amount * 0.05;               //5% interest for savings account
    }
}

class CurrentAccount extends BankService {
    calculateInterest(amount: number): number {
        return amount * 0.02;               //2% interest for current account
    }
}

// const bankservice= new BankService();    //Error: Cannot create an instance of an abstract class.

// creating instances of derived classes
const savings = new SavingsAccount();
const current = new CurrentAccount();

// calculating interest for both accounts
const savingsInterest = savings.calculateInterest(1000);
const currentInterest = current.calculateInterest(1000);

console.log(`Interest for Savings Account: ${savingsInterest}`);
console.log(`Interest for Current Account: ${currentInterest}`);