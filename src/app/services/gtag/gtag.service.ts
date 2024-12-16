import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class GtagService {
  private get isGtagAvaliable(): boolean {
    return environment.production && !!window?.['gtag'];
  }

  private get gtag(): (command: string, ...args: any[]) => void {
    return window['gtag'];
  }

  constructor(
    private router: Router,
    private utilsSrv: UtilsService,
    private errorSrv: ErrorService,
  ) {}

  init() {
    const gtagScriptUrl = `https://www.googletagmanager.com/gtag/js?id=${environment.googleTagManagerId}`;

    this.utilsSrv
      .loadScript(gtagScriptUrl)
      .then(() => this.loadGoogleAnalytics())
      .catch((err) => this.errorSrv.handleError(err));
  }

  navSnapshot(url: string) {
    if (this.isGtagAvaliable) {
      this.gtag('config', environment.googleTagManagerId, {
        page_path: url,
      });
    }
  }

  trackEvent(eventName: string) {
    if (this.isGtagAvaliable) {
      const page = this.router.url;

      this.gtag('event', eventName, {
        event_category: 'Button',
        event_label: 'Submit Button',
        page_path: page,
      });
    }
  }

  private loadGoogleAnalytics() {
    const gaScriptConfig = document.createElement('script');

    gaScriptConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${environment.googleTagManagerId}');
    `;

    document.head.appendChild(gaScriptConfig);
  }
}
