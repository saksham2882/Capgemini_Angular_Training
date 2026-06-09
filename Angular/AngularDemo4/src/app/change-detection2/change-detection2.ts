import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-change-detection2',
  imports: [],
  templateUrl: './change-detection2.html',
  styleUrl: './change-detection2.css',
})
export class ChangeDetection2 {

  @Input() 
  counter2: number = 0;
}

