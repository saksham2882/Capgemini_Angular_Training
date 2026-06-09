import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetection2 } from '../change-detection2/change-detection2';

@Component({
  selector: 'app-change-detection-demo',
  imports: [ChangeDetection2],
  templateUrl: './change-detection-demo.html',
  styleUrl: './change-detection-demo.css',

  // to optimize performance by only checking for changes when necessary
  changeDetection: ChangeDetectionStrategy.OnPush
  // changeDetection: ChangeDetectionStrategy.Default
})

export class ChangeDetectionDemo {

  public name: string = 'Angular';

  public changeName(): void {
    this.name = 'Angular Change Detection';
  }

  counter = 0;

  changeCounter() {
    this.counter++;
  }
}