import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../base.component';
import { LANGUAGES } from '@app/constants/lang.constants';
import { Lang } from '@app/types/lang.types';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslatePipe, MatMenuModule, MatIconModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent extends BaseComponent {
  readonly languages = LANGUAGES;

  langSelectionChangeHandler(lang: Lang) {
    this.langSrv.changeLang(lang);
    this.stateSrv.update('currentLang', lang);
  }
}
