import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StateService } from '@app/services/state/state.service';
import { UtilsService } from '@app/services/utils/utils.service';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
class LoaderInterceptorService {
  private requestsCount = 0;

  constructor(
    private utilsSrv: UtilsService,
    private stateSrv: StateService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandlerFn) {
    if (this.utilsSrv.isPlatformBrowser) {
      const displayLoader = JSON.parse(req.headers.get('loader') ?? 'true');

      if (displayLoader) {
        this.onRequestStarted();
      }

      return next(req).pipe(finalize(() => this.onRequestFinished()));
    }

    return next(req);
  }

  private onRequestStarted(): void {
    this.requestsCount++;

    if (!this.stateSrv.state.loader()) {
      this.stateSrv.update<boolean>('loader', true);
    }
  }

  private onRequestFinished(): void {
    this.requestsCount--;

    if (this.requestsCount <= 0 && this.stateSrv.state.loader()) {
      this.stateSrv.update<boolean>('loader', false);
    }
  }
}

export const loaderInterceptor: HttpInterceptorFn = (req, next) =>
  inject(LoaderInterceptorService).intercept(req, next);
