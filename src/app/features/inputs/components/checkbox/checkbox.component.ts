import { Component, forwardRef, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppConfigService } from '../../../../core';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconDefinition: IconDefinition | undefined;
  @Input() iconUrl: string =
    environment.baseHref + 'assets/svgs/check-white.svg';
  @Input() labelStyles: {} = {};
  @Input() inputStyles: {} = {};
  @Input() iconStyles: {} = {};

  public val: boolean = false; // ამ ველს ვწვდებით კომპონენტის შიგნით

  set value(val: boolean) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  constructor(public appConfigService: AppConfigService) {}

  onChange: any = () => {};
  onTouch: any = () => {};

  // არეგისტრირებს value-ს ცვლილების დროს რომელი ფუქნცია უნდა გამოიძახოს
  writeValue(value: any) {
    this.value = value;
  }

  // არეგისტრირებს onChange ივენთის დროს რომელი ფუნქცია უნდა გამოიძხოს
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // არეგისტრირებს onTouched ივენთის დროს რომელი ფუნქცია უნდა გამოიძხოს
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
