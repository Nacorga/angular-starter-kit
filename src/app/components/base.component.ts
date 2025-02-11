import { inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { DomService } from '@app/services/dom/dom.service';
import { FormsService } from '@app/services/forms/forms.service';
import { LanguageService } from '@app/services/language/language.service';
import { RouterService } from '@app/services/router/router.service';
import { StateService } from '@app/services/state/state.service';
import { UtilsService } from '@app/services/utils/utils.service';

export abstract class BaseComponent {
  readonly stateSrv: StateService = inject(StateService);
  readonly formsSrv: FormsService = inject(FormsService);
  readonly langSrv: LanguageService = inject(LanguageService);
  readonly utilsSrv: UtilsService = inject(UtilsService);
  readonly routerSrv: RouterService = inject(RouterService);
  readonly domSrv: DomService = inject(DomService);

  get isPlatformBrowser(): boolean {
    return this.utilsSrv.isPlatformBrowser;
  }

  get state() {
    return this.stateSrv.state;
  }

  navigate(useLang?: boolean, url: string[] = [], extras: NavigationExtras = {}) {
    return this.routerSrv.navigate(useLang, url, extras);
  }

  scrollTo(el: HTMLElement) {
    this.domSrv.scrollTo(el);
  }

  getFormCtrlErrorMsg(ctrl: FormControl): string {
    const errorMsg = this.formsSrv.mapFormFieldErrors(ctrl.errors);

    if (typeof errorMsg === 'string') {
      return this.langSrv.translate(errorMsg);
    } else if (errorMsg?.key && errorMsg?.value) {
      return this.langSrv.translate(errorMsg?.key, errorMsg?.value);
    }

    return '';
  }
}
