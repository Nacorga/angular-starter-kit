import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '@app/components/base.component';
import { AuthForm, PasswordInputType } from '@app/types/form.types';
import { TranslatePipe } from '@ngx-translate/core';
import { GsiButtonComponent } from '@app/components/gsi-button/gsi-button.component';
import { AuthApiService } from '@app/api/auth/auth.service';
import { AuthService } from '@app/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ExpectedError } from '@app/models/error.model';
import { Auth } from '@app/interfaces/auth.interface';

@Component({
  selector: 'app-login-page',
  imports: [
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    GsiButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  loginForm: AuthForm;
  passwordInputType = signal<PasswordInputType>('password');

  constructor(
    private fb: FormBuilder,
    private authApiSrv: AuthApiService,
    private authSrv: AuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.buildForm();
  }

  togglePasswordInputType() {
    this.passwordInputType.update((value) => (value === 'password' ? 'text' : 'password'));
  }

  gsiTokenChangeHandler(gsiToken: string) {
    this.authApiSrv
      .loginWithGoogle({ code: gsiToken })
      .pipe(catchError((err) => this.handleError(err, true)))
      .subscribe((res) => {
        this.afterLogin(res);
      });
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.authApiSrv
        .login(this.loginForm.getRawValue())
        .pipe(catchError((err) => this.handleError(err, false)))
        .subscribe((res) => {
          this.afterLogin(res);
        });
    }
  }

  private afterLogin(data: Auth) {
    this.authSrv.signDataHandler(data);
    this.navigate(false, ['dashboard']);
  }

  private handleError(err: HttpErrorResponse, isSocial?: boolean) {
    if (isSocial) {
      if (err.status === 401) {
        return throwError(() => new ExpectedError('error.wrong_credentials'));
      } else if (err.status === 404) {
        return throwError(() => new ExpectedError('error.user_not_exists'));
      }
    } else {
      if ([401, 404].includes(err.status)) {
        return throwError(() => new ExpectedError('error.wrong_credentials'));
      }
    }

    return throwError(() => err);
  }

  private buildForm(): AuthForm {
    return this.fb.group({
      email: [''],
      password: [''],
    });
  }
}
