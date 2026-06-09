import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe2',
})

export class CustomPipe2 implements PipeTransform {

  transform(cities: string[], ...args: string[]): any {
    // sort the cities in ascending order of length of the city name
    return cities.sort((a, b) => a.length - b.length);
  }
}
