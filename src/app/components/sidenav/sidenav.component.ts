import { Component, computed, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { TranslatePipe } from '@ngx-translate/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { BaseComponent } from '../base.component';
import { LayoutBreakpoint } from '@app/constants/layout.constants';
import { NAVIGATION } from '@app/constants/navigation.constants';

@Component({
  selector: 'app-sidenav',
  imports: [
    TranslatePipe,
    MatProgressBarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    AvatarComponent,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent extends BaseComponent {
  @ViewChild('sidenavRef') sidenavRef: MatSidenav;

  readonly navigation = NAVIGATION;

  isSmallScreen = computed(() => [LayoutBreakpoint.Sm, LayoutBreakpoint.Md].includes(this.state.layout()));

  navToPath(path: string[]) {
    this.navigate(true, path);

    if (this.isSmallScreen()) {
      this.sidenavRef.close();
    }
  }
}
