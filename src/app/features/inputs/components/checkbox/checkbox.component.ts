import {
  AfterContentChecked,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class CheckboxComponent
  implements ControlValueAccessor, AfterContentChecked
{
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconDefinition: IconDefinition | undefined;
  @Input() iconUrl: string =
    environment.baseHref + 'assets/svgs/check-white.svg';
  @Input() labelStyles: {} = {};
  @Input() inputStyles: {} = {};
  @Input() iconStyles: {} = {};
  @ViewChild('checkboxInput') checkboxInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  public val: boolean | undefined; // ამ ველს ვწვდებით კომპონენტის შიგნით
  private defaultValueAlreadyChecked: boolean = false;

  set value(val: boolean) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  ngAfterContentChecked() {
    if (
      !this.defaultValueAlreadyChecked &&
      this.checkboxInput &&
      typeof this.val === 'boolean'
    ) {
      this.checkboxInput.nativeElement.checked = this.val;
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
