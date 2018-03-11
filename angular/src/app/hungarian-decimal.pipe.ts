import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'huDecimal'
})

export class HungarianDecimalPipe implements PipeTransform {
    transform(value: string, args: any[]): string {
        if(value) {
          return value.split(',').join('.');
        }
        return '';
    }
}