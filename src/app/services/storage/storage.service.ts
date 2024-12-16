import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';
import { Cookie } from '@app/constants/cookie.constants';
import { CookieConfig } from '@app/interfaces/storage.interface';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private utilsSrv: UtilsService) {}

  setCookie(name: Cookie, value: string, config?: CookieConfig) {
    if (this.utilsSrv.isPlatformBrowser) {
      const days: number = config?.days ?? 365;
      const expirationDate = new Date();

      expirationDate.setDate(expirationDate.getDate() + days);

      const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;

      this.utilsSrv.document.cookie = cookieValue;
    }
  }

  getCookie(name: Cookie): string | null {
    if (this.utilsSrv.isPlatformBrowser) {
      const cookies = this.utilsSrv.document.cookie.split(';');

      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');

        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
    }

    return null;
  }

  updateCookie(name: Cookie, value: string, config?: CookieConfig) {
    this.setCookie(name, value, config);
  }

  deleteCookie(name: Cookie) {
    this.setCookie(name, '', { days: -1 });
  }
}
