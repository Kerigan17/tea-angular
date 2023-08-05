import {Directive, Input} from '@angular/core';
import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

export function valuesValidator(pattern: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = new RegExp(pattern).test(control.value);
    return result ? null : {pattern: {value: control.value}};
  }
}
@Directive({
  selector: '[valuesValidator]'
})
export class ValuesValidatorDirective implements Validator{

  @Input('valuesValidator') pattern: string = '';
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return valuesValidator(this.pattern)(control);
  }
}
