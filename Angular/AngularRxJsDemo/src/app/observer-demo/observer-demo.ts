import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observer-demo',
  imports: [],
  templateUrl: './observer-demo.html',
  styleUrl: './observer-demo.css',
})
export class ObserverDemo {

  private intervalId: any;
  private fruitSubscription: any;

  callFun() {
    console.log("to Run Demo without Observer");

    let fruits = ["Apple", "Banana", "Mango", "Grapes", "Pineapple", "Strawberry", "Watermelon", "Peach", "Cherry", "Pear"];

    // without Observable
    console.log("Fruits List:");
    let index = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (index < fruits.length) {
        console.log(fruits[index]);
        index++;
      }
      else {
        console.log("All fruits have been printed.");
        clearInterval(this.intervalId);
      }
    }, 1000);  // printing one fruit every 1 second
  }

  stopFun() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("Manually Stopped printing fruits.");

      this.intervalId = null;
    }
    else {
      console.log("No active fruit printing to stop.");
    }
  }


  
  callFunWithObserver() {
    console.log("to Run Demo with Observer");

    let fruits = ["Apple", "Banana", "Mango", "Grapes", "Pineapple", "Strawberry", "Watermelon", "Peach", "Cherry", "Pear"];

    const fruitObservable = new Observable<string>((observer) => {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < fruits.length) {
          observer.next(fruits[index]);
          index++;
        } 
        else {
          observer.complete();
          clearInterval(intervalId);
        }
      }, 1000);        // emitting one fruit every 1 second

      // Cleanup function to clear the interval when unsubscribed
      return () => {
        clearInterval(intervalId);
        console.log("Observable unsubscribed, interval cleared.");
      };
    });

    this.fruitSubscription = fruitObservable.subscribe({
      next: (fruit) => console.log(fruit),
      error: (err) => console.error("Error occurred: ", err),
      complete: () => console.log("All fruits have been emitted."),
    });

    // Store the subscription reference for later unsubscription
  }


  stopFunWithObserver() {
    // Assuming you have a reference to the subscription
    if (this.fruitSubscription) {
      this.fruitSubscription.unsubscribe();
      console.log("Unsubscribed from fruit observable manually.");
    }
    else {
      console.log("No active subscription to unsubscribe from.");
    }
  }
}