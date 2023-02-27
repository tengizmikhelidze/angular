import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { Months } from '../constants';
import { ChangeDateClass } from '../interfaces/change-date-class.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  readonly leftArrow = faChevronLeft;
  readonly rightArrow = faChevronRight;
  readonly upArrow = faChevronUp;
  readonly downArrow = faChevronDown;
  @Input() selectedDate: Date | null = null;
  @Input() wrapperStyles: {} = {};
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() hasClock: boolean = false;
  @Input() changeDateClass: ChangeDateClass = null;
  @Output() changeValue: EventEmitter<Date | null> =
    new EventEmitter<Date | null>();
  currentDate: Date = new Date();
  viewDate: Date = this.selectedDate
    ? new Date(this.selectedDate)
    : new Date(this.currentDate);
  lastSelectedHeaderDate: Date = new Date(this.viewDate);
  hours: number = this.viewDate.getHours();
  minutes: number = this.viewDate.getMinutes();
  seconds: number = this.viewDate.getSeconds();
  view: 'calendar' | 'month' | 'year' = 'calendar';
  Months = Months;

  getMonthViewForUI(
    date: Date
  ): { value: number; class: 'next' | 'current' | 'prev' }[] {
    let monthView: { value: number; class: 'next' | 'current' | 'prev' }[] = [];
    let maxDateInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let minDateInMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let maxDateInPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    let minDateWeekDay =
      new Date(minDateInMonth).getDay() === 0
        ? 7
        : new Date(minDateInMonth).getDay();
    let maxDateWeekDay =
      new Date(maxDateInMonth).getDay() === 0
        ? 7
        : new Date(maxDateInMonth).getDay();
    for (let i = minDateWeekDay; i > 1; i--) {
      monthView.push({
        value: maxDateInPrevMonth.getDate() - i + 2,
        class: 'prev',
      });
    }
    for (let i = 1; i <= maxDateInMonth.getDate(); i++) {
      monthView.push({ value: i, class: 'current' });
    }
    for (let i = 1; i <= 7 - maxDateWeekDay; i++) {
      monthView.push({ value: i, class: 'next' });
    }
    return monthView;
  }

  arrowClick(action: 'prev' | 'next') {
    if (this.view === 'calendar') {
      if (action === 'prev') {
        this.viewDate = this.changeViewDate(false, this.prevMonth);
      } else if (action === 'next') {
        this.viewDate = this.changeViewDate(false, this.nextMonth);
      }
    } else if (this.view === 'year') {
      if (action === 'prev') {
        this.viewDate = this.changeViewDate(false, this.prev20Year);
      } else if (action === 'next') {
        this.viewDate = this.changeViewDate(false, this.next20Year);
      }
    } else if (this.view === 'month') {
      if (action === 'prev') {
        this.viewDate = this.changeViewDate(false, this.prevYear);
      } else if (action === 'next') {
        this.viewDate = this.changeViewDate(false, this.nextYear);
      }
    }
  }

  changeViewDate(remember: boolean, fn?: ((date: Date) => Date) | null): Date {
    if (remember) {
      this.lastSelectedHeaderDate = new Date(this.viewDate);
    }
    if (fn) {
      return fn(this.viewDate);
    }
    return this.viewDate;
  }

  nextMonth(date: Date): Date {
    return new Date(date.setMonth(date.getMonth() + 1));
  }

  prevMonth(date: Date): Date {
    return new Date(date.setMonth(date.getMonth() - 1));
  }

  next20Year(date: Date): Date {
    return new Date(date.setFullYear(date.getFullYear() + 20));
  }

  prev20Year(date: Date): Date {
    return new Date(date.setFullYear(date.getFullYear() - 20));
  }

  nextYear(date: Date): Date {
    return new Date(date.setFullYear(date.getFullYear() + 1));
  }

  prevYear(date: Date): Date {
    return new Date(date.setFullYear(date.getFullYear() - 1));
  }

  changeView(view: 'calendar' | 'month' | 'year') {
    this.view = view;
  }

  getYearSelection(date: Date): number[] {
    let yearSelection: number[] = [];
    let currentYear = date.getFullYear();
    for (let i = currentYear - 9; i <= currentYear + 10; i++) {
      yearSelection.push(i);
    }
    return yearSelection;
  }

  selectYear(year: number) {
    this.viewDate.setFullYear(year);
    this.viewDate = new Date(this.viewDate);
    this.changeView('month');
  }

  handleViewDateChange() {
    if (this.view === 'year') {
      this.viewDate = new Date(this.lastSelectedHeaderDate);
      this.changeView('calendar');
    } else if (this.view === 'calendar') {
      this.changeViewDate(true);
      this.changeView('year');
    } else if (this.view === 'month') {
      this.changeView('year');
    }
  }

  selectMonth(monthValue: number) {
    this.viewDate.setMonth(monthValue);
    this.viewDate = new Date(this.viewDate);
    this.changeView('calendar');
  }

  selectDate(monthDate: number, month: 'current' | 'prev' | 'next') {
    let date = this.getDateFromMonthDate(monthDate, month);
    if (this.isBetweenMinAndMaxDate(monthDate, month)) {
      this.changeViewDate(
        true,
        month === 'prev'
          ? this.prevMonth
          : month === 'next'
          ? this.nextMonth
          : null
      );
      this.selectedDate = new Date(date);
      this.selectedDate?.setHours(this.hours, this.minutes, this.seconds);
      this.selectedDate = new Date(this.selectedDate);
      this.viewDate = new Date(this.selectedDate);
      this.changeValue.emit(this.selectedDate);
    }
  }

  isBetweenMinAndMaxDate(
    monthDate: number,
    month: 'current' | 'prev' | 'next'
  ): boolean {
    let date = this.getDateFromMonthDate(monthDate, month);
    if (this.minDate && this.maxDate) {
      return (
        date.getTime() >= this.minDate.getTime() &&
        date.getTime() <= this.maxDate.getTime()
      );
    } else if (this.minDate) {
      return date.getTime() >= this.minDate.getTime();
    } else if (this.maxDate) {
      return date.getTime() <= this.maxDate.getTime();
    }
    return true;
  }

  getDateFromMonthDate(
    monthDate: number,
    month: 'current' | 'prev' | 'next'
  ): Date {
    return new Date(
      this.viewDate.getFullYear(),
      month === 'current'
        ? this.viewDate.getMonth()
        : month === 'prev'
        ? this.viewDate.getMonth() - 1
        : month === 'next'
        ? this.viewDate.getMonth() + 1
        : this.viewDate.getMonth(),
      monthDate
    );
  }

  clockChange() {
    if (this.hours > 23) {
      this.hours = 0;
    } else if (this.hours < 0) {
      this.hours = 0;
    }
    if (this.minutes > 59) {
      this.minutes = 0;
    } else if (this.minutes < 0) {
      this.minutes = 0;
      return;
    }
    this.viewDate.setHours(this.hours, this.minutes, this.seconds);
    this.viewDate = new Date(this.viewDate);
    this.changeViewDate(true);
    if (this.selectedDate) {
      this.selectedDate = new Date(this.viewDate);
      this.selectedDate.setHours(this.hours);
      this.selectedDate = new Date(this.selectedDate);
      this.changeValue.emit(this.selectedDate);
    }
  }

  preventCharacters($event: KeyboardEvent) {
    return !!$event.key.match(/\d/);
  }

  clockArrowClick(
    type: 'hours' | 'minutes' | 'seconds',
    increment: 'up' | 'down'
  ) {
    if (type === 'hours') {
      this.hours += increment === 'up' ? 1 : increment === 'down' ? -1 : 0;
    } else if (type === 'minutes') {
      this.minutes += increment === 'up' ? 1 : increment === 'down' ? -1 : 0;
    } else if (type === 'seconds') {
      this.seconds += increment === 'up' ? 1 : increment === 'down' ? -1 : 0;
    }
    this.clockChange();
  }
}
