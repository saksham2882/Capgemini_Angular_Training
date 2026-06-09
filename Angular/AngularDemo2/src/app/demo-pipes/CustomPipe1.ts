import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'customPipe1'
})

export class CustomPipe1 implements PipeTransform {

    transform(city: string, ...args: string[]): string {

        // Implement your transformation logic here
        if (city.length % 2 === 0) {
            return city.toUpperCase();
        } else {
            return city.toLowerCase();
        }
    }
}