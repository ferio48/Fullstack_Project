import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notAvailable',
  standalone: true
})
export class NotAvailablePipe implements PipeTransform {

  transform(value: string, args?: number): any {
    return value.length === 0 ? 'Not Available': value;
  }

}
