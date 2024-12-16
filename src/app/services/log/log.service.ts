import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  // private sentryErrorHandler = Sentry.createErrorHandler();

  captureError(err: any) {
    if (environment.production) {
      // this.sentryErrorHandler.handleError(err);
    } else {
      console.error(err);
    }
  }
}
