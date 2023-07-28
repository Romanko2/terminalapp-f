import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[cvcValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CvcValidatorDirective, multi: true }]
})
export class CvcValidatorDirective implements Validator {
  isValidCvc(cvc: string): boolean {
    // Use a regular expression to check if the CVC contains only digits and has a valid length
    return /^[0-9]{3,4}$/.test(cvc);
  }
  validate(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      // If the control value is empty, consider it as valid
      return null;
    }

    // const isValid = isValidCvc(control.value);
    const isValid = this.isValidCvc(control.value)

    return isValid ? null : { invalidCvc: true };
  }
}
