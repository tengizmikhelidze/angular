import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() iconDefinition: IconDefinition | undefined;
  @Input() iconUrl: string = '/assets/svgs/check-white.svg';
  @Input() labelStyles: {} = {};
  @Input() inputStyles: {} = {};
  @Input() iconStyles: {} = {};
}
