import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  /**
   * Pipe to transform the incoming date into the years, months, or days that have passed.
   * @param dateInput the date to format.
   * @returns how many years, months or days have passed until today.
   */
  transform(dateInput: string): string {
    if (!dateInput) {
      return '';
    }
    const today: Date = new Date();
    const date: Date = new Date(dateInput);
    const time = (date.getTime() - today.getTime()) / 1000;
    const year: number = Math.abs(Math.round(time / (60 * 60 * 24) / 365.25));
    if (year > 0) {
      return `${year} year(s)`;
    }
    const month: number = Math.abs(Math.round(time / (60 * 60 * 24 * 7 * 4)));
    if (month > 0) {
      return `${month} month(s)`;
    }
    const days: number = Math.abs(Math.round(time / (3600 * 24)));
    return `${days === 0 ? 1 : days} day(s)`;
  }
}
