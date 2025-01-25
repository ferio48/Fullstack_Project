import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'notAvailableDate',
  standalone: true,
})
export class NotAvailableDatePipe implements PipeTransform {

  transform(value: Date, args: Date): Date {
    // if(value.toLocaleString === "Invalid date") return new Date('Not Available') ;
    let d: Date = new Date(value);
    let cmp: string = d.toLocaleString();
    console.warn(cmp);
    return cmp == "Invalid Date" ? new Date('Invalid') : value;
    // return value;
  }

}
