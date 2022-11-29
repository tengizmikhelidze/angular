import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CalendarFormGroup,
  DateFormGroup,
} from '../interfaces/calendar-formgroup.interface';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  form: FormGroup<CalendarFormGroup> = this.fb.group<CalendarFormGroup>({
    firstDate: this.fb.group<DateFormGroup>({
      day: this.fb.control('', [Validators.required]),
      month: this.fb.control('', [Validators.required]),
      year: this.fb.control('', [Validators.required]),
    }),
    secondDate: this.fb.group<DateFormGroup>({
      day: this.fb.control('', [Validators.required]),
      month: this.fb.control('', [Validators.required]),
      year: this.fb.control('', [Validators.required]),
    }),
    currentDate: this.fb.control(new Date(), { nonNullable: true }),
  });
  firstDateFormGroup: FormGroup<DateFormGroup> = this.form.controls.firstDate;
  secondDateFormGroup: FormGroup<DateFormGroup> = this.form.controls.secondDate;

  firstDayControl: FormControl<string | null> =
    this.form.controls.firstDate.controls.day;
  firstMonthControl: FormControl<string | null> =
    this.form.controls.firstDate.controls.month;
  firstYearControl: FormControl<string | null> =
    this.form.controls.firstDate.controls.year;

  secondDayControl: FormControl<string | null> =
    this.form.controls.secondDate.controls.day;
  secondMonthControl: FormControl<string | null> =
    this.form.controls.secondDate.controls.month;
  secondYearControl: FormControl<string | null> =
    this.form.controls.secondDate.controls.year;

  currentDateControl: FormControl<Date> = this.form.controls.currentDate;

  firstDate: Date = new Date(
    Number(
      this.firstYearControl.value ||
        this.currentDateControl.value?.getFullYear()
    ),
    Number(
      this.firstMonthControl.value ||
        this.currentDateControl.value?.getMonth() + 1
    ),
    Number(
      this.firstDayControl.value || this.currentDateControl.value?.getDate()
    )
  );
  secondDate: Date = new Date(
    Number(
      this.secondYearControl.value ||
        this.currentDateControl.value?.getFullYear()
    ),
    Number(
      this.secondMonthControl.value ||
        this.currentDateControl.value?.getMonth() + 1
    ),
    Number(
      this.secondDayControl.value || this.currentDateControl.value?.getDate()
    )
  );

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.firstDateInputsValueChange();
    this.secondDateInputsValueChange();
  }

  firstDateInputsValueChange() {
    combineLatest([
      this.firstDayControl.valueChanges,
      this.firstMonthControl.valueChanges,
      this.firstYearControl.valueChanges,
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([firstDayValue, firstMonthValue, firstYearValue]) => {
        console.log(firstDayValue, firstMonthValue, firstYearValue);
      });
  }

  secondDateInputsValueChange() {
    combineLatest([
      this.secondDayControl.valueChanges,
      this.secondMonthControl.valueChanges,
      this.secondYearControl.valueChanges,
    ])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([secondDayValue, secondMonthValue, secondYearValue]) => {
        console.log(secondDayValue, secondMonthValue, secondYearValue);
      });
  }

  getCalendarForUi(date: Date) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
