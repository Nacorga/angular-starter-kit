import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class DomService {
  constructor(private utilsSrv: UtilsService) {}

  scrollToTop(selector = 'html', behavior: 'instant' | 'smooth' = 'smooth') {
    const element = this.utilsSrv.document.querySelector(selector);

    if (element) {
      element.scrollTo({ top: 0, behavior });
    }
  }

  scrollTo(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  isBrowserSafari() {
    if (navigator) {
      const userAgent = navigator.userAgent;
      return userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1;
    }

    return false;
  }

  addClasses(selector: string, classes: string[]) {
    if (this.utilsSrv.isPlatformBrowser) {
      const el = this.utilsSrv.document.querySelector(selector);

      if (el) {
        el.classList.add(...classes);
      }
    }
  }

  removeClasses(selector: string, classes: string[]) {
    if (this.utilsSrv.isPlatformBrowser) {
      const params = classes?.length ? classes : Array.from(this.utilsSrv.document.querySelector(selector)?.classList);

      this.utilsSrv.document.querySelector(selector).classList.remove(...params);
    }
  }
}
