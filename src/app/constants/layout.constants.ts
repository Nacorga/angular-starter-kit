export enum LayoutBreakpoint {
  Mobile = 'mobile',
  Tablet = 'tablet',
  Desktop = 'desktop',
  DesktopLg = 'desktop-lg',
  DesktopXl = 'desktop-xl',
}

export const LAYOUT_BREAKPOINT_MAP = new Map<LayoutBreakpoint, number>([
  [LayoutBreakpoint.Mobile, 576],
  [LayoutBreakpoint.Tablet, 768],
  [LayoutBreakpoint.Desktop, 992],
  [LayoutBreakpoint.DesktopLg, 1200],
  [LayoutBreakpoint.DesktopXl, 1400],
]);
