import { Pipe, PipeTransform } from '@angular/core';

export type SortBy = 'asc' | 'desc';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortOrder: SortBy | string = 'asc', sortByKey?: string): any {

    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'asc' && sortOrder !== 'desc')) return value;

    let numArray = [];
    let strArray = [];

    if (!sortByKey) {
      numArray = value.filter(item => typeof item === 'number').sort();
      strArray = value.filter(item => typeof item === 'string').sort();
    } else {
      numArray = value.filter(item => typeof item[sortByKey] === 'number').sort((a, b) => a[sortByKey] - b[sortByKey]);
      strArray = value.filter(item => typeof item[sortByKey] === 'string').sort((a, b) => {
        if (a[sortByKey] < b[sortByKey]) return -1;
        else if (a[sortByKey] > b[sortByKey]) return 1;
        else return 0;
      });
    }
    let sortedArray = numArray.concat(strArray);
    return sortOrder === 'asc' ? sortedArray : sortedArray.reverse();
  }

}
