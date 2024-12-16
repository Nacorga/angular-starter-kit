import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StateService } from '../state/state.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  readonly router: Router = inject(Router);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly stateSrv: StateService = inject(StateService);
  private readonly utilsSrv: UtilsService = inject(UtilsService);

  navigate(useLang?: boolean, url: string[] = [], extras: NavigationExtras = {}) {
    return this.router.navigate(useLang ? ['/', this.stateSrv.state.currentLang(), ...url] : ['/', ...url], extras);
  }

  navigateByQueryParams(queryParams: Record<string, string> = {}) {
    return this.router.navigate([], { relativeTo: this.activatedRoute, queryParams });
  }

  navigateToNewTab(useLang?: boolean, url: string[] = []) {
    const path = this.router
      .createUrlTree(useLang ? ['/', this.stateSrv.state.currentLang(), ...url] : ['/', ...url])
      .toString();

    this.utilsSrv.navigateToExternalUrl(path);
  }

  resetQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: '',
    });
  }
}
