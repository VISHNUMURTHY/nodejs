import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiSwitchCase'
})
export class MultiSwitchCasePipe implements PipeTransform {

  transform(cases: any[], option: any): unknown {
    return cases.includes(option) ? option : '';
  }

}
