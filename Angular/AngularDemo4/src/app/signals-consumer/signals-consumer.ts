import { Component, Input, input, computed } from '@angular/core';

@Component({
  selector: 'app-signals-consumer',
  imports: [],
  templateUrl: './signals-consumer.html',
  styleUrl: './signals-consumer.css',
})
export class SignalsConsumer {

  // using input we can pass data from parent component to child component.
  status = input.required<string>();

  // using input decorator we can pass data from parent component to child component.
  @Input() 
  user: { name: string; age: number } = { name: 'Test User', age: 0 };

  consumerStatus = computed(() => {
    console.log('Status value changed in consumer component:', this.status());
    return this.status().toUpperCase();
  });
}