import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {CPFValidatorClass} from "../custom/validations/cpfvalidation.class";


@Directive({
  selector: '[cpfPatternValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CPFValidatorDirective,
      multi: true
    }
  ],
  standalone: true
})
export class CPFValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return CPFValidatorClass.CPFValidator()(control)
  }


}
