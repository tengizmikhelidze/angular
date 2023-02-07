import {
  AfterContentChecked,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent
  implements ControlValueAccessor, AfterContentChecked
{
  @Input() id: string = '';
  @Input() radioValue: string = ''; // აუცილებელი ველია
  @Input() label: string = '';
  @Input() labelStyles: {} = {};
  @Input() inputStyles: {} = {};
  @Input() name: string = '';
  @ViewChild('radioInput') radioInput: ElementRef<HTMLInputElement> | undefined;

  public val: any; // ამ ველს ვწვდებით კომპონენტის შიგნითის შიგნით
  private defaultValueAlreadyChecked: boolean = false;

  set value(val: boolean) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  ngAfterContentChecked() {
    if (
      !this.defaultValueAlreadyChecked &&
      this.radioInput &&
      this.val === this.radioValue
    ) {
      this.radioInput.nativeElement.checked = this.val;
      this.defaultValueAlreadyChecked = true;
    }
  }

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
