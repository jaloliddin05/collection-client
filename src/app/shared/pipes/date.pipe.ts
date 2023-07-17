import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'date',
})
export class TimeDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'MM/dd/yyyy');
  }
}
