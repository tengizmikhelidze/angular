import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChangeDateClass } from '../interfaces/change-date-class.model';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { CalendarComponent } from '../single-selection-calendar/calendar.component';

@Component({
  selector: 'app-calendar-range',
  templateUrl: './range-selection-calendar.component.html',
  styleUrls: ['./range-selection-calendar.component.scss'],
})
export class RangeSelectionCalendarComponent {
  readonly calendar = faCalendarAlt;
  startDate: Date | null = null;
  endDate: Date | null = null;
  showPopup: boolean = false;
  inputValue: string = '';

  startDateChange(startDate: Date | null) {
    this.startDate = startDate;
    if (this.startDate) {
      if (this.inputValue.length > 8) {
        this.inputValue =
          `${
            this.startDate?.getDate() < 10
              ? '0' + this.startDate?.getDate()
              : this.startDate?.getDate()
          }${
            this.startDate?.getMonth() < 10
              ? '0' + this.startDate?.getMonth()
              : this.startDate?.getMonth()
          }${this.startDate?.getFullYear()}` + this.inputValue.slice(8);
      } else {
        this.inputValue = `${
          this.startDate?.getDate() < 10
            ? '0' + this.startDate?.getDate()
            : this.startDate?.getDate()
        }${
          this.startDate?.getMonth() < 10
            ? '0' + this.startDate?.getMonth()
            : this.startDate?.getMonth()
        }${this.startDate?.getFullYear()}`;
      }
    }
  }

  endDateChange(endDate: Date | null) {
    this.endDate = endDate;
    if (this.endDate) {
      if (this.inputValue.length >= 8) {
        this.inputValue =
          this.inputValue.slice(0, 8) +
          `${
            this.endDate?.getDate() < 10
              ? '0' + this.endDate?.getDate()
              : this.endDate?.getDate()
          }${
            this.endDate?.getMonth() < 10
              ? '0' + this.endDate?.getMonth()
              : this.endDate?.getMonth()
          }${this.endDate?.getFullYear()}`;
      } else {
        this.inputValue =
          '00000000' +
          `${
            this.endDate?.getDate() < 10
              ? '0' + this.endDate?.getDate()
              : this.endDate?.getDate()
          }${
            this.endDate?.getMonth() < 10
              ? '0' + this.endDate?.getMonth()
              : this.endDate?.getMonth()
          }${this.endDate?.getFullYear()}`;
      }
    }
  }

  changeDateClass: ChangeDateClass = (date: Date) => {
    if (this.startDate && this.endDate) {
      return date.getTime() >= this.startDate.getTime() &&
        date.getTime() <= this.endDate.getTime()
        ? 'selection-range'
        : '';
    }
    return '';
  };

  clickOutside() {
    this.showPopup = false;
  }

  changeInput() {
    let startDateString = '';
    let endDateString = '';
    if (this.inputValue.length === 16) {
      startDateString =
        this.inputValue.slice(2, 4) +
        '/' +
        this.inputValue.slice(0, 2) +
        '/' +
        this.inputValue.slice(4, 8);
      endDateString =
        this.inputValue.slice(10, 12) +
        '/' +
        this.inputValue.slice(8, 10) +
        '/' +
        this.inputValue.slice(12, 16);
    } else if (this.inputValue.length >= 8) {
      startDateString =
        this.inputValue.slice(2, 4) +
        '/' +
        this.inputValue.slice(0, 2) +
        '/' +
        this.inputValue.slice(4, 8);
    }
    if (startDateString) {
      this.startDate = new Date(startDateString);
    }
    if (endDateString) {
      this.endDate = new Date(endDateString);
    }
  }
}
