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
    }),
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.subscribe((next) => {
      console.log(next);
    });
  }
}
