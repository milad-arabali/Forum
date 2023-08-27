import * as moment from 'jalali-moment';
import {DateAdapter} from '@angular/material/core';
import {Injectable} from '@angular/core';

/**
 * date time constant
 */
export const PERSIAN_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY/MM/DD',
    dateA11yLabel: 'YYYY/MM/DD',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};

/**
 * material persian date adapter
 */
@Injectable()
export class MaterialPersianDateAdapter extends DateAdapter<moment.Moment> {

  /**
   * constructor
   */
  constructor() {
    super();
  }

  /**
   * return year based on locale
   * @param date moment date
   */
  getYear(date: moment.Moment): number {
    if (this.locale === 'fa-IR') {
      return this.clone(date).jYear();
    } else {
      return this.clone(date).year();
    }
  }

  /**
   * return month based on locale
   * @param date moment date
   */
  getMonth(date: moment.Moment): number {
    if (this.locale === 'fa-IR') {
      return this.clone(date).jMonth();
    } else {
      return this.clone(date).month();
    }
  }

  /**
   * return date based on locale
   * @param date moment date
   */
  getDate(date: moment.Moment): number {
    if (this.locale === 'fa-IR') {
      return this.clone(date).jDate();
    } else {
      return this.clone(date).date();
    }
  }

  /**
   * return day of week
   * @param date moment date
   */
  getDayOfWeek(date: moment.Moment): number {
    return this.clone(date).day();
  }

  /**
   * return month name based on locale
   * @param style date style
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (this.locale === 'fa-IR') {
      switch (style) {
        case 'long':
        case 'short':
          return moment.localeData('fa').jMonths().slice(0);
        case 'narrow':
          return moment.localeData('fa').jMonthsShort().slice(0);
      }
    } else {
      switch (style) {
        case 'long':
        case 'short':
          return moment.localeData('en').months().slice(0);
        case 'narrow':
          return moment.localeData('en').monthsShort().slice(0);
      }
    }
  }

  /**
   * return date names
   */
  getDateNames(): string[] {
    const valuesArray = Array(31);
    for (let i = 0; i < 31; i++) {
      valuesArray[i] = String(i + 1);
    }
    return valuesArray;
  }

  /**
   * return day of week name based on locale
   * @param style date style
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (this.locale === 'fa-IR') {
      switch (style) {
        case 'long':
          return moment.localeData('fa').weekdays().slice(0);
        case 'short':
          return moment.localeData('fa').weekdaysShort().slice(0);
        case 'narrow':
          return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
      }
    } else {
      switch (style) {
        case 'long':
          return moment.localeData('en').weekdays().slice(0);
        case 'short':
          return moment.localeData('rn').weekdaysShort().slice(0);
        case 'narrow':
          return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      }
    }
  }

  /**
   * return year name based on locale
   * @param date moment date
   */
  getYearName(date: moment.Moment): string {
    if (this.locale === 'fa-IR') {
      return this.clone(date).jYear().toString();
    } else {
      return this.clone(date).year().toString();
    }
  }

  /**
   * return first day of week based on locale
   */
  getFirstDayOfWeek(): number {
    if (this.locale === 'fa-IR') {
      return moment.localeData('fa').firstDayOfWeek();
    } else {
      return moment.localeData('en').firstDayOfWeek();
    }
  }

  /**
   * return number of days in month based on locale
   * @param date moment date
   */
  getNumDaysInMonth(date: moment.Moment): number {
    if (this.locale === 'fa-IR') {
      return this.clone(date).jDaysInMonth();
    } else {
      return this.clone(date).daysInMonth();
    }
  }

  clone(date: moment.Moment): moment.Moment {
    if (this.locale === 'fa-IR') {
      return date.clone().locale('fa');
    } else {
      return date.clone().locale('en');
    }
  }

  /**
   * create date based on year, month and day
   * @param year year
   * @param month month
   * @param date day
   */
  createDate(year: number, month: number, date: number): moment.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    let result;
    if (this.locale === 'fa-IR') {
      result = moment()
        .jYear(year)
        .jMonth(month)
        .jDate(date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .locale('fa');
    } else {
      result = moment()
        .year(year)
        .month(month)
        .date(date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .locale('en');
    }
    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  /**
   * return today based on locale
   */
  today(): moment.Moment {
    if (this.locale === 'fa-IR') {
      return moment().locale('fa');
    } else {
      return moment().locale('en');
    }
  }

  /**
   * parse date based on locale
   * @param value date
   * @param parseFormat parse format
   */
  parse(value: any, parseFormat: string | string[]): moment.Moment | null {
    if (this.locale === 'fa-IR') {
      if (value && typeof value === 'string') {
        return moment(value, parseFormat, 'fa');
      }
      return value ? moment(value).locale('fa') : null;
    } else {
      if (value && typeof value === 'string') {
        return moment(value, parseFormat, 'en');
      }
      return value ? moment(value).locale('en') : null;
    }
  }

  /**
   * format date
   * @param date moment date
   * @param displayFormat display format
   */
  format(date: moment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  /**
   * add year to date based on locale
   * @param date moment date
   * @param years number of years to be added
   */
  addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    if (this.locale === 'fa-IR') {
      return this.clone(date).add(years, 'jYear');
    } else {
      return this.clone(date).add(years, 'year');
    }
  }

  /**
   * add month based on locale
   * @param date moment date
   * @param months number of month to be added
   */
  addCalendarMonths(date: moment.Moment, months: number): moment.Moment {
    if (this.locale === 'fa-IR') {
      return this.clone(date).add(months, 'jmonth');
    } else {
      return this.clone(date).add(months, 'month');
    }
  }

  /**
   * add day to date based on locale
   * @param date moment date
   * @param days number of day to be added
   */
  addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    if (this.locale === 'fa-IR') {
      return this.clone(date).add(days, 'jDay');
    } else {
      return this.clone(date).add(days, 'day');
    }
  }

  /**
   * convert date to iso date time format
   * @param date moment date
   */
  toIso8601(date: moment.Moment): string {
    return this.clone(date).format();
  }

  /**
   * check object is instance of date
   * @param obj object
   */
  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  /**
   * check date is valid
   * @param date moment date
   */
  isValid(date: moment.Moment): boolean {
    return this.clone(date).isValid();
  }

  invalid(): moment.Moment {
    return moment.invalid();
  }

  /**
   * deserialize object to moment date
   * @param value object
   */
  override deserialize(value: any): moment.Moment | null {
    let date;
    if (value instanceof Date) {
      date = moment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      if (this.locale === 'fa-IR') {
        date = moment(value).locale('fa');
      } else {
        date = moment(value).locale('en');
      }
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
}
