import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './component/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, CalendarRoutingModule, ReactiveFormsModule],
})
export class CalendarModule {}
