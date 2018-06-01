

import {Directive, forwardRef} from '@angular/core'
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms'

function validateEmailFactory() {
  return (c: AbstractControl) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/img;

    return !c.value || EMAIL_REGEXP.test(c.value) ? null : {
      email: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[email][ngModel],[email][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})
export class EmailValidator implements Validator {

  validator: Function;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: AbstractControl) {
    return this.validator(c);
  }
}