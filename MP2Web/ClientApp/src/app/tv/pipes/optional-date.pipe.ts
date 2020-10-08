import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/** Extends DatePipe by only returning a date in the specified format if the date is different to today, otherwise it returns null. */
@Pipe({
  name: 'optionalDate'
})
export class OptionalDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, format?: string, timezone?: string, locale?: string): string {
    const today = new Date();
    const dateValue = new Date(value);
    // There's probably a smarter way to check that the date portions are the same but this does the job
    if (today.getDate() === dateValue.getDate() && today.getMonth() === dateValue.getMonth() && today.getFullYear() === dateValue.getFullYear())
      return null;
    return super.transform(value, format, timezone, locale);
  }

}
