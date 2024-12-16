import { FormControl, FormGroup } from '@angular/forms';
import { KeyValue } from '@angular/common';

export type KeyValueTranslation = KeyValue<string, Record<string, string | number>>;
export type FormControlType = 'email' | 'password';
export type FormControlParamType = 'requiredLength';

export type FormFieldErrorKeyType =
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | 'invalidValue'
  | 'pattern'
  | 'hasCapitalCase'
  | 'hasNumber'
  | 'hasSpecialCharacters'
  | 'hasSmallCase'
  | 'listNotMatch';

export type PasswordInputType = 'password' | 'text';

export type AuthForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;
