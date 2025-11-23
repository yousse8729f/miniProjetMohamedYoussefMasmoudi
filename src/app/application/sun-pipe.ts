import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sun',
})
export class SunPipe implements PipeTransform {
  transform(value: number|string): string {
   if (!value) return '';

   
    const str = value.toString();

   
    const hour = parseInt(str.split(':')[0]);

    
    const icon = hour >= 12 ? '🌜' : '🌞';

   
    return icon + ' ' + str;
  }
}
