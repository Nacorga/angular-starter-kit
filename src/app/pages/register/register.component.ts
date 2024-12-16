import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthApiService } from '@app/api/auth/auth.service';
import { BaseComponent } from '@app/components/base.component';
import { GsiButtonComponent } from '@app/components/gsi-button/gsi-button.component';
import { Auth } from '@app/interfaces/auth.interface';
import { ExpectedError } from '@app/models/error.model';
import { AuthService } from '@app/services/auth/auth.service';
import { AuthForm, PasswordInputType } from '@app/types/form.types';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-register-page',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterPageComponent extends BaseComponent implements OnInit {
  registerForm: AuthForm;
  passwordInputType = signal<PasswordInputType>('password');

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private authApiSrv: AuthApiService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerForm = this.buildForm();
  }

  togglePasswordInputType() {
    this.passwordInputType.update((value) => (value === 'password' ? 'text' : 'password'));
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.authApiSrv
        .register(this.registerForm.getRawValue())
        .pipe(
          catchError((err) =>
            throwError(() => (err.status === 400 ? new ExpectedError('error.user_already_exists') : err)),
          ),
        )
        .subscribe((res) => {
          this.afterRegister(res);
        });
    }
  }

  gsiTokenChangeHandler(gsiToken: string) {
    this.authApiSrv
      .registerWithGoogle({ code: gsiToken, lang: this.state.currentLang() })
      .pipe(
        catchError((err) =>
          throwError(() => (err.status === 400 ? new ExpectedError('error.user_already_exists') : err)),
        ),
      )
      .subscribe((res) => {
        this.afterRegister(res);
      });
  }

  private afterRegister(data: Auth) {
    this.authSrv.signDataHandler(data);
    this.navigate(false, ['dashboard']);
  }

  private buildForm(): AuthForm {
    return this.fb.group({
      email: this.formsSrv.buildFormControl('email'),
      password: this.formsSrv.buildFormControl('password'),
    });
  }
}
