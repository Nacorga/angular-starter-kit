import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BaseComponent } from './components/base.component';
import { LayoutService } from './services/layout/layout.service';
import { DomService } from './services/dom/dom.service';
import { GtagService } from './services/gtag/gtag.service';
import { filter } from 'rxjs';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressBarModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent implements OnInit, AfterViewInit {
  @HostBinding('class.ds') addDsClass = true;

  constructor(
    private readonly router: Router,
    private readonly layoutSrv: LayoutService,
    private readonly domSrv: DomService,
    private readonly gtagSrv: GtagService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.layoutSrv.init();
  }

  ngAfterViewInit(): void {
    if (this.utilsSrv.isPlatformBrowser) {
      this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe((ev: NavigationEnd) => {
          this.domSrv.scrollToTop('mat-sidenav-content', 'instant');
          this.gtagSrv.navSnapshot(ev.urlAfterRedirects);
        });
    }
  }
}
