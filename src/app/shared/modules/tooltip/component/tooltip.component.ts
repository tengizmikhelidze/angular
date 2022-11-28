import { Component } from '@angular/core';
import { TooltipForComponent } from '../interfaces/tooltip.interface';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  tooltip: TooltipForComponent = {
    text: '',
    left: 0,
    top: 0,
    position: 'bottom',
    backgroundColor: '#000000',
  };

  constructor() {}

  ngOnInit(): void {}
}
