import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { About } from './about/about';
import { ChildComponent } from './child-component/child-component';
import { Person } from './child-component/Person';

@Component({
  selector: 'app-root',
  imports: [Home, About, ChildComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('AngularDemo1');

  constructor() {
    console.log('App component is created');
  }

  x = 10;

  changeValue() {
    this.x = 20;
  }

  changeValueAgain() {
    this.x = 30;
  }


  // for using @input decorator inside ChildComponent
  parentData: string = 'This is data I have in Parent Component !!';

  
  // for using @output decorator inside ChildComponent
  PersonData: Person[] = [];
  receiveDataFromChild(event: any) {
    console.log('Data received from child component:', event);
    this.PersonData = event;
  }
}