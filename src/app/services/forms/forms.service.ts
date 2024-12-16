import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FORM_FIELD_ERROR_MSG } from '@app/constants/form.constants';
import { FormControlType, FormFieldErrorKeyType, KeyValueTranslation } from '@app/types/form.types';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  buildFormControl(ctrlName: FormControlType, value?: string): FormControl<string> {
    switch (ctrlName) {
      case 'email':
        return this.buildEmailCtrl(value);
      case 'password':
        return this.buildPasswordCtrl();
    }
  }

  getDefaultTextValidators(isRequired?: boolean): ValidatorFn | null {
    const validators = [Validators.minLength(3), Validators.maxLength(50)];
    isRequired && validators.push(Validators.required);
    return Validators.compose(validators);
  }

  minLengthArray(min: number) {
    return (c: AbstractControl): Record<string, any> =>
      c.value.length >= min ? null! : { minLengthArray: { valid: false } };
  }

  maxLengthArray(max: number) {
    return (c: AbstractControl): Record<string, any> =>
      c.value.length <= max ? null! : { maxLengthArray: { valid: false } };
  }

  mapFormFieldErrors(errors: ValidationErrors | null): string | KeyValueTranslation {
    if (errors) {
      const errKey = Object.keys(errors)[0] as FormFieldErrorKeyType;

      if (['minlength', 'maxlength'].includes(errKey)) {
        const requiredLength = errors[errKey]?.requiredLength;
        return { key: FORM_FIELD_ERROR_MSG[errKey], value: { requiredLength } };
      } else if (errKey === 'min') {
        const minValidValue = errors[errKey]?.min;
        return { key: FORM_FIELD_ERROR_MSG[errKey], value: { minValidValue } };
      } else if (errKey === 'max') {
        const maxValidValue = errors[errKey]?.max;
        return { key: FORM_FIELD_ERROR_MSG[errKey], value: { maxValidValue } };
      }

      return FORM_FIELD_ERROR_MSG[errKey];
    }

    return '';
  }

  private buildEmailCtrl(value?: string): FormControl {
    return new FormControl(
      value ?? '',
      Validators.compose([Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(120)]),
    );
  }

  private buildPasswordCtrl(): FormControl {
    return new FormControl(
      '',
      Validators.compose([
        Validators.required,
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        this.patternValidator(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, { hasSpecialCharacters: true }),
        Validators.minLength(8),
      ]),
    );
  }

  private patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): Record<string, any> | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
