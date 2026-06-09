import { Component } from '@angular/core';
import { Observable, from, map, filter, toArray, mergeMap, groupBy, switchMap, takeUntil, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rxjs-operators-demo',
  imports: [],
  templateUrl: './rxjs-operators-demo.html',
  styleUrl: './rxjs-operators-demo.css',
})
export class RxJsOperatorsDemo {
  
  employees = [
    { id: 1, name: 'John Doe', department: 'HR' },
    { id: 2, name: 'Jane Smith', department: 'IT' },
    { id: 3, name: 'Michael Johnson', department: 'Finance' },
    { id: 4, name: 'Emily Davis', department: 'Marketing' },
    { id: 5, name: 'David Wilson', department: 'Sales' },
    { id: 6, name: 'Sarah Brown', department: 'HR' },
    { id: 7, name: 'James Taylor', department: 'IT' },
    { id: 8, name: 'Olivia Anderson', department: 'Finance' },
    { id: 9, name: 'William Thomas', department: 'Marketing' },
    { id: 10, name: 'Sophia Martinez', department: 'Sales' },
  ];

  result: any[] = [];
  showResult: boolean = false;

  convertNamesUpperCase() {
    this.showResult = !this.showResult;
    this.result = [];

    if (!this.showResult) {
      this.result = [];
      return;
    }
    const operatorObservable$ = from(this.employees)
      .pipe(
        map(employee => {
          return {
            ...employee,
            name: employee.name.toUpperCase(),
            department: employee.department.toUpperCase()
          };
        })
      );

    // subscribe to the observable to see the results
    operatorObservable$.subscribe(employee => {
      console.log(employee);
      this.result.push(employee);
    });
  }


  // Additional operator examples can be added here
  // filter by department
  filterByDepartment(department: string | "HR") {
    this.result = [];
    const operatorObservable$ = from(this.employees)
      .pipe(
        filter(employee => employee.department === department)
      );

    operatorObservable$.subscribe(employee => {
      console.log(employee);
      this.result.push(employee);
    });
  }


  groupByDepartment() {
    this.result = [];
    const operatorObservable$ = from(this.employees)
      .pipe(
        groupBy(employee => employee.department),
        mergeMap(group$ => group$
          .pipe(toArray())),
        map(groupedEmployees => {
          return {
            key: groupedEmployees[0].department,
            value: groupedEmployees
          };
        })
      );


    // get key-value pairs of the grouped observable
    operatorObservable$.subscribe(groupedData => {
      console.log(groupedData);
      this.result.push(groupedData);
    });
  }


  switchMapDemo() {
    this.result = [];
    const operatorObservable$ = from(this.employees)
      .pipe(
        filter(employee => employee.department === 'IT'),
        switchMap(employee => {
          return new Observable(observer => {
            setTimeout(() => {
              observer.next({
                ...employee,
                name: employee.name + ' - switched',
                department: employee.department + ' - switched'
              });
              observer.complete();
            }, 1000);
          });
        })
      );

    operatorObservable$.subscribe(employee => {
      console.log(employee);
      this.result.push(employee);
    });
  }



  // Subject and BehaviorSubject examples can be added here
  scores = [85, 92, 78, 90, 88];

  subjectDemo() {
    const scoresSubject = new Subject<number>();

    // emit scores to the subject
    this.scores.forEach(score => scoresSubject.next(score));

    // subscribe1
    scoresSubject.subscribe(score => console.log('Subscriber 1:', score));

    // subscribe2
    scoresSubject.subscribe(score => console.log('Subscriber 2:', score));
  }


  // Using BehaviorSubject to hold the latest value and emit it to new subscribers
  behaviorSubjectDemo() {
    const behaviorSubject = new BehaviorSubject<number>(0);  // initial value
    
    // subscribe1
    const subscriber1 = behaviorSubject.subscribe(score => console.log('Subscriber 1:', score));

    // subscribe2
    const subscriber2 = behaviorSubject.subscribe(score => console.log('Subscriber 2:', score));

    behaviorSubject.next(10); // emit new score to all subscribers
    behaviorSubject.next(20); // emit new score to all subscribers
    behaviorSubject.next(30); // emit new score to all subscribers

    // add delay to simulate new subscriber after some time
    setTimeout(() => {
      const subscriber3 = behaviorSubject.subscribe(score => console.log('Subscriber 3 (late):', score));
    }, 5000);

    behaviorSubject.next(40); // emit new score to all subscribers

    behaviorSubject.next(50); // emit new score to all subscribers

    const subscriber4 = behaviorSubject.subscribe(score => console.log('Subscriber 4 (late):', score)); //log the latest score immediately upon subscription
  }


  replaySubjectDemo() {
    // ReplaySubject can be used to emit a specified number of previous values to new subscribers
    const replaySubject = new ReplaySubject<number>(3); // buffer size of 3

    this.scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // emit scores to the replay subject
    this.scores.forEach(score => replaySubject.next(score));

    // subscribe1
    const subscriber1 = replaySubject.subscribe(score => console.log('Subscriber 1:', score));

    // subscribe2
    const subscriber2 = replaySubject.subscribe(score => console.log('Subscriber 2:', score));

    // add delay to simulate new subscriber after some time
    setTimeout(() => {
      const subscriber3 = replaySubject.subscribe(score => console.log('Subscriber 3 (late):', score));
    }, 5000);

    replaySubject.next(40); // emit new score to all subscribers

    replaySubject.next(50); // emit new score to all subscribers

    const subscriber4 = replaySubject.subscribe(score => console.log('Subscriber 4 (late):', score)); //log the latest score immediately upon subscription
  }
}