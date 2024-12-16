import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { accounts } from 'google-one-tap';
import { UtilsService } from '../utils/utils.service';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class GsiService {
  private gAccounts: accounts;
  private _gToken$ = new BehaviorSubject<string>('');

  get gToken$(): Observable<string> {
    return this._gToken$.asObservable();
  }

  constructor(
    private ngZone: NgZone,
    private utilsSrv: UtilsService,
    private errorSrv: ErrorService,
  ) {}

  init(id: string) {
    if (this.gAccounts) {
      this.renderButton(id);
    } else {
      this.utilsSrv
        .loadScript('https://accounts.google.com/gsi/client')
        .then(() => this.loadSDK(id))
        .catch((err) => this.errorSrv.handleError(err));
    }
  }

  resetToken() {
    this._gToken$.next('');
  }

  private renderButton(id: string) {
    if (this.utilsSrv.isPlatformBrowser && this.gAccounts) {
      this.gAccounts.id.renderButton(document.getElementById(id) as HTMLElement, { type: 'icon', width: 40 });
    }
  }

  private loadSDK(id: string) {
    if (window?.['google']) {
      this.gAccounts = google.accounts;
      this.initialize();
      this.renderButton(id);
    }
  }

  private initialize() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this.handleCredential(credential);
        });
      },
    });
  }

  private handleCredential(token: string) {
    this._gToken$.next(token);
  }
}
