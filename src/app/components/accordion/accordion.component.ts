import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { accordionAnimation } from '@app/animations/accordion';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule, MatIconModule],
  animations: [accordionAnimation],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  isCollapsed = true;
  animationDone = false;

  toggle() {
    this.animationDone = false;
    this.isCollapsed = !this.isCollapsed;
  }

  onAnimationEvent(ev: AnimationEvent) {
    this.animationDone = !this.isCollapsed && ev.phaseName === 'done';
  }
}
