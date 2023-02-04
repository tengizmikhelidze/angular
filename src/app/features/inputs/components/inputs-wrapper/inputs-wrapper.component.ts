import { Component } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inputs-wrapper',
  templateUrl: './inputs-wrapper.component.html',
  styleUrls: ['./inputs-wrapper.component.scss'],
})
export class InputsWrapperComponent {
  readonly checkIcon = faClock;
}
