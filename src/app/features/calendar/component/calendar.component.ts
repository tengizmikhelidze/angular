import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
  readonly leftArrowIcon: IconDefinition = faChevronLeft;
  readonly rightArrowIcon: IconDefinition = faChevronRight;
  readonly upArrowIcon: IconDefinition = faChevronUp;
  readonly downArrowIcon: IconDefinition = faChevronDown;

  public displayCalendarPopup: boolean = false;

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
      this.firstMonthControl.value || this.currentDateControl.value?.getMonth()
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
      this.secondMonthControl.value || this.currentDateControl.value?.getMonth()
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

  monthWeeksViewForUi(date: Date): { [key: string]: (number | null)[] } {
    let firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let datesInWeeks: { [key: string]: (number | null)[] } = {};
    let weekIterator: number = 1;

    for (let i = 1; i <= lastOfMonth.getDate(); i++) {
      if (datesInWeeks[weekIterator]) {
        datesInWeeks[weekIterator].push(i);
      } else {
        datesInWeeks[weekIterator] = [i];
      }
      if (firstOfMonth.getDay() % 7 === 0) {
        if (i < 8) {
          let diff = 6 - datesInWeeks[weekIterator].length;
          let lastOfPreviousMonthDate = new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            0
          ).getDate();
          while (diff >= 0) {
            // datesInWeeks[weekIterator].unshift(lastOfPreviousMonthDate);
            datesInWeeks[weekIterator].unshift(null);
            --lastOfPreviousMonthDate;
            --diff;
          }
        }
        weekIterator++;
      }
      firstOfMonth.setDate(firstOfMonth.getDate() + 1);
    }

    return datesInWeeks;
  }

  compareTwoDateWithYearMonthDate(
    date1: Date,
    date2: Date,
    getDate1?: number | null,
    getDate2?: number | null
  ): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      (getDate1 !== undefined ? getDate1 : date1.getDate()) ===
        (getDate2 !== undefined ? getDate2 : date2.getDate())
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getPrefix(
    tempValue: number | string,
    type: 'hour' | 'minutes' | 'seconds'
  ): string | number {
    let value = Number(tempValue);
    if (value || value === 0) {
      if (type === 'hour' || type === 'minutes' || type === 'seconds') {
        return value >= 0 && value < 10 ? `0${value}` : value;
      } else return value;
    } else return tempValue;
  }

  showCalendarPopup() {
    this.displayCalendarPopup = true;
  }

  hideCalendarPopup() {
    this.displayCalendarPopup = false;
    console.log(this.firstDate);
    console.log(this.secondDate);
  }

  selectDate(dateToSetValue: Date, value: number | null) {
    if (value) {
      dateToSetValue.setDate(value);
    }
  }
}
