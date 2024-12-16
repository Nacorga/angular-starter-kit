import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AlertType } from '@app/constants/alert.constants';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
  ) {}

  openToast(type: AlertType, msg: string, verticalPosition?: MatSnackBarVerticalPosition) {
    this.zone.run(() => {
      this.snackBar.open(msg, '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: verticalPosition || 'top',
        panelClass: ['ds-alert-snackbar', type],
      });
    });
  }
}
