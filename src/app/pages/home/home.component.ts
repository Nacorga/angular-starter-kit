import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '@app/components/base.component';
import { LanguageSwitcherComponent } from '@app/components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [TranslatePipe, MatButtonModule, LanguageSwitcherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomePageComponent extends BaseComponent {}
