import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

/**
 * check national code
 */
export function checkNationalCode(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let code = control.value;
    if (!code) {
      return null;
    }
    code = code.toString();
    const L = code.length;
    if (L < 8 || parseInt(code, 10) === 0) {
      return {wrong: code};
    }
    code = ('0000' + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) === 0) {
      return {wrong: code};
    }
    const c = parseInt(code.substr(9, 1), 10);
    let s = 0;
    for (let i = 0; i < 9; i++) {
      s += parseInt(code.substr(i, 1), 10) * (10 - i);
    }
    s = s % 11;
    return ((s < 2 && c === s) || (s >= 2 && c === (11 - s))) ? null : {wrong: code};
  };
}

/**
 * national code directive
 */
@Directive({
  selector: '[national]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NationalCodeValidatorDirective,
      multi: true
    }
  ]
})
export class NationalCodeValidatorDirective implements Validator {

  /**
   * check national code
   * @param control element
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return checkNationalCode()(control);
  }

}
