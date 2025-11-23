import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
})
export class TempPipe implements PipeTransform {
  transform(value: number): string {
    if (value) {
      if (value < 16) {
        return '❄️ ' + value + 'C°';
      }
      else{
         return '🔥' + value + 'C°';

      }
    }
    return ""
  }
}
