import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { RouterService } from '../router/router.service';
import { StorageService } from '../storage/storage.service';
import { StateService } from '../state/state.service';
import { AuthApiService } from '@app/api/auth/auth.service';
import { Cookie } from '@app/constants/cookie.constants';
import { User } from '@app/models/user.model';
import { Auth } from '@app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private stateSrv: StateService,
    private storageSrv: StorageService,
    private routerSrv: RouterService,
    private authApiSrv: AuthApiService,
  ) {}

  init() {
    return this.authApiSrv.sign().pipe(
      tap((user) => this.signDataHandler({ user })),
      catchError((err) => {
        this.logOut();

        return throwError(() => err);
      }),
    );
  }

  signDataHandler({ user, access_token }: Auth) {
    this.stateSrv.update<User>('user', user);

    if (access_token) {
      this.storageSrv.setCookie(Cookie.Token, access_token, { days: 7 });
    }
  }

  logOut() {
    this.stateSrv.reset();
    this.storageSrv.deleteCookie(Cookie.Token);
    this.routerSrv.navigate(true);
  }
}
