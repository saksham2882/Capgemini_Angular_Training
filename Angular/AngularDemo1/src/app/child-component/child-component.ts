import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Person } from './Person';

@Component({
  selector: 'app-child-component',
  imports: [],
  templateUrl: './child-component.html',
  styleUrl: './child-component.css',
})

export class ChildComponent {

  @Input() childData: string = '';

  @Output()                          // @Output decorator is function marking a property as way for data to go child to parent component. It is used to emit custom events.
                                     // name of the property is childEvent and it is of type EventEmitter which is a class
                                     // in Angular that allows us to create custom events and emit them.
                                     
  // The type of data that this event will emit is Person array.
  childEvent = new EventEmitter<Person[]>();

  sendDataToParent() {
    const personData: Person[] = [
      { name: 'Alice', age: 30, city: 'New York' },
      { name: 'Bob', age: 25, city: 'Los Angeles' },
      { name: 'Charlie', age: 35, city: 'Chicago' }
    ];

    this.childEvent.emit(personData);
  }
}