import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { LAYOUT_BREAKPOINT_MAP, LayoutBreakpoint } from '@app/constants/layout.constants';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly layoutToBreakpoint = new Map<LayoutBreakpoint, string>([
    [LayoutBreakpoint.Mobile, `(max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Mobile)}px)`],
    [
      LayoutBreakpoint.Tablet,
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Mobile) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Tablet)}px)`,
    ],
    [
      LayoutBreakpoint.Desktop,
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Tablet) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Desktop)}px)`,
    ],
    [
      LayoutBreakpoint.DesktopLg,
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Desktop) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.DesktopLg)}px)`,
    ],
    [LayoutBreakpoint.DesktopXl, `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.DesktopLg) + 1}px)`],
  ]);

  private readonly breakpointToLayout = new Map<string, LayoutBreakpoint>([
    [`(max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Mobile)}px)`, LayoutBreakpoint.Mobile],
    [
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Mobile) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Tablet)}px)`,
      LayoutBreakpoint.Tablet,
    ],
    [
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Tablet) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Desktop)}px)`,
      LayoutBreakpoint.Desktop,
    ],
    [
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Desktop) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.DesktopLg)}px)`,
      LayoutBreakpoint.DesktopLg,
    ],
    [`(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.DesktopLg) + 1}px)`, LayoutBreakpoint.DesktopXl],
  ]);

  constructor(
    private stateSrv: StateService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  init() {
    this.breakpointObserver
      .observe([
        this.layoutToBreakpoint.get(LayoutBreakpoint.Mobile),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Tablet),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Desktop),
        this.layoutToBreakpoint.get(LayoutBreakpoint.DesktopLg),
        this.layoutToBreakpoint.get(LayoutBreakpoint.DesktopXl),
      ])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.stateSrv.update('layout', this.breakpointToLayout.get(query));
          }
        }
      });
  }
}
