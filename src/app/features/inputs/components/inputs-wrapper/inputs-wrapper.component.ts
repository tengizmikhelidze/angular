import { Component } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-inputs-wrapper',
  templateUrl: './inputs-wrapper.component.html',
  styleUrls: ['./inputs-wrapper.component.scss'],
})
export class InputsWrapperComponent {
  readonly environment = environment;
  readonly checkIcon = faClock;
  public form = this.fb.group({
    checkboxes: this.fb.group({
      checkbox1: [false],
      checkbox2: [false],
      checkbox3: [false],
      checkbox4: [true],
      checkbox5: [true],
    }),
    radios: this.fb.group({
      maleFemale: ['male'],
    }),
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((next) => {
      console.log(next);
    });
  }
}
