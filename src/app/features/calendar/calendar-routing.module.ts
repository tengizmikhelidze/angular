import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './component/calendar.component';
import { CalendarsWrapperComponent } from './calendars-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarsWrapperComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CalendarComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
