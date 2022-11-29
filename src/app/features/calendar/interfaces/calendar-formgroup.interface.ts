import { FormControl, FormGroup } from '@angular/forms';

export interface CalendarFormGroup {
  firstDate: FormGroup<DateFormGroup>;
  secondDate: FormGroup<DateFormGroup>;
  currentDate: FormControl<Date>;
}

export interface DateFormGroup {
  day: FormControl<string | null>;
  month: FormControl<string | null>;
  year: FormControl<string | null>;
}
