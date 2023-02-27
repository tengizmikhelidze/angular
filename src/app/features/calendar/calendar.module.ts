import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './single-selection-calendar/calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CalendarsWrapperComponent } from './calendars-wrapper.component';
import { RangeSelectionCalendarComponent } from './range-selection-calendar/range-selection-calendar.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarsWrapperComponent,
    RangeSelectionCalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class CalendarModule {}
