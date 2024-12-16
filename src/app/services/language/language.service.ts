import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Lang } from '@app/types/lang.types';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';
import { StorageService } from '../storage/storage.service';
import { Cookie } from '@app/constants/cookie.constants';
import { UtilsService } from '../utils/utils.service';
import { Location } from '@angular/common';
import { DEFAULT_LANG, LANGS_LIST } from '@app/constants/lang.constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get currentLang(): Lang {
    return this.ngxTranslateSrv.currentLang as Lang;
  }

  constructor(
    private location: Location,
    private readonly router: Router,
    private readonly ngxTranslateSrv: NgxTranslateService,
    private readonly utilsSrv: UtilsService,
    private readonly storageSrv: StorageService,
  ) {}

  init() {
    const path = this.location.path();
    const langCodeFromUrl = path.split('/')[1] as any;
    const langFallback =
      this.storageSrv.getCookie(Cookie.Lang) || (this.ngxTranslateSrv.getBrowserLang() as any) || DEFAULT_LANG;
    const lang = LANGS_LIST.includes(langCodeFromUrl) ? langCodeFromUrl : langFallback;

    this.onLangChange(lang);
  }

  changeLang(lang: Lang): void {
    if (lang !== this.currentLang) {
      this.onLangChange(lang);
      this.changeLangRoute(lang);
    }
  }

  translate(key: string, params: Record<string, any> = {}): string {
    return this.ngxTranslateSrv.instant(key, params);
  }

  private onLangChange(lang: Lang) {
    this.changeHTMLLangAttr(lang);
    this.ngxTranslateSrv.use(lang);
    this.storageSrv.setCookie(Cookie.Lang, lang);
  }

  private changeLangRoute(lang: Lang): void {
    const url = this.router.url;
    const urlSegments = url.split('/');

    if (urlSegments[1] !== lang) {
      urlSegments[1] = lang;
      const newUrl = urlSegments.join('/');

      if (newUrl !== url) {
        this.router.navigateByUrl(newUrl);
      }
    }
  }

  private changeHTMLLangAttr(lang: Lang): void {
    const { document, renderer } = this.utilsSrv;
    const htmlTag = document?.documentElement;

    if (htmlTag) {
      renderer.setAttribute(htmlTag, 'lang', lang);
    }
  }
}
