import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore'

@Pipe({
  name: 'dateFormat',
  pure: false,
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | Timestamp): string {
    const dateValue = value instanceof Date ? Timestamp.fromDate(value) : value;
    const dateString = dateValue.toDate().toString();
    const trimmedDate = dateString.replace(/GMT.+$/, '');
    return trimmedDate;
  }

}
