import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './single-selection-calendar/calendar.component';
import { CalendarsWrapperComponent } from './calendars-wrapper.component';
import { RangeSelectionCalendarComponent } from './range-selection-calendar/range-selection-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarsWrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'single-selection',
      },
      {
        path: 'single-selection',
        component: CalendarComponent,
      },
      {
        path: 'range-selection',
        component: RangeSelectionCalendarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
