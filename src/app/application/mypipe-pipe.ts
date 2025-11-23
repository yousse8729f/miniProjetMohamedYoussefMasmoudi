import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mypipe'
})
export class MypipePipe implements PipeTransform {

  transform(value: string, ): any {
    if (value) {
      return value+"dt"
    }
    
  }

}
