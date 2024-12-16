import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LanguageService } from '../language/language.service';
import { StateService } from '../state/state.service';
import { ErrorName } from '@app/models/error.model';
import { AuthService } from '../auth/auth.service';
import { LogService } from '../log/log.service';
import { AlertType } from '@app/constants/alert.constants';
import { ToastService } from '../toast/toast.service';
import { ApiError } from '@app/interfaces/error.interface';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  constructor(
    private authSrv: AuthService,
    private toastSrv: ToastService,
    private logSrv: LogService,
    private langSrv: LanguageService,
    private stateSrv: StateService,
  ) {}

  handleError(err: HttpErrorResponse | any) {
    if (err.name === ErrorName.ExpectedError) {
      this.openErrorToast(err.message);
    } else {
      err instanceof HttpErrorResponse ? this.handleHttpError(err) : this.handleUiError(err);
    }
  }

  handleUiError(err: any, msg?: string) {
    this.logSrv.captureError(err);
    msg && this.openErrorToast(msg);
  }

  private handleHttpError(err: HttpErrorResponse) {
    this.handleHttpErrorStatus(err.error);
    const toastMsg = err?.error?.uiMessage;
    this.openErrorToast(toastMsg);
  }

  private handleHttpErrorStatus(error: ApiError) {
    this.logSrv.captureError(error);

    if (error.statusCode === 401 && !!this.stateSrv.state.user()) {
      this.authSrv.logOut();
    }
  }

  private openErrorToast(msg: string) {
    this.toastSrv.openToast(AlertType.Error, this.langSrv.translate(msg));
  }
}
