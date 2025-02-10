import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { LAYOUT_BREAKPOINT_MAP, LayoutBreakpoint } from '@app/constants/layout.constants';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly layoutToBreakpoint = new Map<LayoutBreakpoint, string>([
    [LayoutBreakpoint.Sm, `(max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Sm)}px)`],
    [
      LayoutBreakpoint.Md,
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Sm) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Md)}px)`,
    ],
    [
      LayoutBreakpoint.Lg,
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Md) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Lg)}px)`,
    ],
    [LayoutBreakpoint.Xl, `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Lg) + 1}px)`],
  ]);

  private readonly breakpointToLayout = new Map<string, LayoutBreakpoint>([
    [`(max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Sm)}px)`, LayoutBreakpoint.Sm],
    [
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Sm) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Md)}px)`,
      LayoutBreakpoint.Md,
    ],
    [
      `(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Md) + 1}px) and (max-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Lg)}px)`,
      LayoutBreakpoint.Lg,
    ],
    [`(min-width: ${LAYOUT_BREAKPOINT_MAP.get(LayoutBreakpoint.Lg) + 1}px)`, LayoutBreakpoint.Xl],
  ]);

  constructor(
    private stateSrv: StateService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  init() {
    this.breakpointObserver
      .observe([
        this.layoutToBreakpoint.get(LayoutBreakpoint.Sm),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Md),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Lg),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Lg),
        this.layoutToBreakpoint.get(LayoutBreakpoint.Xl),
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
