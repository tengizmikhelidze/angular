export interface Tooltip {
  text: string;
  backgroundColor?: string;
  color?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface TooltipForComponent extends Tooltip {
  top: number;
  left: number;
}
