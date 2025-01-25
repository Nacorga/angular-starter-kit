import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from '@app/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-card-layout',
  imports: [LanguageSwitcherComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardLayoutComponent {}
