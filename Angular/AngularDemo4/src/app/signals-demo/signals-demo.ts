import { Component, computed, effect, signal } from '@angular/core';
import { SignalsConsumer } from '../signals-consumer/signals-consumer';
@Component({
  selector: 'app-signals-demo',
  imports: [SignalsConsumer],
  templateUrl: './signals-demo.html',
  styleUrl: './signals-demo.css',
})
export class SignalsDemo {

  counter = signal(0);

  increment() {
    this.counter.update(value => value + 1);
  }

  constructor() {
    // effect is used to run a function whenever the value of a signal changes.
    // It allows you to react to changes in the signal's value and perform side effects accordingly.
    effect(() => {
      console.log('Counter value changed:', this.counter());
      // perform any function or side effect whenever the counter value changes
      this.functionToRunOnCounterChange(this.counter());
    });
  }

  functionToRunOnCounterChange(counterValue: number) {
    if (counterValue % 5 === 0) {
      console.log('Counter value is now a multiple of 5:', counterValue);

      // this.counter.set(counterValue + 1);           // update the counter value to the next number if it is a multiple of 5

      // computed signal are read-only , so we cannot set a value to a computed signal directly.
      // this.doubleCounter.set(counterValue * 2);     // gives error as computed signal are read-only
    }
  }

  ngOnInit() {
    console.log('Counter value:', this.counter());
  }


  // ================= computed signals =====================
  // computed() used to create a derived signal that automatically updates whenever the signals it depends on change.
  // It allows you to create signals that are computed based on other signals,
  // and it will automatically re-evaluate whenever the dependent signals change.
  doubleCounter = computed(() => {
    if (this.counter() % 2 === 0) {
      console.log('Counter value is even:', this.counter());
    }
    return this.counter() * 2;
  });


  // To pass signal data to consumer component
  currentUser = signal({ name: 'John Doe', age: 30 });
  currentStatus = signal('active');

  toggleStatus() {
    this.currentStatus.update(status => status === 'active' ? 'idle' : 'active');
    this.currentUser.update(user => ({ ...user, age: user.age + 1 }));        // Update user age as an example
    console.log('Status toggled to:', this.currentStatus());
    console.log('User updated to:', this.currentUser());
  }
}