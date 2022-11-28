import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import { TooltipComponent } from '../component/tooltip.component';
import { Tooltip } from '../interfaces/tooltip.interface';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() tooltip: Tooltip = {
    text: '',
    position: 'bottom',
  };

  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      this.componentRef = componentFactory.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      const { left, right, top, bottom, height, width } =
        this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.tooltip.left = (right - left) / 2 + left;
      this.componentRef.instance.tooltip.top = bottom;

      if (this.tooltip.position === 'top') {
        this.componentRef.instance.tooltip.top = top - height - 5;
      }
      if (this.tooltip.position === 'left') {
        this.componentRef.instance.tooltip.left = left - width - 20;
        this.componentRef.instance.tooltip.top = top;
      }
      if (this.tooltip.position === 'right') {
        this.componentRef.instance.tooltip.left = right + width + 20;
        this.componentRef.instance.tooltip.top = top;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
