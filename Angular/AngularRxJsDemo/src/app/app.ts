import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ObserverDemo } from './observer-demo/observer-demo';
import { RxJsOperatorsDemo } from './rxjs-operators-demo/rxjs-operators-demo';
import { NgRxDemo } from './ngrx-demo/ngrx-demo';

@Component({
  selector: 'app-root',
  imports: [ObserverDemo, RxJsOperatorsDemo, NgRxDemo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AngularRxJsDemo');
}
