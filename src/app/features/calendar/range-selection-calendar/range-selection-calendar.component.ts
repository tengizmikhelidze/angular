import { Component } from '@angular/core';
import { ChangeDateClass } from '../interfaces/change-date-class.model';

@Component({
  selector: 'app-calendar-range',
  templateUrl: './range-selection-calendar.component.html',
  styleUrls: ['./range-selection-calendar.component.scss'],
})
export class RangeSelectionCalendarComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;

  startDateChange(startDate: Date | null) {
    this.startDate = startDate;
  }

  endDateChange(endDate: Date | null) {
    this.endDate = endDate;
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
}
