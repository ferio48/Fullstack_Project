import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notAvailableNumber',
  standalone: true
})
export class NotAvailableNumberPipe implements PipeTransform {

  transform(value: number, args: number): number {
    return value.toString.length === 0 ? 0 : value;
  }

}
