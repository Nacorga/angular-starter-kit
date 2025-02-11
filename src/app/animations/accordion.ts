import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

export const accordionAnimation = trigger('accordionAnimation', [
  state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
  state('true', style({ height: '0', visibility: 'hidden' })),
  transition('false => true', animate('0.25s ease-in')),
  transition('true => false', animate('0.25s ease-out')),
]);
