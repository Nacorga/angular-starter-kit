export enum LayoutBreakpoint {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Xl = 'xl',
}

export const LAYOUT_BREAKPOINT_MAP = new Map<LayoutBreakpoint, number>([
  [LayoutBreakpoint.Sm, 576],
  [LayoutBreakpoint.Md, 768],
  [LayoutBreakpoint.Lg, 992],
  [LayoutBreakpoint.Xl, 1200],
]);
