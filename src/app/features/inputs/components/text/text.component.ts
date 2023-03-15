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
  selector: 'app-text-input',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextComponent),
      multi: true,
    },
  ],
})
export class TextComponent
  implements ControlValueAccessor, AfterContentChecked
{
  @Input() id: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeHolder: string = '';
  @Input() placeHolderStyles: {} = {};
  @Input() inputStyles: {} = {};
  @ViewChild('textInput') textInput: ElementRef<HTMLInputElement> | undefined;

  public isDisabled: boolean = false;
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
    if (!this.defaultValueAlreadyChecked && this.textInput && this.val) {
      this.textInput['nativeElement']['value'] = this.val;
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

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  hasInputValue() {
    return !!this.val;
  }
}
