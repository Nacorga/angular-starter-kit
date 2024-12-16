import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ErrorService } from '../error/error.service';
import { LanguageService } from '../language/language.service';
import { StorageService } from '../storage/storage.service';
import { Cookie } from '@app/constants/cookie.constants';
import { GtagService } from '../gtag/gtag.service';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  private readonly meta: Meta = inject(Meta);
  private readonly langSrv: LanguageService = inject(LanguageService);
  private readonly authSrv: AuthService = inject(AuthService);
  private readonly storageSrv: StorageService = inject(StorageService);
  private readonly gtagSrv: GtagService = inject(GtagService);
  private readonly errorSrv: ErrorService = inject(ErrorService);

  init(): Observable<boolean> {
    this.langSrv.init();

    this.initTracking();

    return this.storageSrv.getCookie(Cookie.Token)
      ? this.authSrv.init().pipe(
          map(() => true),
          catchError((err) => {
            this.errorSrv.handleError(err);

            return of(true);
          }),
        )
      : of(true);
  }

  private initTracking() {
    const isProduction = environment.production;

    this.initIndexing(isProduction);
    isProduction && this.gtagSrv.init();
  }

  private initIndexing(isProduction: boolean) {
    this.meta.removeTag('name="robots"');
    this.meta.addTag({ name: 'robots', content: isProduction ? 'index, follow' : 'noindex, nofollow' });
  }
}
