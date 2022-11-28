import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './component/tooltip.component';
import { TooltipDirective } from './directive/tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  imports: [CommonModule],
  exports: [TooltipDirective],
})
export class TooltipModule {}
